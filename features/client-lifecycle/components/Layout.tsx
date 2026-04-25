import React from "react";
import { Cycle } from "../types";
import { ShieldCheck, LogOut, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

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
      {/* Row 1: Header */}
      <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-900 text-white shadow-md">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <ShieldCheck className="mr-3 h-7 w-7 text-primary" />
            <span className="text-lg font-bold tracking-tight text-white">
              CertManager
            </span>
          </div>

          <div className="flex items-center gap-4">
            {headerActions}

            <div className="mx-2 hidden h-6 w-px bg-slate-700 sm:block" />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Help"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              title="Sign Out"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Row 2: Cycle Selector */}
      <div className="z-20 border-b border-slate-200 bg-white px-4 py-3 shadow-sm sm:px-6 lg:px-8">
        {cycleSelector}
      </div>

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
                        ? "border-primary text-primary"
                        : "border-transparent text-slate-700 hover:border-slate-300 hover:text-slate-950"
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

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
};
