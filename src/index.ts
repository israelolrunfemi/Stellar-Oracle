import { getAggregatedPrice } from "./aggregator";
import { feedPrice } from "./feeder";
import "dotenv/config";

const ASSETS   = (process.env.ASSETS      ?? "XLM:USD").split(",");
const INTERVAL = Number(process.env.INTERVAL_MS ?? 60_000);

async function tick() {
  console.log(`\n[${new Date().toISOString()}] Fetching prices...`);
  for (const asset of ASSETS) {
    try {
      const price = await getAggregatedPrice(asset);
      await feedPrice(price);
    } catch (err) {
      console.error(`Error for ${asset}:`, err instanceof Error ? err.message : err);
    }
  }
}

console.log("Stellar Oracle starting...");
console.log(`Assets: ${ASSETS.join(", ")} | Interval: ${INTERVAL / 1000}s`);

tick();
setInterval(tick, INTERVAL);
