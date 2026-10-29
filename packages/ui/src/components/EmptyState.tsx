"use client";

import type * as React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <h3 className="text-lg font-medium">{title}</h3>
      {description && <p className="text-muted-foreground mt-2">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
