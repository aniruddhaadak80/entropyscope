"use client";

import type * as React from "react";
import { cn } from "../utils/cn";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
}

export function Avatar({ src, alt, className, ...props }: AvatarProps) {
  return (
    <div
      className={cn("relative flex shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? "avatar"} className="aspect-square h-full w-full object-cover" />
      ) : (
        <div className="aspect-square h-full w-full bg-muted flex items-center justify-center">
          {alt ? alt.charAt(0).toUpperCase() : "?"}
        </div>
      )}
    </div>
  );
}
