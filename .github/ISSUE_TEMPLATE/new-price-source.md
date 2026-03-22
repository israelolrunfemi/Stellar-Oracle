---
name: Add a new price source
about: Add a new exchange or API to the aggregator
labels: typescript, good first issue
---

## Add [SOURCE NAME] to the aggregator

- [ ] Add a `fromSourceName(asset)` function in `src/aggregator.ts`
- [ ] Add it to the `fetchers` array in `getAggregatedPrice()`
- [ ] Add asset symbol mappings
- [ ] Write a test in `src/aggregator.test.ts`

TypeScript only — no Rust needed.
