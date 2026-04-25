import React, { useState } from "react";
import { Modal } from "../Modal";
import { Reminder } from "../../types";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Filter,
} from "lucide-react";

interface ReminderListModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminders: Reminder[];
}

type FilterType = "All" | "Overdue" | "Pending" | "Completed";

export const ReminderListModal: React.FC<ReminderListModalProps> = ({
  isOpen,
  onClose,
  reminders,
}) => {
  const [filter, setFilter] = useState<FilterType>("All");

  // Filter reminders based on selection
  const filteredReminders = reminders.filter((r) => {
    if (filter === "All") return true;
    return r.status === filter;
  });

  const overdue = filteredReminders.filter((r) => r.status === "Overdue");
  const pending = filteredReminders.filter((r) => r.status === "Pending");
  const completed = filteredReminders.filter((r) => r.status === "Completed");

  const renderSection = (
    title: string,
    items: Reminder[],
    type: "overdue" | "pending" | "completed"
  ) => {
    if (items.length === 0) return null;

    let headerColor = "";
    let icon = null;

    switch (type) {
      case "overdue":
        headerColor = "text-red-700 bg-red-50 border-red-200";
        icon = <AlertCircle className="w-5 h-5 mr-2" />;
        break;
      case "pending":
        headerColor = "text-yellow-700 bg-yellow-50 border-yellow-200";
        icon = <Clock className="w-5 h-5 mr-2" />;
        break;
      case "completed":
        headerColor = "text-green-700 bg-green-50 border-green-200";
        icon = <CheckCircle2 className="w-5 h-5 mr-2" />;
        break;
    }

    return (
      <div className="mb-6 last:mb-0 animate-fadeIn">
        <h3
          className={`flex items-center px-4 py-2 rounded-t-lg border-t border-x font-semibold ${headerColor}`}
        >
          {icon} {title} ({items.length})
        </h3>
        <div className="border border-slate-200 rounded-b-lg divide-y divide-slate-100 bg-white">
          {items.map((reminder) => (
            <div
              key={reminder.id}
              className="p-4 hover:bg-slate-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {reminder.folderName}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1">
                    {reminder.message}
                  </p>
                </div>
                <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {reminder.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reminders & Warnings"
      widthClassName="sm:w-[720px]"
    >
      <div className="flex max-h-[calc(90vh-73px)] flex-col">
        <div className="border-b px-6 py-4">
          <div className="flex items-center space-x-1 rounded-lg bg-slate-100 p-1">
            {(["All", "Overdue", "Pending", "Completed"] as FilterType[]).map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                    filter === f
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:bg-slate-200/50 hover:text-slate-700"
                  }`}
                >
                  {f}
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {filteredReminders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
              <Filter className="mb-3 h-10 w-10 text-slate-300" />
              <p>No items found for this filter.</p>
            </div>
          ) : (
            <>
              {renderSection("Overdue Items", overdue, "overdue")}
              {renderSection("Pending Tasks", pending, "pending")}
              {renderSection("Completed", completed, "completed")}
            </>
          )}
        </div>

        <div className="flex justify-end border-t bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
