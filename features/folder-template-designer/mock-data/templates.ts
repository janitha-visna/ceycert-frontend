import { TemplateNode } from "../f-t-d-types/f-t-d-types";

export const initialNodes: TemplateNode[] = [
  //template 1
  { id: "template1", name: "ISO 9001:2015", type: "template", parentId: null },
  { id: "cycle1", name: "Cycle 1", type: "cycle", parentId: "template1" },
  {
    id: "cycle1.stage1",
    name: "Application",
    type: "stage",
    parentId: "cycle1",
  },
  {
    id: "cycle1.stage1.folder1",
    name: "Forms",
    type: "folder",
    parentId: "cycle1.stage1",
    schedulingRule: {
      variableId: "v1",
      offsetValue: 7,
      offsetUnit: "days",
      type: "before",
    },
  },
  {
    id: "cycle1.stage1.folder2",
    name: "Documents",
    type: "folder",
    parentId: "cycle1.stage1",
    schedulingRule: {
      variableId: "v1",
      offsetValue: 2,
      offsetUnit: "days",
      type: "before",
    },
  },
  { id: "cycle1.stage2", name: "Stage 1", type: "stage", parentId: "cycle1" },
  {
    id: "cycle1.stage2.folder1",
    name: "Reports",
    type: "folder",
    parentId: "cycle1.stage2",
    schedulingRule: {
      variableId: "v1",
      offsetValue: 1,
      offsetUnit: "days",
      type: "after",
    },
  },
  {
    id: "cycle1.stage2.folder2",
    name: "Evidence",
    type: "folder",
    parentId: "cycle1.stage2",
  },

  //template 2

  { id: "template2", name: "ISO 27001:2022", type: "template", parentId: null },

  { id: "t2.cycle1", name: "Cycle 1", type: "cycle", parentId: "template2" },

  {
    id: "t2.cycle1.stage1",
    name: "Scope Definition",
    type: "stage",
    parentId: "t2.cycle1",
  },
  {
    id: "t2.cycle1.stage1.folder1",
    name: "Policies",
    type: "folder",
    parentId: "t2.cycle1.stage1",
    schedulingRule: {
      variableId: "v2",
      offsetValue: 10,
      offsetUnit: "days",
      type: "before",
    },
  },
  {
    id: "t2.cycle1.stage1.folder2",
    name: "Risk Assessment",
    type: "folder",
    parentId: "t2.cycle1.stage1",
  },

  {
    id: "t2.cycle1.stage2",
    name: "Audit",
    type: "stage",
    parentId: "t2.cycle1",
  },
  {
    id: "t2.cycle1.stage2.folder1",
    name: "Audit Reports",
    type: "folder",
    parentId: "t2.cycle1.stage2",
  },
];
