"use client";

import type * as React from "react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
      />
      <div className="bg-background p-6 rounded-xl shadow-lg border border-input w-full max-w-lg">
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
        <button type="button" onClick={onClose} className="mt-4 btn-primary">
          Close
        </button>
      </div>
    </div>
  );
}
