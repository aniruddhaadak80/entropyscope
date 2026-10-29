"use client";

import * as React from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export function Select({ value, onValueChange, options }: SelectProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm text-left focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {options.find((o) => o.value === value)?.label ?? value}
        {open ? " ▲" : " ▼"}
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onValueChange(opt.value);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-accent"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
