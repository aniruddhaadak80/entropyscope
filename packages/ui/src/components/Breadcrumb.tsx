"use client";

import * as React from "react";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <React.Fragment key={item.href ?? item.label}>
          {i > 0 && <span className="text-muted-foreground">/</span>}
          {item.href ? (
            <a href={item.href} className="hover:text-primary">
              {item.label}
            </a>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
