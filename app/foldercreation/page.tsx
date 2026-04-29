"use client";

import * as React from "react";
import { Moon, Plus, Trash2 } from "lucide-react";

import { TemplateCard } from "@/features/folder-template-designer/components/TemplateCard";
import { CreateTemplateModal } from "@/features/folder-template-designer/components/CreateTemplateModal";
import { Button } from "@/components/ui/button";
import { TemplateDocument } from "@/features/folder-template-designer/types/folder-tree";
import {
  createFolderTemplate,
  deleteFolderTemplate,
  getFolderTemplates,
} from "@/features/folder-template-designer/api/folder-template-api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TemplatePage() {
  const [templates, setTemplates] = React.useState<TemplateDocument[]>([]);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [templateToDelete, setTemplateToDelete] =
    React.useState<TemplateDocument | null>(null);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await getFolderTemplates();
      setTemplates(data);
    } catch (error) {
      console.error(error);
      alert("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadTemplates();
  }, []);

  const handleCreateTemplate = async () => {
    const trimmedName = templateName.trim();
    if (!trimmedName) return;

    try {
      const createdTemplate = await createFolderTemplate(trimmedName);
      setTemplates((prev) => [createdTemplate, ...prev]);
      setIsCreateOpen(false);
      setTemplateName("");
    } catch (error) {
      console.error(error);
      alert("Failed to create template");
    }
  };

  const handleConfirmDelete = async () => {
    if (!templateToDelete) return;

    try {
      setDeletingId(templateToDelete.id);

      const result = await deleteFolderTemplate(templateToDelete.id);

      if (result.action === "archived") {
        alert(result.message);
      }

      setTemplates((prev) =>
        prev.filter((item) => item.id !== templateToDelete.id),
      );

      setTemplateToDelete(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete template");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background p-6 text-foreground">
        <div className="mx-auto max-w-7xl space-y-10">
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
                <p className="text-muted-foreground">
                  Select a template to design its structure.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2 h-9 w-9 rounded-lg"
                >
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                </Button>

                <Button
                  className="gap-2"
                  onClick={() => {
                    setTemplateName("");
                    setIsCreateOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4" />
                  New Template
                </Button>
              </div>
            </div>

            {loading ? (
              <p className="text-sm text-muted-foreground">
                Loading templates...
              </p>
            ) : templates.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No templates found.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {templates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onDelete={setTemplateToDelete}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <CreateTemplateModal
        open={isCreateOpen}
        templateName={templateName}
        onTemplateNameChange={setTemplateName}
        onClose={() => {
          setIsCreateOpen(false);
          setTemplateName("");
        }}
        onSave={handleCreateTemplate}
      />

      <AlertDialog
        open={!!templateToDelete}
        onOpenChange={(open) => {
          if (!open) setTemplateToDelete(null);
        }}
      >
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <Trash2 className="h-6 w-6" />
            </div>

            <AlertDialogTitle>Delete template?</AlertDialogTitle>

            <AlertDialogDescription>
              This will delete{" "}
              <span className="font-medium text-foreground">
                {templateToDelete?.name}
              </span>
              . If this template is already used by clients, it will be archived
              instead.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!deletingId}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={!!deletingId}
              onClick={handleConfirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingId ? "Deleting..." : "Delete Template"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
