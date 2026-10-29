"use client";
import { cn } from "../utils/cn";

interface StepperProps {
  steps: string[];
  activeStep: number;
}

export function Stepper({ steps, activeStep }: StepperProps) {
  return (
    <div className="relative flex items-center gap-4">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 h-[1px] w-full bg-muted z-0" />
      {steps.map((step, i) => (
        <div key={step} className="relative z-10 flex flex-col items-center gap-2">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
              i === activeStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {i + 1}
          </div>
          <span className="text-xs text-center w-16">{step}</span>
        </div>
      ))}
    </div>
  );
}
