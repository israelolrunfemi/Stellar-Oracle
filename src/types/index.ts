export interface PriceSample {
  source: string;
  asset:  string;
  price:  import("decimal.js").Decimal;
}

export interface AggregatedPrice {
  asset:       string;
  price:       import("decimal.js").Decimal;
  scaledPrice: bigint;
  sources:     string[];
}

export interface FeedConfig {
  oracleContractId: string | undefined;
  relayerSecret:    string | undefined;
  rpcUrl:           string;
  assets:           string[];
  intervalMs:       number;
}
