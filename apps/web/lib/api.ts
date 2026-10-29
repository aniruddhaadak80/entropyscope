import type { StepResult, World } from "@repo/core";

const BASE = process.env.NEXT_PUBLIC_AGENT_SERVICE_URL ?? "http://localhost:8000";

export async function getWorld(): Promise<World | null> {
  try {
    const res = await fetch(`${BASE}/simulate/world`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as World;
  } catch {
    return null;
  }
}

export async function stepYear(world: World): Promise<StepResult | null> {
  try {
    const res = await fetch(`${BASE}/simulate/step`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(world),
    });
    if (!res.ok) return null;
    return (await res.json()) as StepResult;
  } catch {
    return null;
  }
}

export async function getMarkets(): Promise<
  Array<{ id: string; question: string; yesPrice: number; noPrice: number; resolved: boolean }>
> {
  try {
    const res = await fetch(`${BASE}/markets`, { cache: "no-store" });
    if (!res.ok) return [];
    return (await res.json()) as Array<{
      id: string;
      question: string;
      yesPrice: number;
      noPrice: number;
      resolved: boolean;
    }>;
  } catch {
    return [];
  }
}

export async function healthz(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/healthz`);
    return res.ok;
  } catch {
    return false;
  }
}
