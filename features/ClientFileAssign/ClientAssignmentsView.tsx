"use client";

import { useState } from "react";
import { ClientAssignmentHeader } from "./components/ClientAssignmentHeader";
import { SummaryCards } from "./components/SummaryCards";
import { IsoCategoryCards } from "./components/IsoCategoryCards";
import { AssignmentFilters } from "./components/AssignmentFilters";
import { AssignmentTable } from "./components/AssignmentTable";
import { ViewFilesDialog } from "./components/ViewFilesDialog";//

import { ReassignUserDialog } from "./components/ReassignUserDialog";
import { RemoveUserDialog } from "./components/RemoveUserDialog";

import { useClientAssignments } from "./hooks/useClientAssignments";
import {
  calculateIsoCategories,
  calculateSummary,
} from "./utils/assignmentHelpers";
import { clientFiles } from "./data/mockClientAssignments";
import { ClientAssignment } from "./types/clientAssignment.types";

export function ClientAssignmentsView() {
  const {
    clients,
    summary,
    searchQuery,
    setSearchQuery,
    filterStandard,
    setFilterStandard,
    filterStatus,
    setFilterStatus,
    reassignUser,
    removeUser,
    allAuditors,
  } = useClientAssignments();

  // State for dialogs
  const [selectedClient, setSelectedClient] = useState<ClientAssignment | null>(
    null,
  );
  const [isViewFilesOpen, setIsViewFilesOpen] = useState(false);
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const [isRemoveUserOpen, setIsRemoveUserOpen] = useState(false);

  // Derived data
  const isoCategories = calculateIsoCategories(clients);
  const summaryCards = calculateSummary(clients, summary.auditorsCount);

  // Handlers
  const handleViewFiles = (client: ClientAssignment) => {
    setSelectedClient(client);
    setIsViewFilesOpen(true);
  };

  const handleReassignClick = (client: ClientAssignment) => {
    setSelectedClient(client);
    setIsReassignOpen(true);
  };

  const handleRemoveUserClick = (client: ClientAssignment) => {
    setSelectedClient(client);
    setIsRemoveUserOpen(true);
  };

  const handleConfirmReassign = (
    clientId: string,
    auditorId: string,
    note: string,
  ) => {
    reassignUser(clientId, auditorId, note);
    setIsReassignOpen(false);
    setSelectedClient(null);
  };

  const handleConfirmRemove = (clientId: string) => {
    removeUser(clientId);
    setIsRemoveUserOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="min-h-screen bg-slate-50/10 dark:bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-8 pb-12">
        <ClientAssignmentHeader />

        <SummaryCards cards={summaryCards} />

        <IsoCategoryCards categories={isoCategories} />

        <div className="space-y-0 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-950 shadow-sm">
          <AssignmentFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filterStandard={filterStandard}
            onStandardChange={setFilterStandard}
            filterStatus={filterStatus}
            onStatusChange={setFilterStatus}
          />

          <div className="p-0">
            <AssignmentTable
              clients={clients}
              onViewFiles={handleViewFiles}
              onReassign={handleReassignClick}
              onRemoveUser={handleRemoveUserClick}
            />
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ViewFilesDialog
        client={selectedClient}
        files={selectedClient ? clientFiles[selectedClient.id] || [] : []}
        isOpen={isViewFilesOpen}
        onOpenChange={setIsViewFilesOpen}
      />

      <ReassignUserDialog
        client={selectedClient}
        auditors={allAuditors}
        isOpen={isReassignOpen}
        onOpenChange={setIsReassignOpen}
        onConfirm={handleConfirmReassign}
      />

      <RemoveUserDialog
        client={selectedClient}
        isOpen={isRemoveUserOpen}
        onOpenChange={setIsRemoveUserOpen}
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
}
