"use client";

import * as React from "react";

interface ComboboxProps {
  options: string[];
  onValueChange: (value: string) => void;
}

export function Combobox({ options, onValueChange }: ComboboxProps) {
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const filtered = options.filter((o) => o.toLowerCase().includes(value.toLowerCase()));
  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {open && filtered.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-background border border-input rounded-lg shadow-lg max-h-48 overflow-auto">
          {filtered.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onValueChange(opt);
                setValue(opt);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-accent"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
