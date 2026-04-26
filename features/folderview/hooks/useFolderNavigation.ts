// features/folderview/hooks/useFolderNavigation.ts

import { useMemo, useState } from "react";
import { FileItem } from "../mockData";

export function useFolderNavigation(items: FileItem[]) {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [history, setHistory] = useState<(string | null)[]>([null]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentFolder = useMemo(
    () => items.find((i) => i.id === currentFolderId) || null,
    [items, currentFolderId],
  );

  const breadcrumbPath = useMemo(() => {
    const path: FileItem[] = [];
    let current = currentFolder;

    while (current) {
      path.unshift(current);
      current = items.find((i) => i.id === current?.parentId) || null;
    }

    return path;
  }, [items, currentFolder]);

  const navigateTo = (id: string | null) => {
    if (id === currentFolderId) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(id);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentFolderId(id);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentFolderId(history[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentFolderId(history[newIndex]);
    }
  };

  return {
    currentFolderId,
    currentFolder,
    breadcrumbPath,
    navigateTo,
    goBack,
    goForward,
    canGoBack: historyIndex > 0,
    canGoForward: historyIndex < history.length - 1,
  };
}
