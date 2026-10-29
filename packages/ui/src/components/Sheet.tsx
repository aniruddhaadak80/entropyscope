"use client";

import type * as React from "react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: "top" | "right" | "bottom" | "left";
  children?: React.ReactNode;
}

export function Sheet({ open, onClose, title, side = "right", children }: SheetProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/40"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      />
      <div
        className={`fixed inset-0 bg-background shadow-lg border border-input ${
          side === "right"
            ? "top-0 right-0 h-full w-full max-w-md transform translate-x-full transition-transform duration-300 ease-in-out"
            : side === "left"
              ? "top-0 left-0 h-full w-full max-w-md transform translate-x-[-100%] transition-transform duration-300 ease-in-out"
              : side === "top"
                ? "top-0 left-0 w-full h-full max-h-md transform translate-y-[-100%] transition-transform duration-300 ease-in-out"
                : "bottom-0 left-0 w-full h-full max-h-md transform translate-y-full transition-transform duration-300 ease-in-out"
        }`}
      >
        {title && <div className="p-4 border-b">{title}</div>}
        <div className="p-4">{children}</div>
        <button type="button" onClick={onClose} className="mt-2 p-2">
          Close
        </button>
      </div>
    </div>
  );
}
