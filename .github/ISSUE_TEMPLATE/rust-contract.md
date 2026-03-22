---
name: Rust contract task
about: Work on the Soroban smart contract
labels: rust, soroban, good first issue
---

## Context
The TypeScript oracle is running and feeding prices. This issue is to implement
the on-chain Soroban contract that stores those prices.

## What needs doing
- [ ] Implement `submit_price(asset, price, timestamp)`
- [ ] Implement `get_price(asset)` — returns latest price + timestamp
- [ ] Add staleness guard: reject prices older than N seconds
- [ ] Write unit tests with `soroban_sdk::testutils`

## Resources
- [Soroban docs](https://soroban.stellar.org)
- [soroban-examples](https://github.com/stellar/soroban-examples)
