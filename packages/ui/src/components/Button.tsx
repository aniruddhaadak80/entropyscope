"use client";

import * as React from "react";
import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            default: "bg-plasma-cyan text-indigo-950 shadow hover:bg-plasma-cyan/90",
            destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
            outline:
              "border border-indigo-900 bg-background shadow-sm hover:bg-indigo-900/20 hover:text-white",
            secondary: "bg-indigo-900 text-white shadow-sm hover:bg-indigo-800",
            ghost: "hover:bg-indigo-900/30 hover:text-white",
            link: "text-plasma-cyan underline-offset-4 hover:underline",
          },
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "lg" && "h-11 rounded-md px-8",
          size === "icon" && "h-10 w-10",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
