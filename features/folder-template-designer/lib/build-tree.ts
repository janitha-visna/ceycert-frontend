import { TreeNode,TemplateNode } from "../types/folder-tree";


export function buildTree(nodes: TemplateNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
 
  const roots: TreeNode[] = [];

  for (const node of nodes) {
    map.set(node.id, { ...node, children: [] });
  }
  console.log("MAP AFTER INIT:", Object.fromEntries(map));

  for (const node of nodes) {
    const current = map.get(node.id);

    if (!current) continue;

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
