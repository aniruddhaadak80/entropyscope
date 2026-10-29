"use client";

interface TimelineItem {
  year: number;
  label: string;
  value: number;
  description?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-[12px] top-0 bottom-0 w-px bg-muted" />
      {items.map((item, idx) => (
        <div key={idx} className="relative pl-14 pb-8">
          <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary border border-background" />
          <div className="text-sm font-medium text-primary-foreground">{item.year}</div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
          {item.description && (
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
          )}
          <div className="text-sm font-medium">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
