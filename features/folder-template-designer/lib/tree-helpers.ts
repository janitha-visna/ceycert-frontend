import {
  NodeType,
  TemplateNode,
} from "@/features/folder-template-designer/types/folder-tree";

export function getAllChildTypes(): NodeType[] {
  return ["cycle", "stage", "folder"];
}

/**
 * Collects the ID of a node and all its descendant nodes recursively.
 *
 * 📌 Purpose:
 * This function is used to retrieve a node and all of its nested children
 * in a hierarchical structure (tree). It is mainly used for operations
 * like deleting a node along with all its children.
 *
 * 🧠 How it works:
 * - Starts from the given node ID
 * - Finds all direct children
 * - Recursively traverses each child
 * - Returns a flat list of all IDs
 *
 * 📥 Parameters:
 * @param nodes - Array of all template nodes
 * @param nodeId - The ID of the node to start from
 *
 * 📤 Returns:
 * @returns string[] - Array of IDs including the parent and all descendants
 *
 * 🧪 Example:
 * Given structure:
 * template1
 *  └── cycle1
 *       └── stage1
 *            ├── folder1
 *            └── folder2
 *
 * collectDescendantIds(nodes, "cycle1")
 * ➜ ["cycle1", "cycle1.stage1", "cycle1.stage1.folder1", "cycle1.stage1.folder2"]
 *
 * ⚠️ Notes:
 * - Assumes the node structure is a valid tree (no circular references)
 * - Performance depends on tree size (recursive traversal)
 */

export function collectDescendantIds(
  nodes: TemplateNode[],
  nodeId: string
): string[] {
  const ids: string[] = [nodeId];
  const children = nodes.filter((node) => node.parentId === nodeId);

  for (const child of children) {
    ids.push(...collectDescendantIds(nodes, child.id));
  }

  return ids;
}
