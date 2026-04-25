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
    <div className="flex items-center gap-3">
      {/* Assignment History */}
      <Button
        variant="outline"
        onClick={onOpenHistory}
        className="flex items-center gap-2"
      >
        <Info className="h-4 w-4" />
        Assignment History
      </Button>

      {/* Notifications */}
      <Button
        variant="outline"
        onClick={onOpenReminders}
        className={`relative flex items-center gap-2 ${
          overdueCount > 0 ? "border-red-300 text-red-600" : ""
        }`}
      >
        {overdueCount > 0 ? (
          <AlertTriangle className="h-4 w-4" />
        ) : (
          <Bell className="h-4 w-4" />
        )}
        Notifications
        {overdueCount > 0 && (
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </Button>

      {/* Divider */}
      <div className="hidden h-6 w-px bg-slate-200 sm:block" />

      {/* Other actions */}
      <Button variant="outline" onClick={onOpenPayments}>
        <CreditCard className="mr-2 h-4 w-4" />
        Payments
      </Button>

      <Button variant="outline" onClick={onOpenClientInfo}>
        <Phone className="mr-2 h-4 w-4" />
        Client Info
      </Button>

      <Button variant="outline" onClick={onOpenAuditDates}>
        <CalendarDays className="mr-2 h-4 w-4" />
        Audit Dates
      </Button>
    </div>
  );
};
