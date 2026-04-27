"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AuthorizedPerson,
  ClientAssignment,
} from "../types/clientAssignment.types";

import { defaultHistory } from "../data/mockClientAssignments";
import { getInitials } from "../utils/assignmentHelpers";

import {
  Check,
  Clock,
  History,
  ShieldCheck,
  UserCheck,
  UserMinus,
} from "lucide-react";

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

    const current = auditors.find((a) => a.name === client.assignedPerson);

    setSelectedAuditorId(current?.id || "");
  }, [isOpen, client, auditors]);

  if (!client) return null;

  const selectedAuditor = auditors.find((a) => a.id === selectedAuditorId);

  const handleSave = () => {
    if (!selectedAuditorId) return;
    onConfirm(client.id, selectedAuditorId, "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] rounded-3xl p-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="px-6 py-5 border-b">
          <DialogTitle className="text-xl font-semibold">
            Reassign Authorized Person
          </DialogTitle>

          <DialogDescription>
            Select a new authorized person for this client.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="assign" className="w-full">
          {/* TABS */}
          <div className="px-6 pt-4">
            <TabsList className="grid grid-cols-2 h-11 rounded-xl bg-muted p-1">
              <TabsTrigger value="assign" className="rounded-lg">
                Assign User
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-lg">
                Assignment History
              </TabsTrigger>
            </TabsList>
          </div>

          {/* ================= ASSIGN TAB ================= */}
          <TabsContent value="assign" className="m-0">
            <div className="px-6 py-6 space-y-5">
              {/* SELECT */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Authorized Person
                </p>

                <Select
                  value={selectedAuditorId}
                  onValueChange={setSelectedAuditorId}
                >
                  <SelectTrigger className="h-14 rounded-xl">
                    <SelectValue placeholder="Select authorized person">
                      {selectedAuditor && (
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 flex items-center justify-center rounded-full border bg-muted text-xs font-semibold">
                            {getInitials(selectedAuditor.name)}
                          </div>

                          <div className="flex flex-col text-left">
                            <span className="text-sm font-medium">
                              {selectedAuditor.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {selectedAuditor.activeAssignments} active
                              assignments
                            </span>
                          </div>
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent className="rounded-xl">
                    {auditors.map((auditor) => {
                      const isSelected = auditor.id === selectedAuditorId;

                      return (
                        <SelectItem
                          key={auditor.id}
                          value={auditor.id}
                          className="py-3 rounded-lg"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <div className="h-9 w-9 flex items-center justify-center rounded-full border bg-muted text-xs font-semibold">
                              {getInitials(auditor.name)}
                            </div>

                            <div className="flex flex-col flex-1">
                              <span className="text-sm font-medium">
                                {auditor.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {auditor.activeAssignments} active assignments
                              </span>
                            </div>

                            {isSelected && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* CLIENT CARD */}
              <div className="rounded-xl border p-4 bg-muted/30">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Current Client
                </p>

                <p className="mt-1 text-sm font-semibold">{client.name}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {client.isoStandards.map((iso) => (
                    <Badge key={iso} variant="secondary">
                      {iso}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <DialogFooter className="px-6 py-5 border-t flex justify-center gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="min-w-[120px] rounded-full"
              >
                Cancel
              </Button>

              <Button
                disabled={!selectedAuditorId}
                onClick={handleSave}
                className="min-w-[160px] rounded-full"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </TabsContent>

          {/* ================= HISTORY TAB ================= */}
          <TabsContent value="history" className="m-0">
            <div className="px-6 py-6 max-h-[350px] overflow-y-auto">
              <div className="space-y-5">
                {defaultHistory.map((item, i) => {
                  const isLast = i === defaultHistory.length - 1;

                  return (
                    <div key={i} className="relative flex gap-4">
                      {!isLast && (
                        <div className="absolute left-4 top-8 h-full w-px bg-border" />
                      )}

                      <div className="h-8 w-8 flex items-center justify-center rounded-full border bg-background">
                        {item.type === "Assigned" ? (
                          <UserCheck className="h-4 w-4 text-green-600" />
                        ) : item.type === "Reassigned" ? (
                          <Clock className="h-4 w-4 text-blue-600" />
                        ) : (
                          <UserMinus className="h-4 w-4 text-red-600" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{item.person}</p>
                          <Badge variant="secondary">{item.type}</Badge>
                        </div>

                        <div className="mt-1 text-xs text-muted-foreground flex gap-4">
                          <span className="flex items-center gap-1">
                            <History className="h-3 w-3" />
                            {item.date}
                          </span>

                          <span className="flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" />
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <DialogFooter className="px-6 py-5 border-t flex justify-center">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="rounded-full min-w-[120px]"
              >
                Close
              </Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
