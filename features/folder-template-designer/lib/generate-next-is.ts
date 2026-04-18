import { NodeType,TemplateNode } from "../types/folder-tree";

export function generateNextId(
  nodes: TemplateNode[],
  parentId: string,
  type: NodeType
): string {
  const siblings = nodes.filter(
    (node) => node.parentId === parentId && node.type === type
  );

  const nextNumber = siblings.length + 1;

  if (type === "cycle") return `cycle${nextNumber}`;
  if (type === "stage") return `${parentId}.stage${nextNumber}`;
  if (type === "folder") return `${parentId}.folder${nextNumber}`;

  return `template${nextNumber}`;
}
