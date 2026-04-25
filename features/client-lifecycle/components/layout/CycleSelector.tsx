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
        <TabsList className="inline-flex h-auto w-auto gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {cycles.map((cycle) => (
            <TabsTrigger
              key={cycle.id}
              value={cycle.id}
              className="w-auto rounded-lg px-5 py-1.5 text-sm data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm"
            >
              {cycle.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
