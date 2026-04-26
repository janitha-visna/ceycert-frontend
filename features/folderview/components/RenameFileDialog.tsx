// features/folderview/components/RenameFileDialog.tsx

"use client";

import { useEffect, useState } from "react";
import { FileItem } from "../mockData";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RenameFileDialogProps {
  item: FileItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (item: FileItem, newName: string) => void;
}

export function RenameFileDialog({
  item,
  open,
  onOpenChange,
  onConfirm,
}: RenameFileDialogProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(item?.name ?? "");
  }, [item]);

  const handleSubmit = () => {
    if (!item) return;

    const trimmedName = name.trim();
    if (!trimmedName) return;

    onConfirm(item, trimmedName);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename item</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Rename</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
