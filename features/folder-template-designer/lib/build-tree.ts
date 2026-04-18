import { TemplateNode, TreeNode } from "../types/folder-tree.types";


export function buildTree(nodes: TemplateNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const node of nodes) {
    map.set(node.id, { ...node, children: [] });
  }

  for (const node of nodes) {
    const current = map.get(node.id)!;

    if (node.parentId === null) {
      roots.push(current);
    } else {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(current);
      }
    }
  }

  return roots;
}
