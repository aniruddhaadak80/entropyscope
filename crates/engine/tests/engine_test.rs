#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parity_check_is_deterministic() {
        let a = parity_check(7331, 10);
        let b = parity_check(7331, 10);
        assert_eq!(a, b);
    }

    #[test]
    fn parity_check_differs_by_seed() {
        let a = parity_check(1, 10);
        let b = parity_check(2, 10);
        assert_ne!(a, b);
    }

    #[test]
    fn world_state_steps() {
        let mut state = WorldState::new(7331);
        let start = state.year();
        state.step();
        assert_eq!(state.year(), start + 1);
    }
}
