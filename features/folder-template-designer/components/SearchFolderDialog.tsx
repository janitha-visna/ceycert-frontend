"use client";

import { Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FolderItem } from "../types/client";

interface SearchFolderDialogProps {
  open: boolean;
  searchTerm: string;
  folders: FolderItem[];
  onSearchChange: (value: string) => void;
  onClose: () => void;
  onDeleteClick: (folder: FolderItem) => void;
}

export function SearchFolderDialog({
  open,
  searchTerm,
  folders,
  onSearchChange,
  onClose,
  onDeleteClick,
}: SearchFolderDialogProps) {
  const filteredFolders = folders.filter((folder) => {
    const value = searchTerm.toLowerCase();
    return (
      folder.folderName.toLowerCase().includes(value) ||
      folder.clientName.toLowerCase().includes(value)
    );
  });

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="sm:max-w-2xl rounded-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold">
            Search Client Folder
          </DialogTitle>
          <DialogDescription>
            Search by client name or folder name.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search folder..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="rounded-lg pl-10"
            />
          </div>

          <div className="max-h-[360px] space-y-3 overflow-y-auto pr-1">
            {filteredFolders.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                No folders found.
              </div>
            ) : (
              filteredFolders.map((folder) => (
                <div
                  key={folder.id}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{folder.folderName}</p>
                    <p className="text-sm text-muted-foreground">
                      Client: {folder.clientName}
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="gap-2"
                    onClick={() => onDeleteClick(folder)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
