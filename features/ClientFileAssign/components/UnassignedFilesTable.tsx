import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, PlusCircle, Calendar } from "lucide-react";
import { UnassignedFile } from "../types/clientAssignment.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UnassignedFilesTableProps {
  files: UnassignedFile[];
  onAssign: (file: UnassignedFile) => void;
}

export function UnassignedFilesTable({
  files,
  onAssign,
}: UnassignedFilesTableProps) {
  return (
    <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-hidden h-full">
      <CardHeader className="bg-slate-50/50 dark:bg-slate-900/50 p-4 border-b border-slate-100 dark:border-slate-900">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <span className="p-1 px-1.5 bg-orange-100 dark:bg-orange-950/40 rounded flex items-center justify-center">
              <FileText className="h-4 w-4 text-orange-600" />
            </span>
            Unassigned Client Files
          </CardTitle>
          <span className="text-[10px] bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 px-2.5 py-1 rounded-full font-black tracking-tighter">
            {files.length} PENDING
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[300px]">
          {files.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              All client files have been assigned.
            </div>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-900">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors group"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-50">
                      {file.name}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                      <span>{file.clientName}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <span>{file.uploadedDate}</span>
                    </div>
                  </div>
                  <button
                    className="text-blue-600 dark:text-blue-400 text-[11px] font-bold hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onAssign(file)}
                  >
                    Assign Auditor
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
