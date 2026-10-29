import type { Scenario, ScenarioState, StepResult, World } from "@repo/core";
import { create } from "zustand";

export interface AppState {
  // World
  world: World | null;
  setWorld: (world: World) => void;
  stepResult: StepResult | null;
  setStepResult: (result: StepResult | null) => void;

  // Scenario
  scenario: Scenario | null;
  setScenario: (scn: Scenario) => void;
  scenarioStates: ScenarioState[];
  setScenarioStates: (states: ScenarioState[]) => void;

  // UI
  activeTab: "dashboard" | "scenarios" | "markets" | "time-machine" | "calibration" | "world";
  setActiveTab: (tab: AppState["activeTab"]) => void;
  simSpeed: number;
  setSimSpeed: (speed: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  world: null,
  setWorld: (world) => set({ world }),
  stepResult: null,
  setStepResult: (result) => set({ stepResult: result }),
  scenario: null,
  setScenario: (scn) => set({ scenario: scn }),
  scenarioStates: [],
  setScenarioStates: (states) => set({ scenarioStates: states }),
  activeTab: "dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),
  simSpeed: 1,
  setSimSpeed: (speed) => set({ simSpeed: speed }),
  isPlaying: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
}));
