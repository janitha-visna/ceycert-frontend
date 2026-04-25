import React from "react";
import { Cycle } from "../types";

interface LayoutProps {
  cycles: Cycle[];
  currentCycleId: string;
  currentStageId: string;
  onCycleChange: (id: string) => void;
  onStageChange: (id: string) => void;
  children: React.ReactNode;
  headerActions?: React.ReactNode;
  cycleSelector?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  cycles,
  currentCycleId,
  currentStageId,
  onStageChange,
  children,
  headerActions,
  cycleSelector,
}) => {
  const currentCycle = cycles.find((c) => c.id === currentCycleId);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950">
      {/* Row 1: Header Actions only */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-center px-4 sm:px-6 lg:px-8">
          {headerActions}
        </div>
      </header>

      {/* Separator */}
      <div className="h-px bg-slate-200" />

      {/* Row 2: Cycle Selector */}
      <div className="z-20 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
        {cycleSelector}
      </div>

      {/* Separator */}
      <div className="h-px bg-slate-100" />

      {/* Row 3: Stage Navigation Tabs */}
      {currentCycle && (
        <div className="z-10 overflow-x-auto border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex gap-8" aria-label="Tabs">
            {currentCycle.stages.map((stage) => {
              const isActive = currentStageId === stage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => onStageChange(stage.id)}
                  className={`
                    whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "border-slate-900 text-slate-950"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-950"
                    }
                  `}
                >
                  {stage.name}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};
