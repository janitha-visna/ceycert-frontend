import { NodeType, TemplateNode } from "../types/folder-tree";

function getNextNumber(
  nodes: TemplateNode[],
  parentId: string,
  type: NodeType
): number {
  const siblings = nodes.filter(
    (node) => node.parentId === parentId && node.type === type
  );

  if (siblings.length === 0) return 1;

  const numbers = siblings
    .map((node) => {
      const lastPart = node.id.split(".").pop() ?? "";
      const match = lastPart.match(/\d+$/);
      return match ? Number(match[0]) : 0;
    })
    .filter((num) => num > 0);

  return numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
}

export function generateNextId(
  nodes: TemplateNode[],
  parentId: string,
  type: NodeType
): string {
  const nextNumber = getNextNumber(nodes, parentId, type);

  if (type === "cycle") return `cycle${nextNumber}`;
  if (type === "stage") return `${parentId}.stage${nextNumber}`;
  if (type === "folder") return `${parentId}.folder${nextNumber}`;

  return `template${nextNumber}`;
}
