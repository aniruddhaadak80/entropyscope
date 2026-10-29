"use client";

interface GaugeProps {
  value: number; // 0..1
  label: string;
  width?: number;
  height?: number;
}

export function Gauge({ value, label, width = 100, height = 100 }: GaugeProps) {
  const angle = value * 180;
  return (
    <div className="flex flex-col items-center">
      <svg width={width} height={height} viewBox="0 0 100 100" role="img" aria-label="Gauge chart">
        <title>Gauge chart</title>
        <path d="M20,80 A60,60 0 0,1 80,80" stroke="#e5e7eb" strokeWidth="10" fill="none" />
        <path
          d={`M20,80 A60,60 0 0,${value > 0.5 ? 1 : 0} ${20 + 60 * Math.cos(((180 - angle) * Math.PI) / 180)},${80 - 60 * Math.sin(((180 - angle) * Math.PI) / 180)}`}
          stroke="#3b82f6"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      <div className="mt-2 text-sm font-medium">{label}</div>
      <div className="text-xs text-muted-foreground">{Math.round(value * 100)}%</div>
    </div>
  );
}
