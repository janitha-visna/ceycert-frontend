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
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
        <div className="flex min-h-16 items-center justify-center px-4 py-3 sm:px-6 lg:px-8">
          {headerActions}
        </div>
      </header>

      <div className="z-20 border-b border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
        {cycleSelector}
      </div>

      {currentCycle && (
        <div className="z-10 overflow-x-auto  border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap gap-6" aria-label="Tabs">
            {currentCycle.stages.map((stage) => {
              const isActive = currentStageId === stage.id;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => onStageChange(stage.id)}
                  className={`
                    whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium tracking-tight transition-colors
                    ${
                      isActive
                        ? "border-slate-950 text-slate-950 dark:border-white dark:text-white"
                        : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-950 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-100"
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

      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};