import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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
      <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 p-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>

        <h3 className="text-lg font-semibold">No results found</h3>

        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Adjust your filters or search query to find the clients you are
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-b-2xl border-t bg-card">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="h-14 bg-muted/40 hover:bg-muted/40">
              <TableHead className="px-6 text-sm font-semibold text-foreground">
                Client Name
              </TableHead>
              <TableHead className="px-6 text-sm font-semibold text-foreground">
                ISO Standard
              </TableHead>
              <TableHead className="px-6 text-sm font-semibold text-foreground">
                Assigned Person
              </TableHead>
              <TableHead className="px-6 text-sm font-semibold text-foreground">
                Status
              </TableHead>
              <TableHead className="px-6 text-sm font-semibold text-foreground">
                Files
              </TableHead>
              <TableHead className="px-6 text-right text-sm font-semibold text-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="h-20 hover:bg-muted/30">
                <TableCell className="px-6 py-5 text-sm font-medium">
                  {client.name}
                </TableCell>

                <TableCell className="px-6 py-5">
                  <div className="flex flex-wrap gap-2">
                    {client.isoStandards.map((iso) => (
                      <Badge
                        key={iso}
                        variant="outline"
                        className="rounded-full px-3 py-1 text-xs font-medium"
                      >
                        {iso}
                      </Badge>
                    ))}
                  </div>
                </TableCell>

                <TableCell className="px-6 py-5">
                  {client.assignedPerson ? (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-xs font-semibold">
                        {getInitials(client.assignedPerson)}
                      </div>

                      <span className="text-sm font-medium">
                        {client.assignedPerson}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm italic text-muted-foreground">
                      Not Assigned
                    </span>
                  )}
                </TableCell>

                <TableCell className="px-6 py-5">
                  <Badge
                    variant={
                      client.status === "Assigned" ? "default" : "secondary"
                    }
                    className="rounded-full px-3 py-1 text-xs"
                  >
                    {client.status === "Assigned" ? "Active" : "Unassigned"}
                  </Badge>
                </TableCell>

                <TableCell className="px-6 py-5">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    {client.fileCount} Files
                  </div>
                </TableCell>

                <TableCell className="px-6 py-5 text-right">
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
