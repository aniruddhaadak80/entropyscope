"use client";

import type * as React from "react";
import { cn } from "../utils/cn";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: "1:1" | "4:3" | "16:9";
}

export function AspectRatio({ ratio = "16:9", className, ...props }: AspectRatioProps) {
  const ratios: Record<string, string> = { "1:1": "100%", "4:3": "75%", "16:9": "56.25%" };
  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div style={{ paddingBottom: ratios[ratio] }} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
