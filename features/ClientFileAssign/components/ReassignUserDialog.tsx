"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  AuthorizedPerson,
  ClientAssignment,
} from "../types/clientAssignment.types";

import { AuthorizedPersonSelect } from "./AuthorizedPersonSelect";
import { CurrentClientCard } from "./CurrentClientCard";
import { AssignmentHistoryList } from "./AssignmentHistoryList";
import { ReassignDialogFooter } from "./ReassignDialogFooter";

interface ReassignUserDialogProps {
  client: ClientAssignment | null;
  auditors: AuthorizedPerson[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (clientId: string, auditorId: string, note: string) => void;
}

export function ReassignUserDialog({
  client,
  auditors,
  isOpen,
  onOpenChange,
  onConfirm,
}: ReassignUserDialogProps) {
  const [selectedAuditorId, setSelectedAuditorId] = useState("");

  useEffect(() => {
    if (!isOpen || !client) return;

    const currentAuditor = auditors.find(
      (auditor) => auditor.name === client.assignedPerson,
    );

    setSelectedAuditorId(currentAuditor?.id || "");
  }, [isOpen, client, auditors]);

  if (!client) return null;

  const handleSave = () => {
    if (!selectedAuditorId) return;
    onConfirm(client.id, selectedAuditorId, "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] overflow-hidden rounded-3xl p-0">
        <DialogHeader className="border-b px-6 py-5 text-left">
          <DialogTitle className="text-xl font-semibold">
            Reassign Authorized Person
          </DialogTitle>

          <DialogDescription>
            Select a new authorized person for this client.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="assign" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid h-11 grid-cols-2 rounded-xl bg-muted p-1">
              <TabsTrigger value="assign" className="rounded-lg">
                Assign User
              </TabsTrigger>

              <TabsTrigger value="history" className="rounded-lg">
                Assignment History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="assign" className="m-0">
            <div className="space-y-5 px-6 py-6">
              <AuthorizedPersonSelect
                auditors={auditors}
                selectedAuditorId={selectedAuditorId}
                onSelect={setSelectedAuditorId}
              />

              <CurrentClientCard client={client} />
            </div>

            <ReassignDialogFooter
              saveLabel="Save Changes"
              disabled={!selectedAuditorId}
              onCancel={() => onOpenChange(false)}
              onSave={handleSave}
            />
          </TabsContent>

          <TabsContent value="history" className="m-0">
            <AssignmentHistoryList />

            <ReassignDialogFooter
              saveLabel="Close"
              hideCancel
              onSave={() => onOpenChange(false)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
