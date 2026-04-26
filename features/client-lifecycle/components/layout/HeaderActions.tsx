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
  const buttonClass =
    "h-10 rounded-xl px-4 text-base font-medium tracking-tight shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800";

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline" onClick={onOpenHistory} className={buttonClass}>
        <Info className="mr-2 h-4 w-4" />
        Assignment History
      </Button>

      <Button
        variant="outline"
        onClick={onOpenReminders}
        className={`relative ${buttonClass} ${
          overdueCount > 0
            ? "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900/70 dark:text-red-400 dark:hover:bg-red-950/30"
            : ""
        }`}
      >
        {overdueCount > 0 ? (
          <AlertTriangle className="mr-2 h-4 w-4" />
        ) : (
          <Bell className="mr-2 h-4 w-4" />
        )}
        Notifications
        {overdueCount > 0 && (
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-950" />
        )}
      </Button>

      <div className="hidden h-7 w-px bg-slate-200 dark:bg-slate-800 sm:block" />

      <Button
        variant="outline"
        onClick={onOpenPayments}
        className={buttonClass}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Payments
      </Button>

      <Button
        variant="outline"
        onClick={onOpenClientInfo}
        className={buttonClass}
      >
        <Phone className="mr-2 h-4 w-4" />
        Client Info
      </Button>

      <Button
        variant="outline"
        onClick={onOpenAuditDates}
        className={buttonClass}
      >
        <CalendarDays className="mr-2 h-4 w-4" />
        Audit Dates
      </Button>
    </div>
  );
};
