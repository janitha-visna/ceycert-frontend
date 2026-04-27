import { Button } from "@/components/ui/button";
import { Search, Plus, UserPlus } from "lucide-react";

export function ClientAssignmentHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Client Assignment Management
        </h1>
        <p className="text-muted-foreground">
          Manage ISO clients, assigned auditors, and certification files.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="h-9 border-slate-200 font-medium hover:bg-slate-50"
        >
          <Search className="mr-2 h-4 w-4 text-slate-400" />
          Search Client
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-9 border-slate-200 font-medium hover:bg-slate-50"
        >
          <UserPlus className="mr-2 h-4 w-4 text-slate-400" />
          Assign User
        </Button>
        <Button
          size="sm"
          className="h-9 bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 font-medium"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Client
        </Button>
      </div>
    </div>
  );
}
