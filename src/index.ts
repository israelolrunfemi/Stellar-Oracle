import "dotenv/config";
import { getAggregatedPrice } from "./aggregator";
import { feedPrice, getConfig } from "./feeder";

async function tick(assets: string[]): Promise<void> {
  console.log(`\n[${new Date().toISOString()}] Fetching prices...`);
  for (const asset of assets) {
    try {
      const price = await getAggregatedPrice(asset);
      await feedPrice(price);
    } catch (err) {
      console.error(`Error for ${asset}:`, err instanceof Error ? err.message : err);
    }
  }
}

function main(): void {
  const { assets, intervalMs } = getConfig();
  console.log("Stellar Oracle starting...");
  console.log(`Assets: ${assets.join(", ")} | Interval: ${intervalMs / 1000}s`);
  tick(assets);
  setInterval(() => tick(assets), intervalMs);
}

main();
