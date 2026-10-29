import { markets } from "@repo/seed";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(markets);
}
