"use client";

import type * as React from "react";

interface TableProps<T> {
  columns: string[];
  data: T[];
  renderCell: (row: T, col: string) => React.ReactNode;
}

export function Table<T>({ columns, data, renderCell }: TableProps<T>) {
  return (
    <div className="overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left font-medium pb-2">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b">
              {columns.map((col) => (
                <td key={col} className="p-2">
                  {renderCell(row, col)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
