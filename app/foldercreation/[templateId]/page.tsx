"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { initialTemplates } from "@/features/folder-template-designer/mock-data/templates";
import { FolderTree } from "@/features/folder-template-designer/components/FolderTree";
import { AddChildNodeForm } from "@/features/folder-template-designer/components/AddChildNodeForm";

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

  const [templates, setTemplates] =
    React.useState<TemplateDocument[]>(initialTemplates);

  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    [templateId]: true,
  });

  const [addForm, setAddForm] = React.useState<{
    parentId: string;
    type: NodeType;
    name: string;
  } | null>(null);

  const template = templates.find((item) => item.id === templateId);

  if (!template) {
    notFound();
  }

  const treeNodes = React.useMemo(() => {
    return buildTree(template.nodes);
  }, [template.nodes]);

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

  const handleSaveChild = () => {
    if (!template || !addForm) return;

    const trimmedName = addForm.name.trim();
    if (!trimmedName) return;

    const newId = generateNextId(
      template.nodes,
      addForm.parentId,
      addForm.type
    );

    const newNode: TemplateNode = {
      id: newId,
      name: trimmedName,
      type: addForm.type,
      parentId: addForm.parentId,
    };

    setTemplates((prev) =>
      prev.map((item) =>
        item.id === template.id
          ? {
              ...item,
              nodes: [...item.nodes, newNode],
            }
          : item
      )
    );

    setExpanded((prev) => ({
      ...prev,
      [addForm.parentId]: true,
    }));

    setAddForm(null);
  };

  const handleDelete = (nodeId: string) => {
    if (!template) return;

    const idsToDelete = collectDescendantIds(template.nodes, nodeId);
    const idSet = new Set(idsToDelete);

    setTemplates((prev) =>
      prev.map((item) =>
        item.id === template.id
          ? {
              ...item,
              nodes: item.nodes.filter((node) => !idSet.has(node.id)),
            }
          : item
      )
    );

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

  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/foldercreation">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Templates
            </Link>
          </Button>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{template.name}</h1>
          <p className="text-muted-foreground">Template ID: {template.id}</p>
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
