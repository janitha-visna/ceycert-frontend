// features/folderview/hooks/useFileActions.ts

import { FileItem } from "../mockData";

type FileAction = "rename" | "trash" | "restore";

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
      const newName = window.prompt("Enter new name:", targetItem.name);

      if (newName && newName.trim() !== "") {
        setItems((prev) =>
          prev.map((i) =>
            i.id === targetItem.id ? { ...i, name: newName.trim() } : i,
          ),
        );
      }
    }
  };

  return {
    modifyFile,
  };
}
