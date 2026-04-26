// features/folderview/hooks/useFileActions.ts

import { FileItem } from "../mockData";

export type FileAction = "rename" | "trash" | "restore";

export function useFileActions(
  setItems: React.Dispatch<React.SetStateAction<FileItem[]>>,
) {
  const modifyFile = (targetItem: FileItem, action: FileAction) => {
    if (action === "trash") {
      setItems((prev) =>
        prev.map((i) =>
          i.id === targetItem.id ? { ...i, isDeleted: true } : i,
        ),
      );
    }

    if (action === "restore") {
      setItems((prev) =>
        prev.map((i) =>
          i.id === targetItem.id ? { ...i, isDeleted: false } : i,
        ),
      );
    }

    if (action === "rename") {
      // Rename needs dialog/input, so we handle it later from FileManager.
      return;
    }
  };

  const renameFile = (targetItem: FileItem, newName: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === targetItem.id ? { ...i, name: newName } : i)),
    );
  };

  return {
    modifyFile,
    renameFile,
  };
}
