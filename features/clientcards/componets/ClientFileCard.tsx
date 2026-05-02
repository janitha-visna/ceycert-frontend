import {
  Calendar,
  Folder,
  ShieldCheck,
  Activity,
  Info,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClientFile } from "../types/client";
import { SCHEME_COLORS } from "../constants/client";

import type { ReactNode } from "react";

interface ClientFileCardProps {
  client: ClientFile;
}

const schemeIcons: Record<string, ReactNode> = {
  FSMS: <FileText className="h-5 w-5" />,
  QMS: <ShieldCheck className="h-5 w-5" />,
  EMS: <Activity className="h-5 w-5" />,
  "OH&SMS": <Activity className="h-5 w-5" />,
  ENMS: <Activity className="h-5 w-5" />,
  EOMS: <FileText className="h-5 w-5" />,
  ISMS: <ShieldCheck className="h-5 w-5" />,
  BCMS: <Info className="h-5 w-5" />,
  PIMS: <ShieldCheck className="h-5 w-5" />,
  ITSMS: <Folder className="h-5 w-5" />,
  ESMS: <Activity className="h-5 w-5" />,
};

export function ClientFileCard({ client }: ClientFileCardProps) {
  const statusClasses =
    client.status === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-slate-100 text-slate-600 border-slate-200";

  const schemeBgClasses =
    SCHEME_COLORS[client.scheme]?.split(" ")[0] || "bg-blue-50";
  const schemeTextClasses =
    SCHEME_COLORS[client.scheme]?.split(" ")[1] || "text-blue-600";

  return (
    <Card className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${schemeBgClasses}`}>
          <div className={schemeTextClasses}>{schemeIcons[client.scheme]}</div>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusClasses}`}
        >
          {client.status}
        </span>
      </div>

      <h3
        className="font-bold text-slate-900 truncate"
        title={client.organizationName}
      >
        {client.organizationName}
      </h3>
      <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-tight">
        {client.uniqueFolderName}
      </p>

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-50">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-semibold">
            Scheme
          </p>
          <p className="text-sm font-medium text-slate-900">{client.scheme}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-slate-400 uppercase font-semibold">
            Next Audit
          </p>
          <p className="text-sm font-medium text-slate-900">
            {new Date(client.nextAuditDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </Card>
  );
}
