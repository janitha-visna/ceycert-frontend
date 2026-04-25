import React from "react";
import {
  CreditCard,
  Phone,
  CalendarDays,
  Bell,
  AlertTriangle,
  Info,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface HeaderActionsProps {
  overdueCount: number;
  onOpenHistory: () => void;
  onOpenReminders: () => void;
  onOpenPayments: () => void;
  onOpenClientInfo: () => void;
  onOpenAuditDates: () => void;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
  overdueCount,
  onOpenHistory,
  onOpenReminders,
  onOpenPayments,
  onOpenClientInfo,
  onOpenAuditDates,
}) => {
  return (
    <>
      <div className="mr-2 flex items-center gap-2 border-r border-slate-800 pr-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onOpenHistory}
          title="Assignment History"
          className="text-slate-400 hover:bg-slate-800 hover:text-white"
        >
          <Info className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onOpenReminders}
          title="Notifications"
          className={`relative ${
            overdueCount > 0
              ? "bg-red-900/30 text-red-400 hover:bg-red-900/50 hover:text-red-300"
              : "text-slate-400 hover:bg-slate-800 hover:text-white"
          }`}
        >
          {overdueCount > 0 ? (
            <AlertTriangle className="h-5 w-5" />
          ) : (
            <Bell className="h-5 w-5" />
          )}

          {overdueCount > 0 && (
            <span className="absolute right-1 top-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
          )}
        </Button>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onOpenPayments}
        className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
      >
        <CreditCard className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Payments</span>
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onOpenClientInfo}
        className="border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
      >
        <Phone className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Client Info</span>
      </Button>

      <Button type="button" onClick={onOpenAuditDates}>
        <CalendarDays className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Audit Dates</span>
      </Button>
    </>
  );
};
