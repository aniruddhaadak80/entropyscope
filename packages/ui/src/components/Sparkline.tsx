"use client";
import { cn } from "../utils/cn";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

export function Sparkline({ data, width = 200, height = 40, color = "#3b82f6" }: SparklineProps) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      width={width}
      height={height}
      className={cn("text-primary")}
      role="img"
      aria-label="Sparkline chart"
    >
      <title>Sparkline chart</title>
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} />
    </svg>
  );
}
