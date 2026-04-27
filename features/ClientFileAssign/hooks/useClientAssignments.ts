import { useState, useMemo } from "react";
import {
  ISOStandard,
  AssignmentStatus,
} from "../types/clientAssignment.types";
import { ClientAssignment } from "../types/clientAssignment.types";
import { initialClients, auditors } from "../data/mockClientAssignments";


export function useClientAssignments() {
  const [clients, setClients] = useState<ClientAssignment[]>(initialClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStandard, setFilterStandard] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Filtered clients list
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = client.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStandard =
        filterStandard === "all" ||
        client.isoStandards.includes(filterStandard as ISOStandard);
      const matchesStatus =
        filterStatus === "all" ||
        client.status.toLowerCase() === filterStatus.toLowerCase();

      return matchesSearch && matchesStandard && matchesStatus;
    });
  }, [clients, searchQuery, filterStandard, filterStatus]);

  // Summary statistics
  const summary = useMemo(
    () => ({
      total: clients.length,
      assigned: clients.filter((c) => c.status === "Assigned").length,
      unassigned: clients.filter((c) => c.status === "Unassigned").length,
      auditorsCount: auditors.length,
    }),
    [clients],
  );

  // Actions
  const reassignUser = (clientId: string, auditorId: string, note?: string) => {
    const auditor = auditors.find((a) => a.id === auditorId);
    if (!auditor) return;

    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              assignedPerson: auditor.name,
              status: "Assigned",
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : c,
      ),
    );

    console.log(
      `Auditor ${auditor.name} assigned to client ${clientId}. Note: ${note}`,
    );
  };

  const removeUser = (clientId: string) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              assignedPerson: undefined,
              status: "Unassigned",
              fileCount: 0,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : c,
      ),
    );
  };

  return {
    clients: filteredClients,
    totalClients: clients.length,
    summary,
    searchQuery,
    setSearchQuery,
    filterStandard,
    setFilterStandard,
    filterStatus,
    setFilterStatus,
    reassignUser,
    removeUser,
    allAuditors: auditors,
  };
}
