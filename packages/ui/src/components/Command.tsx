"use client";

import type * as React from "react";

interface CommandProps {
  placeholder?: string;
  onSelect?: (item: string) => void;
  children?: React.ReactNode;
}

export function Command({ placeholder = "Search..." }: CommandProps) {
  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
