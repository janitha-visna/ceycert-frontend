import { FileItem } from "../mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Folder as FolderIcon } from "lucide-react";

interface FolderDropdownProps {
  currentFolder: FileItem | null;
  folders: FileItem[];
  onNavigate: (id: string | null) => void;
}

export function FolderDropdown({
  currentFolder,
  folders,
  onNavigate,
}: FolderDropdownProps) {
  // If currentFolder is null, we are at root.
  // We want to show subfolders of root or just a list of all folders to jump quickly.
  // For standard Google Drive, clicking the parent dropdown usually shows immediate children of current, or sibling folders depending on context.
  // Let's make it show subfolders of the current folder, or. root folders if we are at root.

  const childFolders = folders.filter(
    (f) =>
      f.type === "folder" &&
      !f.isDeleted &&
      f.parentId === (currentFolder ? currentFolder.id : null)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-1 rounded-md px-3 text-sm font-medium hover:bg-accent transition-colors">
        <span className="sr-only sm:not-sr-only">Quick Jump</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        {currentFolder && (
          <DropdownMenuItem onClick={() => onNavigate(currentFolder.parentId)}>
            <FolderIcon className="mr-2 h-4 w-4 text-blue-500" />
            <span className="truncate">.. (Parent Dir)</span>
          </DropdownMenuItem>
        )}
        {childFolders.length === 0 ? (
          <div className="p-2 text-xs text-center text-zinc-500">
            No subfolders
          </div>
        ) : (
          childFolders.map((folder) => (
            <DropdownMenuItem
              key={folder.id}
              onClick={() => onNavigate(folder.id)}
            >
              <FolderIcon className="mr-2 h-4 w-4 text-blue-400" />
              <span className="truncate">{folder.name}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
