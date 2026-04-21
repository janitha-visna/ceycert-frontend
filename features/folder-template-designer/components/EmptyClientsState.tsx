"use client";

import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyClientsStateProps {
  onCreate: () => void;
}

export function EmptyClientsState({ onCreate }: EmptyClientsStateProps) {
  return (
    <Card className="rounded-2xl border border-dashed shadow-sm">
      <CardContent className="flex flex-col items-center justify-center space-y-3 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
          <FolderOpen className="h-6 w-6 text-muted-foreground" />
        </div>

        <div className="space-y-1">
          <h2 className="text-lg font-semibold">No clients yet</h2>
          <p className="text-sm text-muted-foreground">
            Start by creating a new client and selecting a folder template.
          </p>
        </div>

        <Button onClick={onCreate} className="mt-2 gap-2">
          <Plus className="h-4 w-4" />
          Create Client
        </Button>
      </CardContent>
    </Card>
  );
}
