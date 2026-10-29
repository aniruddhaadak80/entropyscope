"use client";

import { cn } from "../utils/cn";

interface ChartDataPoint {
  x: string | number;
  y: number;
}

interface ChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  color?: string;
}

export function Chart({ data, width = 400, height = 200, color = "#22d3ee" }: ChartProps) {
  if (data.length === 0) return null;

  const maxY = Math.max(...data.map((d) => d.y));
  const minY = Math.min(...data.map((d) => d.y));
  const range = maxY - minY || 1;
  const stepX = width / Math.max(data.length - 1, 1);

  const points = data
    .map((d: ChartDataPoint, i: number) => {
      const x = i * stepX;
      const y = height - ((d.y - minY) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      className={cn("w-full h-full", "text-primary")}
      role="img"
      aria-label="Line chart"
    >
      <polyline points={points} fill="none" stroke={color} strokeWidth={2} />
      {data.map((d: ChartDataPoint, i: number) => (
        <circle
          key={`${d.x}-${i}`}
          cx={i * stepX}
          cy={height - ((d.y - minY) / range) * height}
          r={3}
          fill={color}
        />
      ))}
    </svg>
  );
}
