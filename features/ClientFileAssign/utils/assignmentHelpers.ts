import {
  ClientAssignment,
  ISOStandard,
  IsoCategory,
} from "../types/clientAssignment.types";

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function calculateSummary(
  clients: ClientAssignment[],
  auditorsCount: number,
) {
  const assigned = clients.filter(
    (client) => client.status === "Assigned",
  ).length;
  const unassigned = clients.filter(
    (client) => client.status === "Unassigned",
  ).length;

  return [
    {
      title: "Total Clients",
      value: String(clients.length),
      icon: "Users",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Assigned",
      value: String(assigned),
      icon: "ShieldCheck",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Unassigned",
      value: String(unassigned),
      icon: "FolderOpen",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      title: "Authorized Persons",
      value: String(auditorsCount),
      icon: "UserPlus",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];
}

export function calculateIsoCategories(
  clients: ClientAssignment[],
): IsoCategory[] {
  const standards: ISOStandard[] = [
    "ISO 9001",
    "ISO 14001",
    "ISO 22000",
    "ISO 27001",
    "ISO 45001",
  ];

  const styles: Record<ISOStandard, { color: string; bar: string }> = {
    "ISO 9001": { color: "text-blue-600", bar: "bg-blue-500" },
    "ISO 14001": { color: "text-emerald-600", bar: "bg-emerald-500" },
    "ISO 22000": { color: "text-orange-600", bar: "bg-orange-500" },
    "ISO 27001": { color: "text-indigo-600", bar: "bg-indigo-500" },
    "ISO 45001": { color: "text-red-600", bar: "bg-red-500" },
  };

  return standards.map((standard) => {
    const relatedClients = clients.filter((client) =>
      client.isoStandards.includes(standard),
    );

    const assigned = relatedClients.filter(
      (client) => client.status === "Assigned",
    ).length;

    return {
      name: standard,
      clients: relatedClients.length,
      assigned,
      total: relatedClients.length,
      color: styles[standard].color,
      bar: styles[standard].bar,
    };
  });
}
