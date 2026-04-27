import { Badge } from "@/components/ui/badge";
import {
  Clock,
  History,
  ShieldCheck,
  UserCheck,
  UserMinus,
} from "lucide-react";


import { defaultHistory } from "../data/mockClientAssignments";

export function AssignmentHistoryList() {
  return (
    <div className="max-h-[350px] overflow-y-auto px-6 py-6">
      <div className="space-y-5">
        {defaultHistory.map((item, index) => {
          const isLast = index === defaultHistory.length - 1;

          return (
            <div key={index} className="relative flex gap-4">
              {!isLast && (
                <div className="absolute left-4 top-8 h-full w-px bg-border" />
              )}

              <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                {item.type === "Assigned" ? (
                  <UserCheck className="h-4 w-4 text-green-600" />
                ) : item.type === "Reassigned" ? (
                  <Clock className="h-4 w-4 text-blue-600" />
                ) : (
                  <UserMinus className="h-4 w-4 text-red-600" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{item.person}</p>
                  <Badge variant="secondary">{item.type}</Badge>
                </div>

                <div className="mt-1 flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <History className="h-3 w-3" />
                    {item.date}
                  </span>

                  <span className="flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
