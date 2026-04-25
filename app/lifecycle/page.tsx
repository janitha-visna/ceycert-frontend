"use client";

import React from "react";
import { Layout } from "@/features/client-lifecycle/components/Layout";
import { FolderGrid } from "@/features/client-lifecycle/components/FolderGrid";
import { FolderDetails } from "@/features/client-lifecycle/components/FolderDetails";
import { HeaderActions } from "@/features/client-lifecycle/components/layout/HeaderActions";
import { CycleSelector } from "@/features/client-lifecycle/components/layout/CycleSelector";
import { AppModals } from "@/features/client-lifecycle/components/layout/AppModals";
import { useModalState } from "@/features/client-lifecycle/hooks/useModalState";
import { useCertificationFlow } from "@/features/client-lifecycle/hooks/useCertificationFlow";
import { FolderPlus } from "lucide-react";

export default function LifecyclePage() {
  const { modals, openModal, closeModal } = useModalState();

  const {
    cycles,
    currentCycleId,
    currentStageId,
    currentStage,
    selectedFolder,
    setSelectedFolder,
    reminders,
    overdueCount,
    handleCycleChange,
    handleStageChange,
    handleAddReminder,
    handleCreateFolder,
    handleDeleteFolder,
  } = useCertificationFlow();

  return (
    <div className="min-h-screen bg-slate-50">
      <Layout
        cycles={cycles}
        currentCycleId={currentCycleId}
        currentStageId={currentStageId}
        onCycleChange={handleCycleChange}
        onStageChange={handleStageChange}
        cycleSelector={
          <CycleSelector
            cycles={cycles}
            currentCycleId={currentCycleId}
            onCycleChange={handleCycleChange}
          />
        }
        headerActions={
          <HeaderActions
            overdueCount={overdueCount}
            onOpenHistory={() => openModal("history")}
            onOpenReminders={() => openModal("reminderList")}
            onOpenPayments={() => openModal("payment")}
            onOpenClientInfo={() => openModal("client")}
            onOpenAuditDates={() => openModal("dates")}
          />
        }
      >
        {!selectedFolder ? (
          <div className="animate-fadeIn">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {currentStage.name}
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Select a folder to manage documents.
                </p>
              </div>

              <button
                onClick={() => openModal("createFolder")}
                className="flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
              >
                <FolderPlus className="mr-2 h-5 w-5" />
                Create New Folder
              </button>
            </div>

            <FolderGrid
              folders={currentStage.folders}
              onFolderClick={setSelectedFolder}
              reminders={reminders}
              onAddReminder={handleAddReminder}
              onDeleteFolder={handleDeleteFolder}
            />
          </div>
        ) : (
          <FolderDetails
            folder={selectedFolder}
            onBack={() => setSelectedFolder(null)}
          />
        )}
      </Layout>

      <AppModals
        modals={modals}
        closeModal={closeModal}
        reminders={reminders}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
}
