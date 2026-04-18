"use client";

import React from "react";
import { TreeNode } from "../types/folder-tree.types";

interface FolderTreeProps {
  nodes: TreeNode[];
  expanded: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export function FolderTree({ nodes, expanded, onToggle }: FolderTreeProps) {
  return (
    <div className="space-y-1">
      {nodes.map((node) => {
        const hasChildren = node.children.length > 0;
        const isOpen = expanded[node.id];

        return (
          <div key={node.id}>
            <div className="flex items-center gap-2">
              {hasChildren && (
                <button onClick={() => onToggle(node.id)}>
                  {isOpen ? "-" : "+"}
                </button>
              )}
              <span>{node.name}</span>
              <span className="text-gray-500 text-sm">({node.id})</span>
            </div>

            {hasChildren && isOpen && (
              <div className="ml-6 mt-1">
                <FolderTree
                  nodes={node.children}
                  expanded={expanded}
                  onToggle={onToggle}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
