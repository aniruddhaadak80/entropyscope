"use client";

import { useAppStore } from "@/lib/store";
import { type World, createWorld, stepYear } from "@repo/core";
import { DEFAULT_CONFIG } from "@repo/core/src/config";
import { Badge } from "@repo/ui/src/components/Badge";
import { Button } from "@repo/ui/src/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/src/components/Card";
import { Slider } from "@repo/ui/src/components/Slider";
import { Sparkline } from "@repo/ui/src/components/Sparkline";
import { Stat } from "@repo/ui/src/components/Stat";
import { Toggle } from "@repo/ui/src/components/Toggle";
import * as React from "react";

export default function Dashboard() {
  const {
    world,
    setWorld,
    stepResult,
    setStepResult,
    isPlaying,
    setIsPlaying,
    simSpeed,
    setSimSpeed,
  } = useAppStore();

  const [history, setHistory] = React.useState<World[]>([]);

  const initWorld = React.useCallback(() => {
    const w = createWorld(DEFAULT_CONFIG);
    setWorld(w);
    setHistory([w]);
  }, [setWorld]);

  const runStep = React.useCallback(() => {
    if (!world) return;
    const result = stepYear(world, DEFAULT_CONFIG);
    setStepResult(result);
    setWorld(result.world);
    setHistory((h) => [...h, result.world]);
  }, [world, setWorld, setStepResult, setHistory]);

  const reset = React.useCallback(() => {
    initWorld();
    setStepResult(null);
  }, [initWorld, setStepResult]);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    initWorld();
  }, [initWorld]);

  if (!world) return null;

  const latest = history[history.length - 1];
  const wageHistory = history.map((w, i) => ({ x: i, y: w.totalWageBill / 1000 }));
  const unempHistory = history.map((w, i) => ({ x: i, y: w.unemploymentRate * 100 }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="slab-text text-3xl font-bold text-white">Workforce Simulator</h1>
          <p className="text-muted-foreground text-sm">
            Year {latest.year} of {DEFAULT_CONFIG.years} · {latest.workers.length} simulated workers
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isPlaying ? "default" : "secondary"}>
            {isPlaying ? "Playing" : "Paused"}
          </Badge>
          <Button onClick={runStep} disabled={isPlaying}>
            Step year
          </Button>
          <Button variant="outline" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Unemployment" value={`${(latest.unemploymentRate * 100).toFixed(1)}%`} />
        <Stat label="Wage bill" value={`$${(latest.totalWageBill / 1e6).toFixed(1)}M`} />
        <Stat label="AI exposure" value={`${(latest.aiAdoptionRate * 100).toFixed(1)}%`} />
        <Stat label="Remote rate" value={`${(latest.remoteRate * 100).toFixed(1)}%`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Wage bill over time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Sparkline data={wageHistory.slice(-30).map((d) => d.y)} color="#22d3ee" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector composition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {latest.sectors.map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-white">{s.workerCount}</span>
                  <div className="h-2 w-24 bg-indigo-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-plasma-cyan"
                      style={{ width: `${(s.workerCount / latest.workers.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Unemployment rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <Sparkline data={unempHistory.slice(-30).map((d) => d.y)} color="#ef4444" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Simulation speed</span>
              <span className="text-xs text-muted-foreground">{simSpeed}x</span>
            </div>
            <Slider value={simSpeed} onValueChange={setSimSpeed} min={1} max={5} />
            <div className="flex items-center gap-2">
              <Toggle checked={isPlaying} onCheckedChange={setIsPlaying} label="Auto-step" />
            </div>
            <p className="text-xs text-muted-foreground">
              Deterministic — seed {DEFAULT_CONFIG.seed}. Same seed, same universe.
            </p>
          </CardContent>
        </Card>
      </div>

      {stepResult && (
        <Card>
          <CardHeader>
            <CardTitle>Last step changes</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-plasma-cyan font-bold text-xl">
                {stepResult.changes.workersAffected}
              </div>
              <div className="text-xs text-muted-foreground">Workers affected</div>
            </div>
            <div className="text-center">
              <div className="text-red-500 font-bold text-xl">-{stepResult.changes.jobsLost}</div>
              <div className="text-xs text-muted-foreground">Jobs lost</div>
            </div>
            <div className="text-center">
              <div className="text-green-500 font-bold text-xl">
                +{stepResult.changes.jobsGained}
              </div>
              <div className="text-xs text-muted-foreground">Jobs gained</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-xl">
                ${(stepResult.changes.wageBillDelta / 1e6).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground">Wage bill delta</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
