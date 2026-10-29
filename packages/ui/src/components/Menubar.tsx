"use client";

import type * as React from "react";

interface MenubarProps {
  children: React.ReactNode;
}

export function Menubar({ children }: MenubarProps) {
  return <div className="flex items-center gap-4 border-b border-input pb-2">{children}</div>;
}

interface MenubarMenuProps {
  title: string;
  children: React.ReactNode;
}

export function MenubarMenu({ title, children }: MenubarMenuProps) {
  return (
    <div className="relative group">
      <button type="button" className="text-sm font-medium hover:text-primary">
        {title}
      </button>
      <div className="absolute top-full left-0 mt-1 bg-background border border-input rounded-lg shadow-lg py-1 hidden group-hover:block">
        {children}
      </div>
    </div>
  );
}

interface MenubarMenuItemProps {
  onSelect?: () => void;
  children?: React.ReactNode;
}

export function MenubarMenuItem({ onSelect, children }: MenubarMenuItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="block w-full text-left px-3 py-2 text-sm hover:bg-accent"
    >
      {children}
    </button>
  );
}
