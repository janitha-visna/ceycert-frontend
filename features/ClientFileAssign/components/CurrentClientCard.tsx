import { Badge } from "@/components/ui/badge";
import { ClientAssignment } from "../types/clientAssignment.types";

interface CurrentClientCardProps {
  client: ClientAssignment;
}

export function CurrentClientCard({ client }: CurrentClientCardProps) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4">
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
  );
}
