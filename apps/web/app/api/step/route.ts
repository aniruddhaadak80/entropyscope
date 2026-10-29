import { stepYear } from "@repo/core";
import type { World } from "@repo/core";
import type { StepResult } from "@repo/core";
import { DEFAULT_CONFIG } from "@repo/core/src/config";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = (await req.json()) as World;
  const world: World = {
    ...DEFAULT_CONFIG,
    ...body,
    seed: body.seed ?? DEFAULT_CONFIG.seed,
    year: body.year ?? 0,
  } as World;
  const result = stepYear(world, DEFAULT_CONFIG) as StepResult;
  return Response.json(result);
}
