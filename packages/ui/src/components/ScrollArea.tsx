"use client";

import type * as React from "react";
import { cn } from "../utils/cn";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export function ScrollArea({ className, children, ...props }: ScrollAreaProps) {
  return (
    <div className={cn("overflow-auto", className)} {...props}>
      {children}
    </div>
  );
}
