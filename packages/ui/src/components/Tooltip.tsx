"use client";

import * as React from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export function Tooltip({ children, text }: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {open && (
        <div className="absolute z-50 mt-1 px-2 py-1 bg-[#333] text-white text-xs rounded whitespace-nowrap pointer-events-none">
          {text}
        </div>
      )}
    </div>
  );
}
