# entropyscope parity-go

Go mirror of **PARITY-SPEC v1** — the deterministic scalar world model shared
bitwise with `packages/core/src/parity.ts` (TypeScript),
`services/agents/parity.py` (Python) and `crates/engine/src/lib.rs` (Rust/wasm).

All four implementations are pinned to the same committed golden fixture:

```
fixtures/parity/expected.json   # regenerated via bun scripts/generate-parity-fixture.ts
```

## Test

```sh
cd services/parity-go
go test ./...
```

## Run

```sh
go run ./parity.go     # prints the seed-7331, 10-year wage bill
```
