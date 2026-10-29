"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/src/components/Card";
import { Table } from "@repo/ui/src/components/Table";

type SectorRow = {
  sector: string;
  workers: number;
  aiExposure: string;
  remoteRate: string;
  wageBase: string;
};

export default function WorldPage() {
  const columns = ["Sector", "Workers", "AI Exposure", "Remote Rate", "Wage Base"];
  const data: SectorRow[] = [
    {
      sector: "Healthcare",
      workers: 124,
      aiExposure: "25%",
      remoteRate: "35%",
      wageBase: "$65,000",
    },
    { sector: "Education", workers: 98, aiExposure: "40%", remoteRate: "45%", wageBase: "$55,000" },
    {
      sector: "Technology",
      workers: 156,
      aiExposure: "70%",
      remoteRate: "85%",
      wageBase: "$95,000",
    },
    {
      sector: "Manufacturing",
      workers: 112,
      aiExposure: "75%",
      remoteRate: "15%",
      wageBase: "$60,000",
    },
    { sector: "Finance", workers: 87, aiExposure: "65%", remoteRate: "60%", wageBase: "$85,000" },
    { sector: "Retail", workers: 143, aiExposure: "55%", remoteRate: "20%", wageBase: "$40,000" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="slab-text text-3xl font-bold text-white">World Explorer</h1>
      <p className="text-muted-foreground">
        Drill into sectors, workers, and jobs. Watch the labor market evolve year by year.
      </p>
      <Card>
        <CardHeader>
          <CardTitle className="text-white">Sector composition (current year)</CardTitle>
        </CardHeader>
        <CardContent>
          <Table
            columns={columns}
            data={data}
            renderCell={(row: SectorRow, col: string) => {
              const vals: Record<string, string> = {
                Sector: row.sector,
                Workers: row.workers.toString(),
                "AI Exposure": row.aiExposure,
                "Remote Rate": row.remoteRate,
                "Wage Base": row.wageBase,
              };
              return vals[col];
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
