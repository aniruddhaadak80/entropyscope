"use client";

import * as React from "react";
import { cn } from "../utils/cn";

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children?: React.ReactNode;
}

interface TabsTriggerProps {
  _value: string;
  children?: React.ReactNode;
}

interface TabsContentProps {
  _value: string;
  children?: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(
        child as React.ReactElement,
        {
          value,
          onValueChange,
        } as Record<string, unknown>,
      );
    }
    return child;
  });
}

export function TabsList({ children }: TabsListProps) {
  return <div className="inline-flex flex-wrap gap-1 border-b border-input">{children}</div>;
}

export function TabsTrigger({ _value, children }: TabsTriggerProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-sm px-3 py-2",
        "data-[state=active]:border-b-2 data-[state=active]:border-primary",
      )}
      onClick={() => {
        // handled by parent
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ _value, children }: TabsContentProps) {
  return <div className="mt-4">{children}</div>;
}
