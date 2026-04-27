import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";


import { AuthorizedPerson } from "../types/clientAssignment.types";

import { getInitials } from "../utils/assignmentHelpers";

interface AuthorizedPersonSelectProps {
  auditors: AuthorizedPerson[];
  selectedAuditorId: string;
  onSelect: (auditorId: string) => void;
}

export function AuthorizedPersonSelect({
  auditors,
  selectedAuditorId,
  onSelect,
}: AuthorizedPersonSelectProps) {
  const selectedAuditor = auditors.find(
    (auditor) => auditor.id === selectedAuditorId,
  );

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase text-muted-foreground">
        Authorized Person
      </p>

      <Select value={selectedAuditorId} onValueChange={onSelect}>
        <SelectTrigger className="h-14 rounded-xl">
          <SelectValue placeholder="Select authorized person">
            {selectedAuditor && (
              <div className="flex min-w-0 items-center gap-3">
                <AvatarText name={selectedAuditor.name} />

                <div className="min-w-0 text-left">
                  <p className="truncate text-sm font-medium">
                    {selectedAuditor.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {selectedAuditor.activeAssignments} active assignments
                  </p>
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
                className="rounded-lg py-3"
              >
                <div className="flex w-full items-center gap-3">
                  <AvatarText name={auditor.name} />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {auditor.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {auditor.activeAssignments} active assignments
                    </p>
                  </div>

                  {isSelected && <Check className="h-4 w-4 text-primary" />}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

function AvatarText({ name }: { name: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-muted text-xs font-semibold">
      {getInitials(name)}
    </div>
  );
}
