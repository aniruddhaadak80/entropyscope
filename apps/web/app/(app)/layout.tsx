"use client";

import { useAppStore } from "@/lib/store";
import type { AppState } from "@/lib/store";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activeTab, setActiveTab } = useAppStore();

  const tabs = [
    { key: "dashboard", label: "Simulate", icon: "▶" },
    { key: "scenarios", label: "Scenarios", icon: "🌿" },
    { key: "markets", label: "Markets", icon: "📈" },
    { key: "time-machine", label: "Time Machine", icon: "⏳" },
    { key: "calibration", label: "Calibration", icon: "🎯" },
    { key: "world", label: "World", icon: "🌍" },
  ];

  return (
    <div className="flex flex-col h-full">
      <header className="border-b border-indigo-900 bg-indigo-950/90 backdrop-blur h-16 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <span className="slab-text text-lg font-bold text-plasma-cyan">ENTROPYSCOPE</span>
          <span className="text-xs text-muted-foreground border border-indigo-900 px-2 py-0.5 rounded">
            sandbox
          </span>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as AppState["activeTab"])}
              className={`
                flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition
                ${
                  activeTab === t.key
                    ? "bg-plasma-cyan text-indigo-950"
                    : "text-muted-foreground hover:text-plasma-cyan hover:bg-indigo-900/30"
                }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  );
}
