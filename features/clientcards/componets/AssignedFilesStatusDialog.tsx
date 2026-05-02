import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { StatusSummary } from "../types/client";
import { SCHEME_COLORS } from "../constants/client";

interface AssignedFilesStatusDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  summary: StatusSummary;
}

export function AssignedFilesStatusDialog({
  isOpen,
  onOpenChange,
  summary,
}: AssignedFilesStatusDialogProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-6 border-b border-slate-100 text-left">
          <SheetTitle className="text-lg font-bold text-slate-900">
            Assigned Files Status
          </SheetTitle>
          <SheetDescription>
            Overview of your assigned client files by status and scheme.
          </SheetDescription>
        </SheetHeader>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">Total</p>
              <p className="text-2xl font-bold">{summary.total}</p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-semibold text-emerald-600">Active</p>
              <p className="text-2xl font-bold text-emerald-700">
                {summary.active}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-500">Inactive</p>
              <p className="text-2xl font-bold text-slate-700">
                {summary.inactive}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Files by Scheme
            </h3>

            <div className="grid grid-cols-3 gap-3 max-h-[calc(100vh-260px)] overflow-y-auto pr-1">
              {(Object.entries(summary.byScheme) as [string, number][])
                .filter(([, count]) => count > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([scheme, count]) => {
                  const colorClasses =
                    SCHEME_COLORS[scheme as keyof typeof SCHEME_COLORS] ||
                    "bg-slate-100 text-slate-700 border-slate-200";

                  const bg = colorClasses.split(" ")[0];
                  const text = colorClasses.split(" ")[1];

                  return (
                    <div
                      key={scheme}
                      className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition"
                    >
                      {/* Color dot */}
                      <div className={`w-2.5 h-2.5 rounded-full mb-2 ${bg}`} />

                      {/* Scheme */}
                      <p className={`text-xs font-semibold ${text}`}>
                        {scheme}
                      </p>

                      {/* Count */}
                      <p className="text-lg font-bold text-slate-900 mt-1">
                        {count}
                      </p>

                      <p className="text-[10px] text-slate-400 uppercase">
                        files
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        
      </SheetContent>
    </Sheet>
  );
}
