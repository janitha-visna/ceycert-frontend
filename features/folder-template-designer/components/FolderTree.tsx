"use client";

import React from "react";
import {
  ChevronRight,
  ChevronDown,
  FolderPlus,
  Trash2,
  Folder,
  Layers3,
  FileStack,
  LayoutTemplate,
} from "lucide-react";
import { TreeNode } from "../types/folder-tree";

interface FolderTreeProps {
  nodes: TreeNode[];
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
  onOpenAdd: (parentId: string) => void;
  onDelete: (nodeId: string) => void;
}

function getNodeIcon(type: TreeNode["type"]) {
  switch (type) {
    case "template":
      return <LayoutTemplate className="h-4 w-4 text-violet-600" />;
    case "cycle":
      return <Layers3 className="h-4 w-4 text-blue-600" />;
    case "stage":
      return <FileStack className="h-4 w-4 text-emerald-600" />;
    case "folder":
      return <Folder className="h-4 w-4 text-amber-600" />;
    default:
      return <Folder className="h-4 w-4 text-muted-foreground" />;
  }
}

function getTypeBadgeClass(type: TreeNode["type"]) {
  switch (type) {
    case "template":
      return "bg-violet-100 text-violet-700 border-violet-200";
    case "cycle":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "stage":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "folder":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

export function FolderTree({
  nodes,
  expanded,
  onToggle,
  onOpenAdd,
  onDelete,
}: FolderTreeProps) {
  return (
    <div className="space-y-3">
      {nodes.map((node) => {
        const hasChildren = node.children.length > 0;
        const isOpen = !!expanded[node.id];
        const canAddChild = true;
        const canDelete = true;

        return (
          <div
            key={node.id}
            className="rounded-2xl border bg-white/90 shadow-sm transition-all hover:shadow-md dark:bg-neutral-900"
          >
            <div className="flex items-start justify-between gap-4 p-4">
              <div className="flex min-w-0 items-start gap-3">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => onToggle(node.id)}
                    className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border bg-background text-muted-foreground transition hover:bg-muted"
                  >
                    {isOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-muted/40">
                    {getNodeIcon(node.type)}
                  </div>
                )}

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {!hasChildren && getNodeIcon(node.type)}
                    <p className="truncate text-sm font-semibold text-foreground">
                      {node.name}
                    </p>
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize ${getTypeBadgeClass(
                        node.type
                      )}`}
                    >
                      {node.type}
                    </span>
                  </div>

                  <p className="break-all text-xs text-muted-foreground">
                    ID: {node.id}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap items-center gap-2">
                {canAddChild && (
                  <button
                    type="button"
                    onClick={() => onOpenAdd(node.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
                  >
                    <FolderPlus className="h-4 w-4" />
                    Add Child
                  </button>
                )}

                {canDelete && (
                  <button
                    type="button"
                    onClick={() => onDelete(node.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                )}
              </div>
            </div>

            {hasChildren && isOpen && (
              <div className="px-4 pb-4">
                <div className="ml-4 border-l-2 border-dashed border-muted pl-4">
                  <FolderTree
                    nodes={node.children}
                    expanded={expanded}
                    onToggle={onToggle}
                    onOpenAdd={onOpenAdd}
                    onDelete={onDelete}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
