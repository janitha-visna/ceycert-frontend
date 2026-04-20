"use client";

import * as React from "react";
import { Plus, Moon, X } from "lucide-react";
import { initialTemplates } from "@/features/folder-template-designer/mock-data/templates";
import { TemplateCard } from "@/features/folder-template-designer/components/TemplateCard";
import { Button } from "@/components/ui/button";
import { CreateTemplateModal } from "@/features/folder-template-designer/components/CreateTemplateModal";

export default function DummyTemplateUI() {
  const [templates, setTemplates] = React.useState(initialTemplates);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState("");

  const handleOpenCreate = () => {
    setTemplateName("");
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
    setTemplateName("");
  };

  const handleCreateTemplate = () => {
    const trimmedName = templateName.trim();

    if (!trimmedName) return;

    const nextNumber = templates.length + 1;
    const templateId = `template${nextNumber}`;

    const newTemplate = {
      id: templateId,
      name: trimmedName,
      nodes: [
        {
          id: templateId,
          name: trimmedName,
          type: "template" as const,
          parentId: null,
        },
      ],
    };

    setTemplates((prev) => [...prev, newTemplate]);
    handleCloseCreate();
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

                <Button className="gap-2" onClick={handleOpenCreate}>
                  <Plus className="h-4 w-4" />
                  New Template
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {templates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          </section>
        </div>
      </div>

      <CreateTemplateModal
        open={isCreateOpen}
        templateName={templateName}
        onTemplateNameChange={setTemplateName}
        onClose={handleCloseCreate}
        onSave={handleCreateTemplate}
      />
    </>
  );
}
