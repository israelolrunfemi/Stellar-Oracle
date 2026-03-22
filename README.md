# Stellar Oracle

A decentralized price oracle for the Stellar network. Fetches real-world asset prices from multiple exchanges, computes a manipulation-resistant median, and writes them on-chain via Soroban smart contracts — making reliable price data available to any dApp on Stellar.

---

## What is a price oracle?

Smart contracts on Stellar can't access the internet. They only know what's stored on the blockchain. An oracle solves this by acting as a trusted bridge — it fetches real-world prices (e.g. XLM = $0.12) from external sources and writes them on-chain so smart contracts can use them.

```
Internet prices  →  Stellar Oracle  →  Stellar blockchain
(Binance, CoinGecko)   (this repo)     (your dApp reads it)
```

---

## Project structure

```
stellar-oracle/
├── src/
│   ├── aggregator.ts      # Fetches prices from multiple sources + computes median
│   ├── feeder.ts          # Submits prices to Stellar via Soroban RPC
│   └── index.ts           # Scheduler — runs the feed on an interval
├── contracts/
│   └── oracle/
│       └── src/lib.rs     # Soroban smart contract (Rust)
├── .github/
│   ├── workflows/ci.yml   # CI — runs TS tests + Rust build
│   └── ISSUE_TEMPLATE/    # Templates for contributors
├── .env.example
├── CONTRIBUTING.md
└── FUNDING.json
```

The **TypeScript layer** handles fetching, aggregating, and submitting prices. The **Rust contract** stores prices on-chain and exposes them to other smart contracts. You can contribute to either independently.

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

That's it. You don't need Rust or the Stellar CLI to run the oracle in development mode.

### Installation

```bash
git clone https://github.com/YOUR_HANDLE/stellar-oracle
cd stellar-oracle
npm install
cp .env.example .env
```

### Run in stub mode (no blockchain needed)

```bash
npm run dev
```

Prices will be fetched and logged to the console every 60 seconds. No wallet, no contract, no chain required — this is enough to work on the aggregator or add new price sources.

```
Stellar Oracle starting...
Assets: XLM:USD | Interval: 60s

[2026-03-22T10:00:00Z] Fetching prices...
[stub] XLM:USD = $0.1234567 | scaled: 1234567 | sources: coingecko, binance
```

### Run against testnet

Once the Soroban contract is deployed (see [issue #1](../../issues/1)), add your credentials to `.env`:

```bash
ORACLE_CONTRACT_ID=C...       # deployed contract address
RELAYER_SECRET=S...           # your Stellar testnet keypair
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
ASSETS=XLM:USD,BTC:USD
INTERVAL_MS=60000
```

Then:

```bash
npm run dev
```

---

## How it works

### 1. Aggregation

For each asset, the oracle fetches prices from multiple sources in parallel:

| Source | Status |
|---|---|
| CoinGecko | Live |
| Binance | Live |
| More sources | [Open issue](../../issues) |

If a source fails or times out, it's skipped. The median of all successful responses is used — this makes the price resistant to manipulation by any single source.

### 2. Scaling

Prices are scaled by `10^7` before being stored on-chain (e.g. $0.1234567 → `1234567`). This avoids floating point on the blockchain while preserving 7 decimal places of precision.

### 3. On-chain storage

The feeder submits the scaled price to the Soroban oracle contract on Stellar. Other smart contracts (DEXs, lending protocols, derivatives) can read the latest price by calling `get_price(asset)`.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `ORACLE_CONTRACT_ID` | For live mode | Deployed Soroban contract address |
| `RELAYER_SECRET` | For live mode | Stellar keypair that signs transactions |
| `SOROBAN_RPC_URL` | For live mode | Soroban RPC endpoint |
| `ASSETS` | No | Comma-separated assets (default: `XLM:USD`) |
| `INTERVAL_MS` | No | Feed interval in ms (default: `60000`) |

---

## Supported assets

| Symbol | CoinGecko | Binance |
|---|---|---|
| `XLM:USD` | stellar | XLMUSDT |
| `BTC:USD` | bitcoin | BTCUSDT |
| `ETH:USD` | ethereum | ETHUSDT |

Adding a new asset or source is a [good first issue](../../issues).

---

## Contributing

All contributions are welcome — TypeScript, Rust, tests, docs. See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to get started. No Rust or blockchain experience required to make a meaningful contribution.

---

## Roadmap

The full feature set is tracked as GitHub issues. High-level milestones:

- [x] TypeScript aggregator (median, multi-source)
- [x] Stub feeder (logs prices without chain)
- [ ] Soroban oracle contract (`submit_price`, `get_price`)
- [ ] Live feeder (submits to testnet)
- [ ] Staleness guard (reject stale prices)
- [ ] Admin contract (relayer management)
- [ ] Mainnet deployment

---

## License

MIT
