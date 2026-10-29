"use client";

import type * as React from "react";
import { cn } from "../utils/cn";

interface KbdProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export function Kbd({ className, children, ...props }: KbdProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center border border-input bg-background px-1.5 py-0.5 rounded text-xs font-medium text-foreground shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
