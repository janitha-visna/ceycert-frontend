import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, User } from "lucide-react";
import { UnassignedFile, Auditor } from "../types/clientAssignment.types";

interface AssignFileDialogProps {
  file: UnassignedFile | null;
  auditors: Auditor[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign: (fileId: string, auditorId: string) => void;
}

export function AssignFileDialog({
  file,
  auditors,
  isOpen,
  onOpenChange,
  onAssign,
}: AssignFileDialogProps) {
  const [selectedAuditorId, setSelectedAuditorId] = useState("");

  useEffect(() => {
    if (isOpen) setSelectedAuditorId("");
  }, [isOpen]);

  if (!file) return null;

  const handleAssign = () => {
    if (!selectedAuditorId) return;
    onAssign(file.id, selectedAuditorId);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign File to Authorized Person</DialogTitle>
          <DialogDescription>
            Allocate this file to an auditor for review and processing.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2 rounded-lg border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold">{file.name}</span>
            </div>

            <div className="ml-6 flex flex-col gap-1 text-xs text-muted-foreground">
              <span>Client: {file.clientName}</span>
              <span>Standard: {file.isoStandard}</span>
            </div>
          </div>

          <div className="mt-2 space-y-2">
            <label className="text-sm font-medium">
              Select Authorized Person
            </label>

            <Select
              value={selectedAuditorId}
              onValueChange={setSelectedAuditorId}
            >
              <SelectTrigger className="h-10 w-full border-slate-200 dark:border-slate-800">
                <SelectValue placeholder="Select an auditor" />
              </SelectTrigger>

              <SelectContent>
                {auditors.map((auditor) => (
                  <SelectItem key={auditor.id} value={auditor.id}>
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{auditor.name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        ({auditor.activeAssignments} active)
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button disabled={!selectedAuditorId} onClick={handleAssign}>
            Assign File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
