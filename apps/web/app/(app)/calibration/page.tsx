"use client";
import { Button } from "@repo/ui/src/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/src/components/Card";

export default function CalibrationPage() {
  return (
    <div className="space-y-6">
      <h1 className="slab-text text-3xl font-bold text-white">Forecast Calibration</h1>
      <p className="text-muted-foreground">
        Make probabilistic predictions about scenario outcomes. After resolution, your Brier score
        shows how well-calibrated you are. Lower is better.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Mean Brier score</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-plasma-cyan">—</div>
            <p className="text-xs text-muted-foreground mt-2">Lower = better calibrated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Forecasts made</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-4xl font-bold text-white">0</div>
            <p className="text-xs text-muted-foreground mt-2">Total predictions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Calibration curve</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Make forecasts to see your calibration curve.
            </p>
            <Button className="w-full mt-4">Make a forecast</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
