import {
  Activity,
  CalendarDays,
  FileText,
  Folder,
  ShieldCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { ClientFile } from "../types/client";
import { SCHEME_COLORS } from "../constants/client";

interface ClientFileCardProps {
  client: ClientFile;
}

const schemeIcons = {
  FSMS: FileText,
  QMS: ShieldCheck,
  EMS: Activity,
  "OH&SMS": Activity,
  ENMS: Activity,
  EOMS: FileText,
  ISMS: ShieldCheck,
  BCMS: Folder,
  PIMS: ShieldCheck,
  ITSMS: Folder,
  ESMS: Activity,
};

export function ClientFileCard({ client }: ClientFileCardProps) {
  const Icon = schemeIcons[client.scheme];

  const schemeClasses =
    SCHEME_COLORS[client.scheme] ??
    "bg-slate-100 text-slate-700 border-slate-200";

  const statusVariant =
    client.status === "Active"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-slate-200 bg-slate-100 text-slate-600";

  const formattedDate = new Date(client.nextAuditDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <Card className="h-full rounded-2xl transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className={`rounded-xl border p-3 ${schemeClasses}`}>
            <Icon className="h-5 w-5" />
          </div>

          <Badge variant="outline" className={statusVariant}>
            {client.status}
          </Badge>
        </div>

        <div>
          <CardTitle
            className="line-clamp-1 text-base"
            title={client.organizationName}
          >
            {client.organizationName}
          </CardTitle>

          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            {client.uniqueFolderName}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
          <div>
            <p className="text-xs text-slate-500">Scheme</p>
            <p className="font-semibold text-slate-900">{client.scheme}</p>
          </div>

          <div>
            <p className="flex items-center gap-1 text-xs text-slate-500">
              <CalendarDays className="h-3.5 w-3.5" />
              Next Audit
            </p>
            <p className="font-semibold text-slate-900">{formattedDate}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
