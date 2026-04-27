import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { ClientAssignment } from "../types/clientAssignment.types";
import { AssignmentActions } from "./AssignmentActions";
import { getInitials } from "../utils/assignmentHelpers";

interface AssignmentTableProps {
  clients: ClientAssignment[];
  onViewFiles: (client: ClientAssignment) => void;
  onReassign: (client: ClientAssignment) => void;
  onRemoveUser: (client: ClientAssignment) => void;
}

export function AssignmentTable({
  clients,
  onViewFiles,
  onReassign,
  onRemoveUser,
}: AssignmentTableProps) {
  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-xl bg-slate-50 dark:bg-slate-900/20">
        <div className="p-4 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
          <FileText className="h-8 w-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold">No results found</h3>
        <p className="text-muted-foreground text-center max-w-sm mt-1">
          Adjust your filters or search query to find the clients you're looking
          for.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-slate-900/50">
            <TableRow className="hover:bg-transparent border-b border-slate-100 dark:border-slate-900">
              <TableHead className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                Client Name
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                ISO Standard
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                Assigned Person
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 font-bold text-slate-700 dark:text-slate-300">
                Files
              </TableHead>
              <TableHead className="px-6 py-4 text-right font-bold text-slate-700 dark:text-slate-300">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 dark:divide-slate-900">
            {clients.map((client) => (
              <TableRow
                key={client.id}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors border-none group"
              >
                <TableCell className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-50 min-w-[200px]">
                  {client.name}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex gap-1.5 flex-wrap">
                    {client.isoStandards.map((iso) => (
                      <span
                        key={iso}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${
                          iso === "ISO 9001"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                            : iso === "ISO 27001"
                              ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400"
                              : iso === "ISO 14001"
                                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                : "bg-slate-100 text-slate-600 dark:bg-slate-800"
                        }`}
                      >
                        {iso}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  {client.assignedPerson ? (
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 rounded-full flex items-center justify-center text-[10px] font-bold border border-indigo-100 dark:border-indigo-900/50">
                        {getInitials(client.assignedPerson)}
                      </div>
                      <span className="text-sm font-medium">
                        {client.assignedPerson}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 italic">
                      Not Assigned
                    </span>
                  )}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                      client.status === "Assigned"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400"
                    }`}
                  >
                    <span
                      className={`w-1 h-1 rounded-full ${client.status === "Assigned" ? "bg-emerald-500" : "bg-amber-500"}`}
                    />
                    {client.status === "Assigned" ? "Active" : "Unassigned"}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    {client.fileCount} Files
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-right">
                  <AssignmentActions
                    client={client}
                    onViewFiles={onViewFiles}
                    onReassign={onReassign}
                    onRemoveUser={onRemoveUser}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
