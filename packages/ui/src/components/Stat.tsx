"use client";
import { cn } from "../utils/cn";

interface StatProps {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: number;
}

export function Stat({ label, value, trend, trendValue }: StatProps) {
  return (
    <div className="bg-card p-4 rounded-lg border shadow-sm">
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {trend && trendValue !== undefined && (
        <div
          className={cn(
            "text-xs mt-1",
            trend === "up"
              ? "text-green-600"
              : trend === "down"
                ? "text-red-600"
                : "text-muted-foreground",
          )}
        >
          {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {Math.abs(trendValue)}%
        </div>
      )}
    </div>
  );
}
