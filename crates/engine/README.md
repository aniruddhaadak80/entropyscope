# entropyscope engine (Rust)

Wasm-pack compute crate exposed via `wasm-bindgen`. Acts as the Rust parity oracle
for the TypeScript simulation engine — same seed, same results.

## Run

```bash
cd crates/engine
cargo test
cargo build --release
```

## Contract

- `parity_check(seed, years)` — returns total wage bill after N years, deterministic
- `WorldState::new(seed)` / `step()` — mutable simulation state
