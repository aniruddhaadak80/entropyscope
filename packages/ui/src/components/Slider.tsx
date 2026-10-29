"use client";

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function Slider({ value, onValueChange, min = 0, max = 100 }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onValueChange(Number(e.target.value))}
      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
    />
  );
}
