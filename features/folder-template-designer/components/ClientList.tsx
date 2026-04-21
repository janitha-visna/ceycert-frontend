"use client";

import { Client, Template } from "../types/client";
import { ClientCard } from "./ClientCard";
import { EmptyClientsState } from "./EmptyClientsState";

interface ClientListProps {
  clients: Client[];
  templates: Template[];
  onCreate: () => void;
}

export function ClientList({ clients, templates, onCreate }: ClientListProps) {
  const getTemplateName = (templateId: string) => {
    return (
      templates.find((template) => template.id === templateId)?.name ||
      "Unknown Template"
    );
  };

  if (clients.length === 0) {
    return <EmptyClientsState onCreate={onCreate} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          templateName={getTemplateName(client.templateId)}
        />
      ))}
    </div>
  );
}
