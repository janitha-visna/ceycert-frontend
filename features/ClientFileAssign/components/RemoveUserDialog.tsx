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
      <AlertDialogContent className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            Unassign Authorized Person?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-medium text-slate-500">
            This will remove{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {client.assignedPerson}
            </span>{" "}
            from the
            <span className="font-bold text-slate-900 dark:text-slate-100">
              {" "}
              {client.name}
            </span>{" "}
            account. The client status will change to Unassigned.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel
            variant="outline"
            size="default"
            className="rounded-xl border-slate-200 dark:border-slate-800 font-bold h-10 px-6"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="default"
            size="default"
            onClick={() => onConfirm(client.id)}
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white border-none font-bold h-10 px-6"
          >
            Confirm Removal
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
