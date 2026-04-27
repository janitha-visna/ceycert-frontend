import { Button } from "@/components/ui/button";
import { Search, Plus, UserPlus } from "lucide-react";

export function ClientAssignmentHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Client Assignment Management
        </h1>
        <p className="text-muted-foreground">
          Manage ISO clients, assigned auditors, and certification files.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm">
          <Search className="mr-2 h-4 w-4" />
          Search Client
        </Button>

        <Button variant="outline" size="sm">
          <UserPlus className="mr-2 h-4 w-4" />
          Assign User
        </Button>

        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          New Client
        </Button>
      </div>
    </div>
  );
}
