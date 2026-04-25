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
      <label className="mb-1 block text-xs font-semibold uppercase text-slate-500 sm:hidden">
        Select Cycle
      </label>

      <Tabs
        value={currentCycleId}
        onValueChange={onCycleChange}
        className="inline-flex w-auto"
      >
        <TabsList className="inline-flex h-auto w-auto gap-1 rounded-lg p-1">
          {cycles.map((cycle) => (
            <TabsTrigger
              key={cycle.id}
              value={cycle.id}
              className="w-auto px-4 py-1.5 text-sm"
            >
              {cycle.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
