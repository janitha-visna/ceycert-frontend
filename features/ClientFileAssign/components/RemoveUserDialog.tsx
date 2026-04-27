import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, UserMinus } from "lucide-react";
import { ClientAssignment } from "../types/clientAssignment.types";

interface RemoveUserDialogProps {
  client: ClientAssignment | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (clientId: string) => void;
}

export function RemoveUserDialog({
  client,
  isOpen,
  onOpenChange,
  onConfirm,
}: RemoveUserDialogProps) {
  if (!client) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[520px] rounded-2xl p-0 overflow-hidden shadow-2xl border">
        {/* 🔴 Header */}
        <div className="bg-red-50 dark:bg-red-950/20 px-6 py-5 border-b">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>

            <AlertDialogHeader className="space-y-1 text-left">
              <AlertDialogTitle className="text-xl font-bold">
                Unassign Authorized Person?
              </AlertDialogTitle>

              <AlertDialogDescription className="text-sm text-muted-foreground leading-6">
                This action will remove the assigned authorized person from this
                client account.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </div>
        </div>

        {/* 🧾 Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Summary Card */}
          <div className="rounded-xl border bg-background p-4">
            <div className="flex items-center gap-2 mb-3">
              <UserMinus className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Removal Summary</span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Authorized Person</span>
                <span className="font-semibold">
                  {client.assignedPerson || "Not Assigned"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Client</span>
                <span className="font-semibold text-right">{client.name}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">New Status</span>
                <Badge variant="secondary">Unassigned</Badge>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg bg-muted/50 px-4 py-3 text-xs text-muted-foreground leading-5">
            After confirming, this client will no longer have an assigned
            authorized person. You can assign another person later.
          </div>
        </div>

        {/* 🔥 Footer FIXED */}
        <AlertDialogFooter className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-background">
          <AlertDialogCancel className="h-10 px-6 rounded-full">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() => onConfirm(client.id)}
            className="h-10 px-6 rounded-full bg-red-600 text-white hover:bg-red-700"
          >
            Confirm Removal
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
