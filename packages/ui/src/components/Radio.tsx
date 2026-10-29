"use client";

interface RadioProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export function Radio({ value, onValueChange, options }: RadioProps) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={value === opt.value}
            onChange={() => onValueChange(opt.value)}
            className="w-4 h-4 rounded-full border-input text-primary focus:ring-2 focus:ring-primary"
          />
          <span className="text-sm">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}
