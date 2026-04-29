export type NodeType = "template" | "cycle" | "stage" | "folder";

export interface SchedulingRule {
  variableId: string;
  offsetValue: number;
  offsetUnit: "days" | "months";
  type: "before" | "after";
}

export interface TemplateNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
  schedulingRule: SchedulingRule | null;
}

export interface TreeNode extends TemplateNode {
  children: TreeNode[];
}

export interface TemplateDocument {
  id: string;
  name: string;
  nodes: TemplateNode[];
  status?: "active" | "archived";
  createdAt?: string;
  updatedAt?: string;
}
