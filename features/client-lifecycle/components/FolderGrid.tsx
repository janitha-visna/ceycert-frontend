import React, { useState } from "react";
import {
  Folder as FolderIcon,
  Bell,
  FileText,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";

import { Folder, Reminder } from "../types";
import { ReminderModal } from "./modals/ReminderModal";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FolderGridProps {
  folders: Folder[];
  onFolderClick: (folder: Folder) => void;
  reminders: Reminder[];
  onAddReminder: (folderName: string, date: string, message: string) => void;
  onDeleteFolder: (folderId: string) => void;
}

export const FolderGrid: React.FC<FolderGridProps> = ({
  folders,
  onFolderClick,
  reminders,
  onAddReminder,
  onDeleteFolder,
}) => {
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [activeFolderForReminder, setActiveFolderForReminder] = useState("");

  const handleReminderClick = (e: React.MouseEvent, folderName: string) => {
    e.stopPropagation();
    setActiveFolderForReminder(folderName);
    setReminderModalOpen(true);
  };

  const handleSaveReminder = (date: string, message: string) => {
    onAddReminder(activeFolderForReminder, date, message);
  };

  const getReminderForFolder = (folderName: string) => {
    return reminders.find(
      (r) => r.folderName === folderName && r.status !== "Completed"
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {folders.map((folder) => {
          const activeReminder = getReminderForFolder(folder.name);
          const isCompleted = folder.status === "completed";

          return (
            <Card
              key={folder.id}
              onClick={() => onFolderClick(folder)}
              className="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="mb-4 flex items-start justify-between">
                  <div
                    className={`rounded-lg p-3 ${
                      isCompleted
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-primary"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      <FolderIcon className="h-6 w-6" />
                    )}
                  </div>

                  <div className="flex gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFolder(folder.id);
                      }}
                      title="Delete Folder"
                      className="h-9 w-9 text-slate-400 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleReminderClick(e, folder.name)}
                      title="Set Reminder"
                      className={`h-9 w-9 ${
                        activeReminder
                          ? "bg-blue-50 text-primary ring-1 ring-blue-100"
                          : "text-slate-400 hover:bg-slate-50 hover:text-primary"
                      }`}
                    >
                      <Bell
                        className={`h-5 w-5 ${
                          activeReminder ? "fill-current" : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                <h3 className="mb-1 text-lg font-semibold text-slate-900 transition-colors group-hover:text-primary">
                  {folder.name}
                </h3>

                <div className="mb-3 flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center">
                    <FileText className="mr-1 h-4 w-4" />
                    {folder.fileCount} files
                  </span>

                  <Badge variant={isCompleted ? "default" : "secondary"}>
                    {isCompleted ? "Complete" : "Pending"}
                  </Badge>
                </div>

                {activeReminder && (
                  <div className="mt-2 flex items-center rounded-md border border-amber-100 bg-amber-50 px-2 py-1.5 text-xs text-amber-700">
                    <Clock className="mr-1.5 h-3.5 w-3.5" />
                    <span className="font-medium">
                      Due: {activeReminder.date}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ReminderModal
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        folderName={activeFolderForReminder}
        onSave={handleSaveReminder}
      />
    </>
  );
};
