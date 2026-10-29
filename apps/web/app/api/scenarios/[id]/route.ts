
import { scenarios } from "@repo/seed";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const scn = scenarios.find((s) => s.id === id);
  if (!scn) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json(scn);
}
