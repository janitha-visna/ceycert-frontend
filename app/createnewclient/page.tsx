"use client";

import * as React from "react";
import { mockTemplates } from "@/features/folder-template-designer/mock-data/mockTemplates";
import { mockFolders } from "@/features/folder-template-designer/mock-data/mockFolders";
import {
  Client,
  FolderItem,
} from "@/features/folder-template-designer/types/client";
import { ClientPageHeader } from "@/features/folder-template-designer/components/ClientPageHeader";
import { ClientList } from "@/features/folder-template-designer/components/ClientList";
import { CreateClientDialog } from "@/features/folder-template-designer/components/CreateClientDialog";
import { SearchFolderDialog } from "@/features/folder-template-designer/components/SearchFolderDialog";
import { DeleteFolderDialog } from "@/features/folder-template-designer/components/DeleteFolderDialog";

export default function DummyClientUI() {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [folders, setFolders] = React.useState<FolderItem[]>(mockFolders);

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [clientName, setClientName] = React.useState("");
  const [selectedTemplateId, setSelectedTemplateId] = React.useState("");

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedFolder, setSelectedFolder] = React.useState<FolderItem | null>(
    null
  );
  const [deletePassword, setDeletePassword] = React.useState("");
  const [deleteError, setDeleteError] = React.useState("");

  const resetCreateForm = () => {
    setClientName("");
    setSelectedTemplateId("");
  };

  const handleOpenCreate = () => {
    resetCreateForm();
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
    resetCreateForm();
  };

  const handleCreateClient = () => {
    const trimmedName = clientName.trim();

    if (!trimmedName || !selectedTemplateId) return;

    const newClient: Client = {
      id: `client_${Date.now()}`,
      name: trimmedName,
      templateId: selectedTemplateId,
    };

    setClients((prev) => [...prev, newClient]);
    handleCloseCreate();
  };

  const handleOpenSearch = () => {
    setSearchTerm("");
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setSearchTerm("");
    setIsSearchOpen(false);
  };

  const handleOpenDelete = (folder: FolderItem) => {
    setSelectedFolder(folder);
    setDeletePassword("");
    setDeleteError("");
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setSelectedFolder(null);
    setDeletePassword("");
    setDeleteError("");
    setIsDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deletePassword !== "admin123") {
      setDeleteError("Incorrect password.");
      return;
    }

    if (!selectedFolder) return;

    setFolders((prev) =>
      prev.filter((folder) => folder.id !== selectedFolder.id)
    );
    handleCloseDelete();
  };

  return (
    <>
      <div className="min-h-screen bg-background p-6 text-foreground">
        <div className="mx-auto max-w-7xl space-y-10">
          <section className="space-y-8">
            <ClientPageHeader
              onCreate={handleOpenCreate}
              onSearchFolders={handleOpenSearch}
            />

            <ClientList
              clients={clients}
              templates={mockTemplates}
              onCreate={handleOpenCreate}
            />
          </section>
        </div>
      </div>

      <CreateClientDialog
        open={isCreateOpen}
        clientName={clientName}
        selectedTemplateId={selectedTemplateId}
        templates={mockTemplates}
        onClientNameChange={setClientName}
        onTemplateChange={setSelectedTemplateId}
        onClose={handleCloseCreate}
        onCreate={handleCreateClient}
      />

      <SearchFolderDialog
        open={isSearchOpen}
        searchTerm={searchTerm}
        folders={folders}
        onSearchChange={setSearchTerm}
        onClose={handleCloseSearch}
        onDeleteClick={handleOpenDelete}
      />

      <DeleteFolderDialog
        open={isDeleteOpen}
        folder={selectedFolder}
        password={deletePassword}
        error={deleteError}
        onPasswordChange={setDeletePassword}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
