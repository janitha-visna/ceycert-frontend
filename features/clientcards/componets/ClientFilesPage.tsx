"use client";

import { useState, useMemo } from "react";
import { MOCK_CLIENTS } from "../data/mockClients";
import { ClientFilesHeader } from "./ClientFilesHeader";
import { ClientFilesFilters } from "./ClientFilesFilters";
import { ClientFileCard } from "./ClientFileCard";
import { EmptyState } from "../componets/EmptyState";
import { AssignedFilesStatusDialog } from "./AssignedFilesStatusDialog";
import { Scheme, ClientStatus, StatusSummary } from "../types/client";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientFilesPage() {
  // State for filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ClientStatus | "all">(
    "all",
  );

  // State for Dialog
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  // Filter Logic
  const filteredClients = useMemo(() => {
    return MOCK_CLIENTS.filter((client) => {
      const matchesSearch =
        client.organizationName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        client.uniqueFolderName
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        client.scheme.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesScheme =
        selectedScheme === "all" || client.scheme === selectedScheme;
      const matchesStatus =
        selectedStatus === "all" || client.status === selectedStatus;

      return matchesSearch && matchesScheme && matchesStatus;
    });
  }, [searchQuery, selectedScheme, selectedStatus]);

  // Status Summary Calculation
  const statusSummary = useMemo((): StatusSummary => {
    const summary: StatusSummary = {
      total: MOCK_CLIENTS.length,
      active: MOCK_CLIENTS.filter((c) => c.status === "Active").length,
      inactive: MOCK_CLIENTS.filter((c) => c.status === "Inactive").length,
      byScheme: {} as Record<Scheme, number>,
    };

    MOCK_CLIENTS.forEach((client) => {
      summary.byScheme[client.scheme] =
        (summary.byScheme[client.scheme] || 0) + 1;
    });

    return summary;
  }, []);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedScheme("all");
    setSelectedStatus("all");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header Section */}
      <ClientFilesHeader onShowStatus={() => setIsStatusDialogOpen(true)} />

      {/* Filters Section */}
      <ClientFilesFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedScheme={selectedScheme}
        setSelectedScheme={setSelectedScheme}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onReset={handleResetFilters}
      />

      <main className="flex-1 p-8">
        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Currently displaying{" "}
            <span className="text-slate-900">{filteredClients.length}</span>{" "}
            assigned files
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredClients.map((client) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <ClientFileCard client={client} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredClients.length === 0 && (
          <EmptyState onClearFilters={handleResetFilters} />
        )}
      </main>

      {/* Summary Dialog */}
      <AssignedFilesStatusDialog
        isOpen={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        summary={statusSummary}
      />
    </div>
  );
}
