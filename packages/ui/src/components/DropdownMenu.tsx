"use client";

import * as React from "react";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children?: React.ReactNode;
}

export function DropdownMenu({ trigger, children }: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="cursor-pointer inline-block"
        onKeyDown={(e) => {
          if (e.key === "Enter") setOpen(!open);
        }}
      >
        {trigger}
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-48 bg-background border border-input rounded-lg shadow-lg py-1">
          {children}
        </div>
      )}
    </div>
  );
}

interface DropdownMenuItemProps {
  onSelect?: () => void;
  children?: React.ReactNode;
}

export function DropdownMenuItem({ onSelect, children }: DropdownMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
    >
      {children}
    </button>
  );
}
