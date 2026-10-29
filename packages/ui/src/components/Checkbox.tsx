"use client";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
}

export function Checkbox({ checked, onCheckedChange, label }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="w-4 h-4 rounded border-input text-primary ring-offset-background focus:ring-2 focus:ring-primary"
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
