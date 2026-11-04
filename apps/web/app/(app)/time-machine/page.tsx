"use client";
import { Button } from "@repo/ui/src/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/src/components/Card";

export default function TimeMachinePage() {
  return (
    <div className="space-y-6">
      <h1 className="slab-text text-3xl font-bold text-white">Time Machine</h1>
      <p className="text-muted-foreground">
        Fork any simulated year and replay divergent timelines side by side. Deterministic — same
        seed, same fork, every time.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Primary timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Baseline scenario from year 0.</p>
            <Button className="w-full">View timeline</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Fork from year</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label htmlFor="fork-year" className="text-sm text-muted-foreground">
              Fork year
            </label>
            <input
              id="fork-year"
              name="fork-year"
              type="number"
              min={0}
              max={30}
              defaultValue={5}
              className="w-full p-2 border border-indigo-900 bg-indigo-950 rounded"
            />
            <Button className="w-full">Create fork</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
