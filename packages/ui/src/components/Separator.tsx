"use client";

import type * as React from "react";
import { cn } from "../utils/cn";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  decorative = true,
  className,
  ...props
}: SeparatorProps) {
  return (
    <div
      role={decorative ? undefined : "separator"}
      aria-orientation={orientation}
      className={cn(
        "shrink-0 border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className,
      )}
      {...props}
    />
  );
}
