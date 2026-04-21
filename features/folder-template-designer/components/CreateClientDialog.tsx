"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Template } from "../types/client";

interface CreateClientDialogProps {
  open: boolean;
  clientName: string;
  selectedTemplateId: string;
  templates: Template[];
  onClientNameChange: (value: string) => void;
  onTemplateChange: (value: string) => void;
  onClose: () => void;
  onCreate: () => void;
}

export function CreateClientDialog({
  open,
  clientName,
  selectedTemplateId,
  templates,
  onClientNameChange,
  onTemplateChange,
  onClose,
  onCreate,
}: CreateClientDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold">
            Create New Client
          </DialogTitle>
          <DialogDescription>
            Enter the client name and select the folder template to use.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Client Name</label>
            <Input
              placeholder="Enter client name"
              value={clientName}
              onChange={(e) => onClientNameChange(e.target.value)}
              className="rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Folder Template</label>
            <select
              value={selectedTemplateId}
              onChange={(e) => onTemplateChange(e.target.value)}
              className="flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onCreate}
            disabled={!clientName.trim() || !selectedTemplateId}
          >
            Create Client
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
