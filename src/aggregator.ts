import Decimal from "decimal.js";
import "dotenv/config";
import type { PriceSample, AggregatedPrice } from "./types";

async function fromCoinGecko(asset: string): Promise<PriceSample> {
  const ids: Record<string, string> = {
    "XLM:USD": "stellar",
    "BTC:USD": "bitcoin",
    "ETH:USD": "ethereum",
  };
  const id = ids[asset];
  if (!id) throw new Error(`CoinGecko: unknown asset ${asset}`);
  const res  = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
  const json = await res.json() as Record<string, { usd: number }>;
  return { source: "coingecko", asset, price: new Decimal(json[id].usd) };
}

async function fromBinance(asset: string): Promise<PriceSample> {
  const symbols: Record<string, string> = {
    "XLM:USD": "XLMUSDT",
    "BTC:USD": "BTCUSDT",
    "ETH:USD": "ETHUSDT",
  };
  const symbol = symbols[asset];
  if (!symbol) throw new Error(`Binance: unknown asset ${asset}`);
  const res  = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
  const json = await res.json() as { price: string };
  return { source: "binance", asset, price: new Decimal(json.price) };
}

export async function getAggregatedPrice(asset: string): Promise<AggregatedPrice> {
  const fetchers = [fromCoinGecko, fromBinance];
  const results  = await Promise.allSettled(fetchers.map(f => f(asset)));

  const samples: PriceSample[] = results
    .filter((r): r is PromiseFulfilledResult<PriceSample> => r.status === "fulfilled")
    .map(r => r.value);

  if (samples.length === 0) throw new Error(`No price data available for ${asset}`);

  const sorted = [...samples].sort((a, b) => a.price.comparedTo(b.price));
  const mid    = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0
    ? sorted[mid - 1].price.add(sorted[mid].price).div(2)
    : sorted[mid].price;

  return {
    asset,
    price:       median,
    scaledPrice: BigInt(median.mul(new Decimal("1e7")).toFixed(0)),
    sources:     samples.map(s => s.source),
  };
}
