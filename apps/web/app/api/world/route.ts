import { createWorld } from "@repo/core";
import type { World } from "@repo/core";
import { DEFAULT_CONFIG } from "@repo/core/src/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const world = createWorld(DEFAULT_CONFIG) as World;
  return Response.json(world);
}
