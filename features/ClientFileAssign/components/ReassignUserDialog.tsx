import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  ClientAssignment,
  AuthorizedPerson,
} from "../types/clientAssignment.types";
import { getInitials } from "../utils/assignmentHelpers";
import { defaultHistory } from "../data/mockClientAssignments";
import {
  User,
  History,
  ShieldCheck,
  Clock,
  UserCheck,
  UserMinus,
} from "lucide-react";
import { useState, useEffect } from "react";

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
  const [selectedAuditorId, setSelectedAuditorId] = useState<string>("");
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (isOpen && client) {
      const auditor = auditors.find((a) => a.name === client.assignedPerson);
      setSelectedAuditorId(auditor?.id || "");
      setNote("");
    }
  }, [client, auditors, isOpen]);

  if (!client) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl shadow-2xl border-slate-200 dark:border-slate-800">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-bold">
            Reassign Authorized Person
          </DialogTitle>
          <DialogDescription className="font-medium">
            Assign or update the authorized person for this client.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="assign" className="w-full">
          <div className="px-6 border-b border-slate-100 dark:border-slate-800">
            <TabsList className="bg-transparent h-10 p-0 gap-6 w-full justify-start rounded-none">
              <TabsTrigger
                value="assign"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent dark:data-[state=active]:border-slate-50 px-0 h-10 font-bold text-sm tracking-tight"
              >
                Assign User
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-slate-900 data-[state=active]:bg-transparent dark:data-[state=active]:border-slate-50 px-0 h-10 font-bold text-sm tracking-tight"
              >
                Assignment History
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="assign" className="mt-0 space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Client Details
                  </p>
                  <div className="flex flex-col gap-2 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-slate-50">
                      {client.name}
                    </span>
                    <div className="flex gap-1.5 flex-wrap">
                      {client.isoStandards.map((iso) => (
                        <span
                          key={iso}
                          className="px-2 py-0.5 text-[9px] font-black uppercase bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded text-slate-500"
                        >
                          {iso}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Select Authorized Person
                  </label>
                  <Select
                    value={selectedAuditorId}
                    onValueChange={setSelectedAuditorId}
                  >
                    <SelectTrigger className="w-full h-11 border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 focus:ring-1 focus:ring-slate-400">
                      <SelectValue placeholder="Select an auditor" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-xl border-slate-200 dark:border-slate-800">
                      {auditors.map((auditor) => (
                        <SelectItem
                          key={auditor.id}
                          value={auditor.id}
                          className="cursor-pointer py-2.5 rounded-lg focus:bg-slate-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold border border-indigo-100 dark:border-indigo-900/50">
                              {getInitials(auditor.name)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-sm">
                                {auditor.name}
                              </span>
                              <span className="text-[10px] text-muted-foreground font-medium">
                                {auditor.activeAssignments} active assignments
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    Assignment Note (Optional)
                  </label>
                  <Textarea
                    placeholder="Enter any additional instructions or notes for the specialist..."
                    className="min-h-[100px] border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 resize-none focus-visible:ring-1 focus-visible:ring-slate-400 font-medium text-sm"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter className="pt-2 gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="rounded-xl border-slate-200 dark:border-slate-800 h-10 px-6 font-bold"
                >
                  Cancel
                </Button>
                <Button
                  className="rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-slate-50 dark:text-slate-900 h-10 px-6 font-bold"
                  disabled={!selectedAuditorId}
                  onClick={() => onConfirm(client.id, selectedAuditorId, note)}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className="space-y-6 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {defaultHistory.map((item, idx) => (
                  <div key={idx} className="relative flex gap-4">
                    {idx !== defaultHistory.length - 1 && (
                      <div className="absolute left-4 top-8 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800" />
                    )}
                    <div
                      className={`mt-1.5 w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${
                        item.type === "Assigned"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                          : item.type === "Reassigned"
                            ? "bg-blue-50 border-blue-200 text-blue-600"
                            : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      {item.type === "Assigned" ? (
                        <UserCheck className="h-4 w-4" />
                      ) : item.type === "Reassigned" ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        <UserMinus className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 pb-8">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-slate-50">
                          {item.person}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                            item.type === "Assigned"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.type === "Reassigned"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold">
                        <span className="flex items-center gap-1.5">
                          <History className="h-3 w-3" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="h-3 w-3" />
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button
                  className="px-6 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  onClick={() => onOpenChange(false)}
                >
                  Close View
                </button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
