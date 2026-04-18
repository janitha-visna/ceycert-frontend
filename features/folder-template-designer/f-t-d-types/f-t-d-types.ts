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
  schedulingRule?: SchedulingRule;
}

export interface TreeNode extends TemplateNode {
  children: TreeNode[];
}
