"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { MOCK_CLIENTS } from "../data/mockClients";
import { ClientFilesHeader } from "./ClientFilesHeader";
import { ClientFilesFilters } from "./ClientFilesFilters";
import { ClientFileCard } from "./ClientFileCard";
import { EmptyState } from "./EmptyState";
import { AssignedFilesStatusDialog } from "./AssignedFilesStatusDialog";

import { ClientStatus, Scheme, StatusSummary } from "../types/client";

export default function ClientFilesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScheme, setSelectedScheme] = useState<Scheme | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ClientStatus | "all">(
    "all",
  );
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const filteredClients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return MOCK_CLIENTS.filter((client) => {
      const matchesSearch =
        client.organizationName.toLowerCase().includes(query) ||
        client.uniqueFolderName.toLowerCase().includes(query) ||
        client.scheme.toLowerCase().includes(query);

      const matchesScheme =
        selectedScheme === "all" || client.scheme === selectedScheme;

      const matchesStatus =
        selectedStatus === "all" || client.status === selectedStatus;

      return matchesSearch && matchesScheme && matchesStatus;
    });
  }, [searchQuery, selectedScheme, selectedStatus]);

  const statusSummary = useMemo((): StatusSummary => {
    const summary: StatusSummary = {
      total: MOCK_CLIENTS.length,
      active: 0,
      inactive: 0,
      byScheme: {} as StatusSummary["byScheme"],
    };

    MOCK_CLIENTS.forEach((client) => {
      if (client.status === "Active") summary.active += 1;
      if (client.status === "Inactive") summary.inactive += 1;

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
    <div className="min-h-screen bg-slate-50">
      <ClientFilesHeader onShowStatus={() => setIsStatusDialogOpen(true)} />

      <ClientFilesFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedScheme={selectedScheme}
        setSelectedScheme={setSelectedScheme}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onReset={handleResetFilters}
      />

      <main className="px-6 py-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredClients.length}
            </span>{" "}
            assigned files
          </p>
        </div>

        {filteredClients.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredClients.map((client) => (
                <motion.div
                  key={client.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  <ClientFileCard client={client} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState onClearFilters={handleResetFilters} />
        )}
      </main>

      <AssignedFilesStatusDialog
        isOpen={isStatusDialogOpen}
        onOpenChange={setIsStatusDialogOpen}
        summary={statusSummary}
      />
    </div>
  );
}
