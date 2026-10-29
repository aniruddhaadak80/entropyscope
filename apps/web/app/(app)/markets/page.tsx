"use client";
import { markets } from "@repo/seed";
import { Badge } from "@repo/ui/src/components/Badge";
import { Button } from "@repo/ui/src/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/src/components/Card";
import { Gauge } from "@repo/ui/src/components/Gauge";

export default function MarketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="slab-text text-3xl font-bold text-white">Prediction Markets</h1>
        <Button>Create market</Button>
      </div>
      <p className="text-muted-foreground">
        Buy shares on scenario outcomes. Prices move with a constant-product AMM. Deterministic — no
        oracle, no API keys.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((m) => (
          <Card key={m.id} className="hover:bg-indigo-900/40 transition">
            <CardHeader>
              <CardTitle className="text-white">{m.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Yes price</span>
                <Gauge value={m.yesPrice} label="Yes" width={140} height={140} />
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm text-muted-foreground">No price</span>
                <span className="font-mono text-white">{`${(m.noPrice * 100).toFixed(0)}%`}</span>
              </div>
              <Badge variant={m.resolved ? "destructive" : "default"}>
                {m.resolved ? "Resolved" : "Open"}
              </Badge>
              <Button size="sm" className="w-full" disabled={m.resolved}>
                Buy shares
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
