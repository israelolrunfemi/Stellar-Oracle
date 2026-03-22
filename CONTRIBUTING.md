# Contributing to Stellar Oracle

## No Rust? No problem.
The TypeScript parts need zero Rust knowledge.
Look for issues labelled `typescript` or `good first issue`.

## Have Rust / Soroban experience?
The smart contract lives in `contracts/`. See issues labelled `rust` or `soroban`.
GitHub Actions handles building — you don't need Rust locally to start.

## Setup
```bash
git clone https://github.com/YOUR_HANDLE/stellar-oracle
cd stellar-oracle
npm install
cp .env.example .env
npm run dev
```

## Running in stub mode
Without a deployed contract, the oracle logs prices to the console.
This is enough to work on the aggregator, add new sources, or fix bugs.
