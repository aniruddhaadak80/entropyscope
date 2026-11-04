"use client";

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Accessible name announced by screen readers. */
  ariaLabel?: string;
}

export function Slider({
  value,
  onValueChange,
  min = 0,
  max = 100,
  ariaLabel = "Slider",
}: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      aria-label={ariaLabel}
      onChange={(e) => onValueChange(Number(e.target.value))}
      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
    />
  );
}
