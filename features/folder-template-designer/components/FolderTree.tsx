"use client";

import React from "react";
import { TreeNode } from "../types/folder-tree";

interface FolderTreeProps {
  nodes: TreeNode[];
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onOpenAdd: (parentId: string) => void;
  onDelete: (nodeId: string) => void;
}

export function FolderTree({
  nodes,
  expanded,
  onToggle,
  onOpenAdd,
  onDelete,
}: FolderTreeProps) {
  return (
    <div className="space-y-2">
      {nodes.map((node) => {
        const hasChildren = node.children.length > 0;
        const isOpen = !!expanded[node.id];
        const canAddChild = true;
        const canDelete = true;

        return (
          <div key={node.id} className="rounded border p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => onToggle(node.id)}
                    className="h-7 w-7 rounded border"
                  >
                    {isOpen ? "-" : "+"}
                  </button>
                ) : (
                  <span className="inline-block w-7" />
                )}

                <div>
                  <div className="font-medium">{node.name}</div>
                  <div className="text-xs text-gray-500">
                    {node.type} | {node.id}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {canAddChild && (
                  <button
                    type="button"
                    onClick={() => onOpenAdd(node.id)}
                    className="rounded border px-2 py-1 text-sm"
                  >
                    Add Child
                  </button>
                )}

                {canDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(node.id)}
                    className="rounded border border-red-300 px-2 py-1 text-sm text-red-600"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            {hasChildren && isOpen && (
              <div className="ml-6 mt-3 border-l pl-4">
                <FolderTree
                  nodes={node.children}
                  expanded={expanded}
                  onToggle={onToggle}
                  onOpenAdd={onOpenAdd}
                  onDelete={onDelete}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
