"use client";
import { scenarios } from "@repo/seed";
import { Badge } from "@repo/ui/src/components/Badge";
import { Button } from "@repo/ui/src/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/src/components/Card";

export default function ScenariosPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="slab-text text-3xl font-bold text-white">Scenarios</h1>
        <Button>Create scenario</Button>
      </div>
      <p className="text-muted-foreground">
        Define branching forecast timelines with policy shocks. Each scenario runs deterministically
        from seed 7331.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {scenarios.map((s) => (
          <Card key={s.id} className="hover:bg-indigo-900/40 transition">
            <CardHeader>
              <CardTitle className="text-white">{s.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{s.description}</p>
              <div className="flex gap-2">
                {s.policies.map((p) => (
                  <Badge key={`${s.id}-${p.year}`} variant="outline">
                    {p.type} @ Y{p.year}
                  </Badge>
                ))}
                {s.policies.length === 0 && <Badge variant="secondary">No shocks</Badge>}
              </div>
              <Button size="sm" className="w-full" onClick={() => {}}>
                Run
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
