"use client";

import type * as React from "react";
import { cn } from "../utils/cn";

interface ToggleProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  label?: string;
}

export function Toggle({
  checked = false,
  onCheckedChange,
  className,
  label,
  ...props
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        checked ? "bg-primary" : "bg-input",
        className,
      )}
      {...props}
    >
      {label && <span className="ml-2 text-sm text-white">{label}</span>}
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}
