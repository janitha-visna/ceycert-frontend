import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
  const schemeEntries = Object.entries(summary.byScheme)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      {/* ❗ REMOVE overflow here */}
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        {/* HEADER */}
        <SheetHeader className="px-6 py-5 border-b">
          <SheetTitle>Assigned Files Status</SheetTitle>
          <SheetDescription>
            Summary of assigned client files by status and scheme.
          </SheetDescription>
        </SheetHeader>

        {/* ✅ SCROLLABLE CONTENT */}
        <div className="no-scrollbar h-[calc(100vh-80px)] overflow-y-auto px-6 py-6 space-y-8">
          {/* SUMMARY */}
          <div className="grid grid-cols-3 gap-4">
            <SummaryBox label="Total" value={summary.total} />
            <SummaryBox label="Active" value={summary.active} />
            <SummaryBox label="Inactive" value={summary.inactive} />
          </div>

          <Separator />

          {/* SCHEME SECTION */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">
              Files by Scheme
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {schemeEntries.map(([scheme, count]) => {
                const colorClasses =
                  SCHEME_COLORS[scheme as keyof typeof SCHEME_COLORS];

                return (
                  <Card
                    key={scheme}
                    className="hover:shadow-md transition rounded-xl"
                  >
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {scheme}
                        </p>
                        <p className="text-xs text-slate-500">Assigned files</p>
                      </div>

                      <div
                        className={`rounded-full border px-3 py-1 text-sm font-bold ${colorClasses}`}
                      >
                        {count}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SummaryBox({ label, value }: { label: string; value: number }) {
  return (
    <Card className="rounded-xl">
      <CardContent className="p-4">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </CardContent>
    </Card>
  );
}
