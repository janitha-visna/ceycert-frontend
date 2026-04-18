"use client";

import React from "react";
import { FolderTree } from "@/features/folder-template-designer/components/FolderTree";
import { initialTemplates } from "@/features/folder-template-designer/mock-data/templates";
import { buildTree } from "@/features/folder-template-designer/lib/build-tree";
import { generateNextId } from "@/features/folder-template-designer/lib/generate-next-is";
import {
  NodeType,
  TemplateDocument,
  TemplateNode,
} from "@/features/folder-template-designer/types/folder-tree";
import { getAllChildTypes,collectDescendantIds } from "@/features/folder-template-designer/lib/tree-helpers";
import { AddChildNodeForm } from "@/features/folder-template-designer/components/AddChildNodeForm";


export default function Page() {
  const [templates, setTemplates] =
    React.useState<TemplateDocument[]>(initialTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = React.useState<string>(
    initialTemplates[0]?.id ?? ""
  );

  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    template1: true,
    cycle1: true,
  });

  const [newTemplateName, setNewTemplateName] = React.useState("");

  const [addForm, setAddForm] = React.useState<{
    parentId: string;
    type: NodeType;
    name: string;
  } | null>(null);

  const selectedTemplate =
    templates.find((template) => template.id === selectedTemplateId) ?? null;

  const treeData = React.useMemo(() => {
    if (!selectedTemplate) return [];
    return buildTree(selectedTemplate.nodes);
  }, [selectedTemplate]);

  const toggleNode = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCreateTemplate = () => {
    const trimmedName = newTemplateName.trim();
    if (!trimmedName) return;

    const nextNumber = templates.length + 1;
    const templateId = `template${nextNumber}`;

    const newTemplate: TemplateDocument = {
      id: templateId,
      name: trimmedName,
      nodes: [
        {
          id: templateId,
          name: trimmedName,
          type: "template",
          parentId: null,
        },
      ],
    };

    setTemplates((prev) => [...prev, newTemplate]);
    setSelectedTemplateId(templateId);
    setExpanded((prev) => ({ ...prev, [templateId]: true }));
    setNewTemplateName("");
  };

  const handleOpenAdd = (parentId: string) => {
    setAddForm({
      parentId,
      type: "cycle",
      name: "",
    });
  };

  const handleSaveChild = () => {
    if (!selectedTemplate || !addForm) return;

    const trimmedName = addForm.name.trim();
    if (!trimmedName) return;

    const newId = generateNextId(
      selectedTemplate.nodes,
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
      prev.map((template) =>
        template.id === selectedTemplate.id
          ? {
              ...template,
              nodes: [...template.nodes, newNode],
            }
          : template
      )
    );

    setExpanded((prev) => ({
      ...prev,
      [addForm.parentId]: true,
    }));

    setAddForm(null);
  };

  const handleDeleteNode = (nodeId: string) => {
    if (!selectedTemplate) return;

    const idsToDelete = collectDescendantIds(selectedTemplate.nodes, nodeId);
    const idSet = new Set(idsToDelete);

    setTemplates((prev) =>
      prev.map((template) =>
        template.id === selectedTemplate.id
          ? {
              ...template,
              nodes: template.nodes.filter((node) => !idSet.has(node.id)),
            }
          : template
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

  const exportCurrentTemplate = () => {
    if (!selectedTemplate) return;
    console.log(
      "TEMPLATE JSON OBJECT:",
      JSON.stringify(selectedTemplate, null, 2)
    );
    alert("Template JSON logged in console");
  };

  const availableTypes = getAllChildTypes();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Folder Template Designer</h1>
        <p className="text-sm text-gray-500">
          Each template is kept as one JSON object in state for now
        </p>
      </div>

      <div className="rounded border p-4 space-y-3">
        <h2 className="font-semibold">Create New Template</h2>
        <div className="flex gap-2">
          <input
            value={newTemplateName}
            onChange={(e) => setNewTemplateName(e.target.value)}
            placeholder="Enter template name"
            className="flex-1 rounded border px-3 py-2"
          />
          <button
            type="button"
            onClick={handleCreateTemplate}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Add Template
          </button>
        </div>
      </div>

      <div className="rounded border p-4 space-y-3">
        <h2 className="font-semibold">Select Template</h2>
        <select
          value={selectedTemplateId}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
          className="rounded border px-3 py-2"
        >
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>

        <div>
          <button
            type="button"
            onClick={exportCurrentTemplate}
            className="rounded border px-3 py-2 text-sm"
          >
            Log Current Template JSON
          </button>
        </div>
      </div>

      {addForm && (
        <AddChildNodeForm
          addForm={addForm}
          setAddForm={setAddForm}
          selectedTemplate={selectedTemplate}
          availableTypes={availableTypes}
          onSave={handleSaveChild}
          onCancel={() => setAddForm(null)}
        />
      )}

      <div className="rounded border p-4">
        {selectedTemplate ? (
          <FolderTree
            nodes={treeData}
            expanded={expanded}
            onToggle={toggleNode}
            onOpenAdd={handleOpenAdd}
            onDelete={handleDeleteNode}
          />
        ) : (
          <div className="text-gray-500">No template selected</div>
        )}
      </div>
    </div>
  );
}
