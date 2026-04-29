"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { FolderTree } from "@/features/folder-template-designer/components/FolderTree";
import { AddChildNodeForm } from "@/features/folder-template-designer/components/AddChildNodeForm";
import { TemplateSchedulerDialog } from "@/features/folder-template-designer/components/TemplateSchedulerDialog";

import { buildTree } from "@/features/folder-template-designer/lib/build-tree";
import { generateNextId } from "@/features/folder-template-designer/lib/generate-next-is";
import {
  collectDescendantIds,
  getAllChildTypes,
} from "@/features/folder-template-designer/lib/tree-helpers";

import {
  NodeType,
  TemplateDocument,
  TemplateNode,
} from "@/features/folder-template-designer/types/folder-tree";

import {
  getFolderTemplateById,
  updateFolderTemplate,
} from "@/features/folder-template-designer/api/folder-template-api";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TemplateDetailPage() {
  const params = useParams();
  const templateId = params.templateId as string;

  const [template, setTemplate] = React.useState<TemplateDocument | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const [addForm, setAddForm] = React.useState<{
    parentId: string;
    type: NodeType;
    name: string;
  } | null>(null);

  const [isSchedulerOpen, setIsSchedulerOpen] = React.useState(false);

  const loadTemplate = async () => {
    try {
      setLoading(true);

      const data = await getFolderTemplateById(templateId);

      setTemplate(data);

      const rootNode = data.nodes.find((node) => node.parentId === null);

      setExpanded({
        [rootNode?.id ?? templateId]: true,
      });
    } catch (error) {
      console.error(error);
      notFound();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadTemplate();
  }, [templateId]);

  const treeNodes = React.useMemo(() => {
    if (!template) return [];
    return buildTree(template.nodes);
  }, [template]);

  const handleToggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenAdd = (parentId: string) => {
    setAddForm({
      parentId,
      type: "cycle",
      name: "",
    });
  };

  const saveNodesToBackend = async (updatedNodes: TemplateNode[]) => {
    if (!template) return;

    try {
      setSaving(true);

      const updatedTemplate = await updateFolderTemplate(template.id, {
        nodes: updatedNodes,
      });

      setTemplate(updatedTemplate);
    } catch (error) {
      console.error(error);
      alert("Failed to save template changes");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveChild = async () => {
    if (!template || !addForm) return;

    const trimmedName = addForm.name.trim();

    if (!trimmedName) return;

    const newId = generateNextId(
      template.nodes,
      addForm.parentId,
      addForm.type,
    );

    const newNode: TemplateNode = {
      id: newId,
      name: trimmedName,
      type: addForm.type,
      parentId: addForm.parentId,
      schedulingRule: null,
    };

    const updatedNodes = [...template.nodes, newNode];

    await saveNodesToBackend(updatedNodes);

    setExpanded((prev) => ({
      ...prev,
      [addForm.parentId]: true,
      [newNode.id]: true,
    }));

    setAddForm(null);
  };

  const handleDelete = async (nodeId: string) => {
    if (!template) return;

    const rootNode = template.nodes.find((node) => node.parentId === null);

    if (rootNode?.id === nodeId) {
      alert("Root template node cannot be deleted");
      return;
    }

    const idsToDelete = collectDescendantIds(template.nodes, nodeId);
    const idSet = new Set(idsToDelete);

    const updatedNodes = template.nodes.filter((node) => !idSet.has(node.id));

    await saveNodesToBackend(updatedNodes);

    setExpanded((prev) => {
      const updated = { ...prev };

      for (const id of idsToDelete) {
        delete updated[id];
      }

      return updated;
    });

    if (addForm && idsToDelete.includes(addForm.parentId)) {
      setAddForm(null);
    }
  };

  const availableTypes = getAllChildTypes();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 text-foreground">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm text-muted-foreground">Loading template...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/foldercreation">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
          </Button>

          <Button onClick={() => setIsSchedulerOpen(true)}>
            <CalendarDays className="mr-2 h-4 w-4" />
            Date Scheduler
          </Button>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{template.name}</h1>
          <p className="text-muted-foreground">Template ID: {template.id}</p>
          {saving && (
            <p className="text-xs text-muted-foreground">Saving changes...</p>
          )}
        </div>

        <Dialog
          open={!!addForm}
          onOpenChange={(open) => !open && setAddForm(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Child Node</DialogTitle>
            </DialogHeader>

            {addForm && (
              <AddChildNodeForm
                addForm={addForm}
                setAddForm={setAddForm}
                selectedTemplate={template}
                availableTypes={availableTypes}
                onSave={handleSaveChild}
                onCancel={() => setAddForm(null)}
              />
            )}
          </DialogContent>
        </Dialog>

        <TemplateSchedulerDialog
          isOpen={isSchedulerOpen}
          onClose={() => setIsSchedulerOpen(false)}
          template={template}
          onTemplateUpdated={setTemplate}
        />

        <Card>
          <CardHeader>
            <CardTitle>Template Tree</CardTitle>
          </CardHeader>

          <CardContent>
            <FolderTree
              nodes={treeNodes}
              expanded={expanded}
              onToggle={handleToggle}
              onOpenAdd={handleOpenAdd}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
