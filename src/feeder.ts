import "dotenv/config";
import type { AggregatedPrice, FeedConfig } from "./types";

export function getConfig(): FeedConfig {
  return {
    oracleContractId: process.env.ORACLE_CONTRACT_ID,
    relayerSecret:    process.env.RELAYER_SECRET,
    rpcUrl:           process.env.SOROBAN_RPC_URL ?? "https://soroban-testnet.stellar.org",
    assets:           (process.env.ASSETS ?? "XLM:USD").split(","),
    intervalMs:       Number(process.env.INTERVAL_MS ?? 60_000),
  };
}

export async function feedPrice(price: AggregatedPrice): Promise<void> {
  const config = getConfig();

  if (!config.oracleContractId || !config.relayerSecret) {
    console.log(
      `[stub] ${price.asset} = $${price.price.toFixed(7)}`,
      `| scaled: ${price.scaledPrice}`,
      `| sources: ${price.sources.join(", ")}`,
    );
    return;
  }

  console.log(`[live] Contract wiring tracked in issue #3`);
}
