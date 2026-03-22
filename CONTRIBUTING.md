# Contributing to Stellar Oracle

Thank you for your interest in contributing. This project welcomes contributions of all kinds — new price sources, bug fixes, tests, Rust smart contract work, and documentation improvements.

---

## Before you start

- Check the [open issues](../../issues) to see what's needed
- If you want to work on something, comment on the issue so others know it's taken
- For new ideas not already in an issue, open one first to discuss before writing code

---

## Setup

### Requirements

- Node.js 20+
- npm
- Git

You do **not** need Rust, the Stellar CLI, or a Stellar wallet to get started.

### Clone and install

```bash
git clone https://github.com/YOUR_HANDLE/stellar-oracle
cd stellar-oracle
npm install
cp .env.example .env
```

### Run in development mode

```bash
npm run dev
```

This runs the oracle in stub mode — prices are fetched from real sources and logged to the console, but nothing is written to the blockchain. This is enough for most TypeScript contributions.

---

## What you can contribute

### TypeScript (no blockchain experience needed)

These are the best starting points if you're new to the project.

**Add a new price source**
The aggregator currently supports CoinGecko and Binance. Adding a new source means writing one function in `src/aggregator.ts`. See the [new price source issue template](../../issues/new).

**Improve the aggregator**
Ideas: TWAP (time-weighted average price), deviation checks between sources, retry logic, caching. Look for issues labelled `typescript`.

**Write tests**
The test coverage is minimal right now. Adding tests for `src/aggregator.ts` is a high-value contribution. See `src/aggregator.test.ts` (you may need to create it).

**Fix bugs**
Look for issues labelled `bug`.

---

### Rust / Soroban (smart contract work)

The on-chain contract lives in `contracts/oracle/src/lib.rs`. It currently has empty stubs — the implementation is the contribution.

You **do** need Rust for this. Install it with:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
cargo install soroban-cli
```

Then test the contract:

```bash
cargo test --manifest-path contracts/Cargo.toml
```

GitHub Actions will also run this on every pull request, so you can check CI output even without Rust locally.

Rust issues are labelled `rust` or `soroban` in the issue tracker.

---

## Workflow

1. Fork the repo
2. Create a branch: `git checkout -b your-feature-name`
3. Make your changes
4. Run tests: `npm test`
5. Commit with a clear message (see below)
6. Push and open a pull request

### Commit messages

Use simple, clear commit messages:

```
add kraken price source
fix: handle binance timeout gracefully
test: add aggregator median tests
docs: update setup instructions
```

No strict format required — just be descriptive.

---

## Pull request guidelines

- Keep PRs focused on one thing. Separate refactors from features.
- If your PR fixes an issue, reference it: `Closes #12`
- Add or update tests when changing logic in `src/`
- The CI must pass before merging (TypeScript tests + Rust build if applicable)

---

## Project structure reference

```
src/
  aggregator.ts    # Fetch prices + compute median — most TS contributions go here
  feeder.ts        # Submit price to Stellar — wired up once contract is live
  index.ts         # Scheduler — usually no changes needed

contracts/
  oracle/
    src/lib.rs     # Soroban smart contract — Rust contributions go here
```

---

## Need help?

Open a [GitHub Discussion](../../discussions) or comment on the relevant issue. No question is too basic — this project is built to be contributor-friendly.
