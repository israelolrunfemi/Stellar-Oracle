import { AggregatedPrice } from "./aggregator";
import "dotenv/config";

export async function feedPrice(price: AggregatedPrice): Promise<void> {
  const oracle = process.env.ORACLE_CONTRACT_ID;
  const secret = process.env.RELAYER_SECRET;

  if (!oracle || !secret) {
    console.log(
      `[stub] ${price.asset} = $${price.price.toFixed(7)}`,
      `| scaled: ${price.scaledPrice}`,
      `| sources: ${price.sources.join(", ")}`,
    );
    return;
  }

  // Live submit logic — tracked in GitHub issue #3
  console.log(`[live] Contract wiring tracked in issue #3`);
}
