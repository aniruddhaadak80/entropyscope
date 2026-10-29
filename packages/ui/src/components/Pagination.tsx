"use client";
import { cn } from "../utils/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 text-sm rounded-md border hover:bg-accent disabled:opacity-50"
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={`page-${i}`}
          type="button"
          onClick={() => onPageChange(i + 1)}
          className={cn(
            "px-3 py-1 text-sm rounded-md hover:bg-accent",
            page === i + 1 ? "bg-primary text-primary-foreground" : "",
          )}
        >
          {i + 1}
        </button>
      ))}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 text-sm rounded-md border hover:bg-accent disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
