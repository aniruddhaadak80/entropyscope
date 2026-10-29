"use client";

import type * as React from "react";
import { cn } from "../utils/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("w-full max-w-72 mx-auto px-6", className)} {...props} />;
}
