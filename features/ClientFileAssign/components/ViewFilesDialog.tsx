"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import {
  AssignedFile,
  ClientAssignment,
} from "../types/clientAssignment.types";

interface ViewFilesDialogProps {
  client: ClientAssignment | null;
  files: AssignedFile[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewFilesDialog({
  client,
  files,
  isOpen,
  onOpenChange,
}: ViewFilesDialogProps) {
  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Client Files</DialogTitle>
          <DialogDescription>
            Files assigned under {client.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {files.length === 0 ? (
            <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
              No files available for this client.
            </div>
          ) : (
            files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.type} · {file.isoStandard}
                    </p>
                  </div>
                </div>

                <Badge variant="secondary">{file.status}</Badge>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
