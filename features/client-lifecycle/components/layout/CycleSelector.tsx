import React from "react";
import { Cycle } from "../../types";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CycleSelectorProps {
  cycles: Cycle[];
  currentCycleId: string;
  onCycleChange: (id: string) => void;
}

export const CycleSelector: React.FC<CycleSelectorProps> = ({
  cycles,
  currentCycleId,
  onCycleChange,
}) => {
  return (
    <div className="w-full sm:w-auto">
      <Tabs
        value={currentCycleId}
        onValueChange={onCycleChange}
        className="inline-flex w-auto"
      >
        <TabsList className="inline-flex h-auto w-auto gap-1 rounded-2xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900">
          {cycles.map((cycle) => (
            <TabsTrigger
              key={cycle.id}
              value={cycle.id}
              className="w-auto rounded-xl px-6 py-2 text-base font-medium tracking-tight text-slate-600 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:text-slate-400 dark:data-[state=active]:bg-slate-800 dark:data-[state=active]:text-white"
            >
              {cycle.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
