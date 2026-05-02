import { Files, LayoutPanelTop } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientFilesHeaderProps {
  onShowStatus: () => void;
}

export function ClientFilesHeader({ onShowStatus }: ClientFilesHeaderProps) {
  return (
    <header className="px-8 pt-8 pb-6 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Client Files
        </h1>
        <p className="text-slate-500 text-sm">
          View and manage assigned client folders and audit status.
        </p>
      </div>

      <Button
        onClick={onShowStatus}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 h-auto rounded-lg font-medium text-sm transition-colors shadow-sm active:scale-95 flex items-center gap-2 border-none"
      >
        <LayoutPanelTop className="h-4.5 w-4.5" />
        View My Assigned Files Status
      </Button>
    </header>
  );
}
