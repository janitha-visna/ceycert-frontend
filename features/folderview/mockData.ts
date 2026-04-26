export type ItemType =
  | "folder"
  | "pdf"
  | "spreadsheet"
  | "document"
  | "image"
  | "video"
  | "archive"
  | "unknown";

export interface FileItem {
  id: string;
  name: string;
  type: ItemType;
  lastModified: string;
  size?: string;
  parentId: string | null;
  isDeleted: boolean;
}

export const initialData: FileItem[] = [
  // Root level ISO folders
  {
    id: "iso9001",
    name: "ISO 9001:2015",
    type: "folder",
    lastModified: "2026-04-20T09:00:00Z",
    parentId: null,
    isDeleted: false,
  },
  {
    id: "iso27001",
    name: "ISO/IEC 27001:2022",
    type: "folder",
    lastModified: "2026-04-20T09:10:00Z",
    parentId: null,
    isDeleted: false,
  },
  {
    id: "iso14001",
    name: "ISO 14001:2015",
    type: "folder",
    lastModified: "2026-04-20T09:20:00Z",
    parentId: null,
    isDeleted: false,
  },
  {
    id: "iso45001",
    name: "ISO 45001:2018",
    type: "folder",
    lastModified: "2026-04-20T09:30:00Z",
    parentId: null,
    isDeleted: false,
  },

  // ISO 9001 cycles
  {
    id: "iso9001-cycle1",
    name: "Cycle 1",
    type: "folder",
    lastModified: "2026-04-20T10:00:00Z",
    parentId: "iso9001",
    isDeleted: false,
  },
  {
    id: "iso9001-cycle2",
    name: "Cycle 2",
    type: "folder",
    lastModified: "2026-04-20T10:05:00Z",
    parentId: "iso9001",
    isDeleted: false,
  },
  {
    id: "iso9001-cycle3",
    name: "Cycle 3",
    type: "folder",
    lastModified: "2026-04-20T10:10:00Z",
    parentId: "iso9001",
    isDeleted: false,
  },

  // ISO 27001 cycles
  {
    id: "iso27001-cycle1",
    name: "Cycle 1",
    type: "folder",
    lastModified: "2026-04-20T10:15:00Z",
    parentId: "iso27001",
    isDeleted: false,
  },
  {
    id: "iso27001-cycle2",
    name: "Cycle 2",
    type: "folder",
    lastModified: "2026-04-20T10:20:00Z",
    parentId: "iso27001",
    isDeleted: false,
  },
  {
    id: "iso27001-cycle3",
    name: "Cycle 3",
    type: "folder",
    lastModified: "2026-04-20T10:25:00Z",
    parentId: "iso27001",
    isDeleted: false,
  },

  // ISO 14001 cycles
  {
    id: "iso14001-cycle1",
    name: "Cycle 1",
    type: "folder",
    lastModified: "2026-04-20T10:30:00Z",
    parentId: "iso14001",
    isDeleted: false,
  },
  {
    id: "iso14001-cycle2",
    name: "Cycle 2",
    type: "folder",
    lastModified: "2026-04-20T10:35:00Z",
    parentId: "iso14001",
    isDeleted: false,
  },
  {
    id: "iso14001-cycle3",
    name: "Cycle 3",
    type: "folder",
    lastModified: "2026-04-20T10:40:00Z",
    parentId: "iso14001",
    isDeleted: false,
  },

  // ISO 45001 cycles
  {
    id: "iso45001-cycle1",
    name: "Cycle 1",
    type: "folder",
    lastModified: "2026-04-20T10:45:00Z",
    parentId: "iso45001",
    isDeleted: false,
  },
  {
    id: "iso45001-cycle2",
    name: "Cycle 2",
    type: "folder",
    lastModified: "2026-04-20T10:50:00Z",
    parentId: "iso45001",
    isDeleted: false,
  },
  {
    id: "iso45001-cycle3",
    name: "Cycle 3",
    type: "folder",
    lastModified: "2026-04-20T10:55:00Z",
    parentId: "iso45001",
    isDeleted: false,
  },

  // ISO 9001 Cycle 1 folders
  {
    id: "iso9001-cycle1-application",
    name: "Application Review",
    type: "folder",
    lastModified: "2026-04-20T11:00:00Z",
    parentId: "iso9001-cycle1",
    isDeleted: false,
  },
  {
    id: "iso9001-cycle1-stage1",
    name: "Stage 1 Audit",
    type: "folder",
    lastModified: "2026-04-20T11:05:00Z",
    parentId: "iso9001-cycle1",
    isDeleted: false,
  },
  {
    id: "iso9001-cycle1-stage2",
    name: "Stage 2 Audit",
    type: "folder",
    lastModified: "2026-04-20T11:10:00Z",
    parentId: "iso9001-cycle1",
    isDeleted: false,
  },

  // ISO 9001 Cycle 2 folders
  {
    id: "iso9001-cycle2-sur1",
    name: "Surveillance 1",
    type: "folder",
    lastModified: "2026-04-20T11:15:00Z",
    parentId: "iso9001-cycle2",
    isDeleted: false,
  },
  {
    id: "iso9001-cycle2-docs",
    name: "Audit Documents",
    type: "folder",
    lastModified: "2026-04-20T11:20:00Z",
    parentId: "iso9001-cycle2",
    isDeleted: false,
  },

  // ISO 9001 Cycle 3 folders
  {
    id: "iso9001-cycle3-sur2",
    name: "Surveillance 2",
    type: "folder",
    lastModified: "2026-04-20T11:25:00Z",
    parentId: "iso9001-cycle3",
    isDeleted: false,
  },
  {
    id: "iso9001-cycle3-recert",
    name: "Recertification",
    type: "folder",
    lastModified: "2026-04-20T11:30:00Z",
    parentId: "iso9001-cycle3",
    isDeleted: false,
  },

  // ISO 27001 Cycle 1 folders
  {
    id: "iso27001-cycle1-application",
    name: "Application Review",
    type: "folder",
    lastModified: "2026-04-20T11:35:00Z",
    parentId: "iso27001-cycle1",
    isDeleted: false,
  },
  {
    id: "iso27001-cycle1-stage1",
    name: "Stage 1 Audit",
    type: "folder",
    lastModified: "2026-04-20T11:40:00Z",
    parentId: "iso27001-cycle1",
    isDeleted: false,
  },
  {
    id: "iso27001-cycle1-stage2",
    name: "Stage 2 Audit",
    type: "folder",
    lastModified: "2026-04-20T11:45:00Z",
    parentId: "iso27001-cycle1",
    isDeleted: false,
  },

  // ISO 27001 Cycle 2 folders
  {
    id: "iso27001-cycle2-sur1",
    name: "Surveillance 1",
    type: "folder",
    lastModified: "2026-04-20T11:50:00Z",
    parentId: "iso27001-cycle2",
    isDeleted: false,
  },
  {
    id: "iso27001-cycle2-risk",
    name: "Risk Review",
    type: "folder",
    lastModified: "2026-04-20T11:55:00Z",
    parentId: "iso27001-cycle2",
    isDeleted: false,
  },

  // ISO 27001 Cycle 3 folders
  {
    id: "iso27001-cycle3-sur2",
    name: "Surveillance 2",
    type: "folder",
    lastModified: "2026-04-20T12:00:00Z",
    parentId: "iso27001-cycle3",
    isDeleted: false,
  },
  {
    id: "iso27001-cycle3-soa",
    name: "SOA Review",
    type: "folder",
    lastModified: "2026-04-20T12:05:00Z",
    parentId: "iso27001-cycle3",
    isDeleted: false,
  },

  // ISO 14001 Cycle 1 folders
  {
    id: "iso14001-cycle1-application",
    name: "Application Review",
    type: "folder",
    lastModified: "2026-04-20T12:10:00Z",
    parentId: "iso14001-cycle1",
    isDeleted: false,
  },
  {
    id: "iso14001-cycle1-stage1",
    name: "Stage 1 Audit",
    type: "folder",
    lastModified: "2026-04-20T12:15:00Z",
    parentId: "iso14001-cycle1",
    isDeleted: false,
  },
  {
    id: "iso14001-cycle1-stage2",
    name: "Stage 2 Audit",
    type: "folder",
    lastModified: "2026-04-20T12:20:00Z",
    parentId: "iso14001-cycle1",
    isDeleted: false,
  },

  // ISO 14001 Cycle 2 folders
  {
    id: "iso14001-cycle2-sur1",
    name: "Surveillance 1",
    type: "folder",
    lastModified: "2026-04-20T12:25:00Z",
    parentId: "iso14001-cycle2",
    isDeleted: false,
  },
  {
    id: "iso14001-cycle2-env",
    name: "Environmental Review",
    type: "folder",
    lastModified: "2026-04-20T12:30:00Z",
    parentId: "iso14001-cycle2",
    isDeleted: false,
  },

  // ISO 14001 Cycle 3 folders
  {
    id: "iso14001-cycle3-sur2",
    name: "Surveillance 2",
    type: "folder",
    lastModified: "2026-04-20T12:35:00Z",
    parentId: "iso14001-cycle3",
    isDeleted: false,
  },
  {
    id: "iso14001-cycle3-recert",
    name: "Recertification",
    type: "folder",
    lastModified: "2026-04-20T12:40:00Z",
    parentId: "iso14001-cycle3",
    isDeleted: false,
  },

  // ISO 45001 Cycle 1 folders
  {
    id: "iso45001-cycle1-application",
    name: "Application Review",
    type: "folder",
    lastModified: "2026-04-20T12:45:00Z",
    parentId: "iso45001-cycle1",
    isDeleted: false,
  },
  {
    id: "iso45001-cycle1-stage1",
    name: "Stage 1 Audit",
    type: "folder",
    lastModified: "2026-04-20T12:50:00Z",
    parentId: "iso45001-cycle1",
    isDeleted: false,
  },
  {
    id: "iso45001-cycle1-stage2",
    name: "Stage 2 Audit",
    type: "folder",
    lastModified: "2026-04-20T12:55:00Z",
    parentId: "iso45001-cycle1",
    isDeleted: false,
  },

  // ISO 45001 Cycle 2 folders
  {
    id: "iso45001-cycle2-sur1",
    name: "Surveillance 1",
    type: "folder",
    lastModified: "2026-04-20T13:00:00Z",
    parentId: "iso45001-cycle2",
    isDeleted: false,
  },
  {
    id: "iso45001-cycle2-safety",
    name: "Safety Review",
    type: "folder",
    lastModified: "2026-04-20T13:05:00Z",
    parentId: "iso45001-cycle2",
    isDeleted: false,
  },

  // ISO 45001 Cycle 3 folders
  {
    id: "iso45001-cycle3-sur2",
    name: "Surveillance 2",
    type: "folder",
    lastModified: "2026-04-20T13:10:00Z",
    parentId: "iso45001-cycle3",
    isDeleted: false,
  },
  {
    id: "iso45001-cycle3-recert",
    name: "Recertification",
    type: "folder",
    lastModified: "2026-04-20T13:15:00Z",
    parentId: "iso45001-cycle3",
    isDeleted: false,
  },

  // Files inside ISO 9001
  {
    id: "iso9001-file-1",
    name: "Client_Logo.png",
    type: "image",
    lastModified: "2026-04-20T13:20:00Z",
    size: "1.3 MB",
    parentId: "iso9001-cycle1-application",
    isDeleted: false,
  },
  {
    id: "iso9001-file-2",
    name: "Application_Form.pdf",
    type: "pdf",
    lastModified: "2026-04-20T13:25:00Z",
    size: "820 KB",
    parentId: "iso9001-cycle1-application",
    isDeleted: false,
  },
  {
    id: "iso9001-file-3",
    name: "Stage1_Audit_Plan.docx",
    type: "document",
    lastModified: "2026-04-20T13:30:00Z",
    size: "540 KB",
    parentId: "iso9001-cycle1-stage1",
    isDeleted: false,
  },
  {
    id: "iso9001-file-4",
    name: "Process_Map.png",
    type: "image",
    lastModified: "2026-04-20T13:35:00Z",
    size: "2.1 MB",
    parentId: "iso9001-cycle1-stage1",
    isDeleted: false,
  },
  {
    id: "iso9001-file-5",
    name: "Stage2_Report.pdf",
    type: "pdf",
    lastModified: "2026-04-20T13:40:00Z",
    size: "1.1 MB",
    parentId: "iso9001-cycle1-stage2",
    isDeleted: false,
  },
  {
    id: "iso9001-file-6",
    name: "NC_Log.docx",
    type: "document",
    lastModified: "2026-04-20T13:45:00Z",
    size: "460 KB",
    parentId: "iso9001-cycle2-docs",
    isDeleted: false,
  },

  // Files inside ISO 27001
  {
    id: "iso27001-file-1",
    name: "Asset_Register.xlsx",
    type: "spreadsheet",
    lastModified: "2026-04-20T13:50:00Z",
    size: "390 KB",
    parentId: "iso27001-cycle1-application",
    isDeleted: false,
  },
  {
    id: "iso27001-file-2",
    name: "Network_Diagram.png",
    type: "image",
    lastModified: "2026-04-20T13:55:00Z",
    size: "1.8 MB",
    parentId: "iso27001-cycle1-stage1",
    isDeleted: false,
  },
  {
    id: "iso27001-file-3",
    name: "Stage1_Checklist.pdf",
    type: "pdf",
    lastModified: "2026-04-20T14:00:00Z",
    size: "970 KB",
    parentId: "iso27001-cycle1-stage1",
    isDeleted: false,
  },
  {
    id: "iso27001-file-4",
    name: "SOA_v3.docx",
    type: "document",
    lastModified: "2026-04-20T14:05:00Z",
    size: "680 KB",
    parentId: "iso27001-cycle3-soa",
    isDeleted: false,
  },
  {
    id: "iso27001-file-5",
    name: "Risk_Assessment.pdf",
    type: "pdf",
    lastModified: "2026-04-20T14:10:00Z",
    size: "1.4 MB",
    parentId: "iso27001-cycle2-risk",
    isDeleted: false,
  },

  // Files inside ISO 14001
  {
    id: "iso14001-file-1",
    name: "Site_Photo_01.png",
    type: "image",
    lastModified: "2026-04-20T14:15:00Z",
    size: "2.6 MB",
    parentId: "iso14001-cycle1-application",
    isDeleted: false,
  },
  {
    id: "iso14001-file-2",
    name: "Environmental_Aspects.pdf",
    type: "pdf",
    lastModified: "2026-04-20T14:20:00Z",
    size: "890 KB",
    parentId: "iso14001-cycle1-stage1",
    isDeleted: false,
  },
  {
    id: "iso14001-file-3",
    name: "Waste_Management_Plan.docx",
    type: "document",
    lastModified: "2026-04-20T14:25:00Z",
    size: "530 KB",
    parentId: "iso14001-cycle2-env",
    isDeleted: false,
  },
  {
    id: "iso14001-file-4",
    name: "Legal_Register.xlsx",
    type: "spreadsheet",
    lastModified: "2026-04-20T14:30:00Z",
    size: "410 KB",
    parentId: "iso14001-cycle3-recert",
    isDeleted: false,
  },

  // Files inside ISO 45001
  {
    id: "iso45001-file-1",
    name: "Safety_Poster.png",
    type: "image",
    lastModified: "2026-04-20T14:35:00Z",
    size: "1.9 MB",
    parentId: "iso45001-cycle1-application",
    isDeleted: false,
  },
  {
    id: "iso45001-file-2",
    name: "Hazard_Identification.pdf",
    type: "pdf",
    lastModified: "2026-04-20T14:40:00Z",
    size: "760 KB",
    parentId: "iso45001-cycle1-stage1",
    isDeleted: false,
  },
  {
    id: "iso45001-file-3",
    name: "Training_Record.docx",
    type: "document",
    lastModified: "2026-04-20T14:45:00Z",
    size: "480 KB",
    parentId: "iso45001-cycle2-safety",
    isDeleted: false,
  },
  {
    id: "iso45001-file-4",
    name: "Incident_Log.xlsx",
    type: "spreadsheet",
    lastModified: "2026-04-20T14:50:00Z",
    size: "350 KB",
    parentId: "iso45001-cycle3-recert",
    isDeleted: false,
  },

  // Optional deleted examples
  {
    id: "deleted-1",
    name: "Old_Audit_Report.pdf",
    type: "pdf",
    lastModified: "2026-03-01T09:00:00Z",
    size: "950 KB",
    parentId: "iso9001-cycle3-recert",
    isDeleted: true,
  },
  {
    id: "deleted-2",
    name: "Retired_Logo.png",
    type: "image",
    lastModified: "2026-02-15T10:00:00Z",
    size: "1.1 MB",
    parentId: "iso27001-cycle1-stage2",
    isDeleted: true,
  },
];
