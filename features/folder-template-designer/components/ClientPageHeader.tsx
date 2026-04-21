"use client";

import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientPageHeaderProps {
  onCreate: () => void;
  onSearchFolders: () => void;
}

export function ClientPageHeader({
  onCreate,
  onSearchFolders,
}: ClientPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage client folders using predefined templates.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onSearchFolders}
          className="gap-2 rounded-lg"
        >
          <Search className="h-4 w-4" />
          Search Client Folder
        </Button>

        <Button onClick={onCreate} className="gap-2 rounded-lg">
          <Plus className="h-4 w-4" />
          New Client
        </Button>
      </div>
    </div>
  );
}
