import { BarChart3, FolderKanban } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientFilesHeaderProps {
  onShowStatus: () => void;
}

export function ClientFilesHeader({ onShowStatus }: ClientFilesHeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
            <FolderKanban className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Client Files
            </h1>
            <p className="text-sm text-slate-500">
              View assigned client folders, schemes, status, and audit dates.
            </p>
          </div>
        </div>

        <Button onClick={onShowStatus} className="gap-2"> 
          My Status
        </Button>
      </div>
    </header>
  );
}
