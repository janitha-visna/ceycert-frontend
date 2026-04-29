// import { TemplateDocument } from "../types/folder-tree";

// export const initialTemplates: TemplateDocument[] = [
//   {
//     id: "template1",
//     name: "ISO 9001:2015",
//     nodes: [
//       {
//         id: "template1",
//         name: "ISO 9001:2015",
//         type: "template",
//         parentId: null,
//       },

//       // -------------------
//       // Cycle 1
//       // -------------------
//       { id: "cycle1", name: "Cycle 1", type: "cycle", parentId: "template1" },

//       {
//         id: "cycle1.stage1",
//         name: "Application",
//         type: "stage",
//         parentId: "cycle1",
//       },
//       {
//         id: "cycle1.stage1.folder1",
//         name: "Forms",
//         type: "folder",
//         parentId: "cycle1.stage1",
//         schedulingRule: {
//           variableId: "v1",
//           offsetValue: 7,
//           offsetUnit: "days",
//           type: "before",
//         },
//       },
//       {
//         id: "cycle1.stage1.folder2",
//         name: "Documents",
//         type: "folder",
//         parentId: "cycle1.stage1",
//         schedulingRule: {
//           variableId: "v1",
//           offsetValue: 2,
//           offsetUnit: "days",
//           type: "before",
//         },
//       },

//       {
//         id: "cycle1.stage2",
//         name: "Stage 1",
//         type: "stage",
//         parentId: "cycle1",
//       },
//       {
//         id: "cycle1.stage2.folder1",
//         name: "Reports",
//         type: "folder",
//         parentId: "cycle1.stage2",
//       },
//       {
//         id: "cycle1.stage2.folder2",
//         name: "Evidence",
//         type: "folder",
//         parentId: "cycle1.stage2",
//       },

//       // -------------------
//       // Cycle 2 (NEW)
//       // -------------------
//       { id: "cycle2", name: "Cycle 2", type: "cycle", parentId: "template1" },

//       {
//         id: "cycle2.stage1",
//         name: "Surveillance 1",
//         type: "stage",
//         parentId: "cycle2",
//       },
//       {
//         id: "cycle2.stage1.folder1",
//         name: "Audit Plan",
//         type: "folder",
//         parentId: "cycle2.stage1",
//       },
//       {
//         id: "cycle2.stage1.folder2",
//         name: "Audit Report",
//         type: "folder",
//         parentId: "cycle2.stage1",
//       },

//       {
//         id: "cycle2.stage2",
//         name: "Surveillance 2",
//         type: "stage",
//         parentId: "cycle2",
//       },
//       {
//         id: "cycle2.stage2.folder1",
//         name: "Corrective Actions",
//         type: "folder",
//         parentId: "cycle2.stage2",
//       },
//       {
//         id: "cycle2.stage2.folder2",
//         name: "Closure Evidence",
//         type: "folder",
//         parentId: "cycle2.stage2",
//       },
//     ],
//   },
//   {
//     id: "template2",
//     name: "ISO 27001:2022",
//     nodes: [
//       {
//         id: "template2",
//         name: "ISO 27001:2022",
//         type: "template",
//         parentId: null,
//       },
//       { id: "cycle1", name: "Cycle 1", type: "cycle", parentId: "template2" },
//       {
//         id: "cycle1.stage1",
//         name: "Scope Definition",
//         type: "stage",
//         parentId: "cycle1",
//       },
//       {
//         id: "cycle1.stage1.folder1",
//         name: "Policies",
//         type: "folder",
//         parentId: "cycle1.stage1",
//       },
//       {
//         id: "cycle1.stage1.folder2",
//         name: "Risk Assessment",
//         type: "folder",
//         parentId: "cycle1.stage1",
//       },
//     ],
//   },
//   {
//     id: "template3",
//     name: "ISO 14001:2015",
//     nodes: [
//       {
//         id: "template3",
//         name: "ISO 14001:2015",
//         type: "template",
//         parentId: null,
//       },

//       { id: "cycle1", name: "Cycle 1", type: "cycle", parentId: "template3" },

//       {
//         id: "cycle1.stage1",
//         name: "Environmental Review",
//         type: "stage",
//         parentId: "cycle1",
//       },
//       {
//         id: "cycle1.stage1.folder1",
//         name: "Aspect Impact Register",
//         type: "folder",
//         parentId: "cycle1.stage1",
//       },

//       {
//         id: "cycle1.stage2",
//         name: "Compliance Evaluation",
//         type: "stage",
//         parentId: "cycle1",
//       },
//       {
//         id: "cycle1.stage2.folder1",
//         name: "Legal Register",
//         type: "folder",
//         parentId: "cycle1.stage2",
//       },

//       {
//         id: "cycle1.stage3",
//         name: "Internal Audit",
//         type: "stage",
//         parentId: "cycle1",
//       },
//       {
//         id: "cycle1.stage3.folder1",
//         name: "Audit Checklist",
//         type: "folder",
//         parentId: "cycle1.stage3",
//       },
//     ],
//   },
// ];
