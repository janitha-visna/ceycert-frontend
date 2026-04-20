"use client";

import * as React from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { initialTemplates } from "@/features/folder-template-designer/mock-data/templates";
import { FolderTree } from "@/features/folder-template-designer/components/FolderTree";
import {
  TemplateNode,
  TreeNode,
} from "@/features/folder-template-designer/types/folder-tree";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function buildTree(nodes: TemplateNode[]): TreeNode[] {
  const nodeMap = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const node of nodes) {
    nodeMap.set(node.id, {
      ...node,
      children: [],
    });
  }

  for (const node of nodes) {
    const treeNode = nodeMap.get(node.id)!;

    if (node.parentId === null) {
      roots.push(treeNode);
    } else {
      const parentNode = nodeMap.get(node.parentId);
      if (parentNode) {
        parentNode.children.push(treeNode);
      }
    }
  }

  return roots;
}

export default function TemplateDetailPage() {
  const params = useParams();
  const templateId = params.templateId as string;

  const template = initialTemplates.find((item) => item.id === templateId);

  if (!template) {
    notFound();
  }

  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const treeNodes = React.useMemo(
    () => buildTree(template.nodes),
    [template.nodes]
  );

  const handleToggle = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpenAdd = (parentId: string) => {
    console.log("Open add child for:", parentId);
  };

  const handleDelete = (nodeId: string) => {
    console.log("Delete node:", nodeId);
  };

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
