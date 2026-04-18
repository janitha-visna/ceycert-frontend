"use client";

import React from "react";
import { FolderTree } from "@/features/folder-template-designer/components/FolderTree";
import { initialNodes } from "@/features/folder-template-designer/mock-data/templates";
import { buildTree } from "@/features/folder-template-designer/lib/build-tree";
import { generateNextId } from "@/features/folder-template-designer/lib/generate-next-is";
import { TemplateNode } from "@/features/folder-template-designer/types/folder-tree";

export default function Page() {
  const [nodes, setNodes] = React.useState<TemplateNode[]>(initialNodes);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    template1: true,
    cycle1: true,
  });

  const treeData = React.useMemo(() => buildTree(nodes), [nodes]);

  const toggleNode = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleAddCycle = () => {
    const newId = generateNextId(nodes, "template1", "cycle");

    setNodes((prev) => [
      ...prev,
      {
        id: newId,
        name: `Cycle ${
          prev.filter((n) => n.parentId === "template1" && n.type === "cycle")
            .length + 1
        }`,
        type: "cycle",
        parentId: "template1",
      },
    ]);

    setExpanded((prev) => ({ ...prev, template1: true }));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Template Tree</h1>

      <button
        onClick={handleAddCycle}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Add Cycle
      </button>

      <FolderTree nodes={treeData} expanded={expanded} onToggle={toggleNode} />
    </div>
  );
}
