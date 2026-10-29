import { defineWorkspace } from "vitest/config";

export default defineWorkspace(["apps/web/*", "packages/*", "services/agents", "crates/engine"]);
