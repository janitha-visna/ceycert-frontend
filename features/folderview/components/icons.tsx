import {
  Folder,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileArchive,
  File,
  FileCode,
} from "lucide-react";
import { ItemType } from "../mockData";
import { ReactNode } from "react";

export function getIconForType(type: ItemType, className?: string): ReactNode {
  switch (type) {
    case "folder":
      return (
        <Folder className={`text-blue-500 fill-blue-500/20 ${className}`} />
      );
    case "pdf":
      return <FileText className={`text-red-500 ${className}`} />;
    case "spreadsheet":
      return <FileSpreadsheet className={`text-green-600 ${className}`} />;
    case "document":
      return <FileCode className={`text-blue-600 ${className}`} />;
    case "image":
      return <FileImage className={`text-purple-500 ${className}`} />;
    case "video":
      return <FileVideo className={`text-pink-500 ${className}`} />;
    case "archive":
      return <FileArchive className={`text-yellow-600 ${className}`} />;
    default:
      return <File className={`text-gray-500 ${className}`} />;
  }
}
