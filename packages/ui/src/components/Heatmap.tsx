"use client";

interface HeatmapProps {
  data: number[][];
  cellSize?: number;
  colorScale?: (value: number) => string;
}

export function Heatmap({ data, cellSize = 20, colorScale }: HeatmapProps) {
  const defaultColor = (v: number) => `hsl(200, 70%, ${30 + v * 60}%)`;
  const color = colorScale ?? defaultColor;
  return (
    <div className="overflow-auto">
      <table className="border-collapse">
        <tbody>
          {data.map((row, r) => (
            <tr key={`row-${r}`}>
              {row.map((v, c) => (
                <td
                  key={`cell-${r}-${c}`}
                  className="p-0"
                  style={{ width: cellSize, height: cellSize, backgroundColor: color(v) }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
