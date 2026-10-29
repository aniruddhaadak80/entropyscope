"use client";

import * as React from "react";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function Popover({ trigger, children }: PopoverProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="relative inline-block"
      onClick={() => setOpen(!open)}
      onKeyDown={(e) => {
        if (e.key === "Enter") setOpen(!open);
      }}
    >
      {React.cloneElement(trigger as React.ReactElement)}
      {open && (
        <div className="absolute z-50 mt-2 w-48 bg-background border border-input rounded-lg shadow-lg py-2">
          {children}
        </div>
      )}
    </div>
  );
}
