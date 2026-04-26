"use client";

import { useState, useMemo } from "react";
import { FileItem, initialData } from "../mockData";
import { Header } from "./Header";
import { FileGrid } from "./FileGrid";

export function FileManager() {
  const [items, setItems] = useState<FileItem[]>(initialData);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return items
      .filter((i) => !i.isDeleted)
      .filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 8);
  }, [items, searchQuery]);

  const displayedItems = useMemo(() => {
    return items.filter((i) => !i.isDeleted && i.parentId === currentFolderId);
  }, [items, currentFolderId]);

  const handleNavigate = (id: string | null) => {
    if (id === currentFolderId) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(id);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);

    setCurrentFolderId(id);
    setSearchQuery("");
  };

  const handleSearchSelect = (item: FileItem) => {
    if (item.type === "folder") {
      handleNavigate(item.id);
      return;
    }

    if (item.parentId) {
      handleNavigate(item.parentId);
    }

    setSearchQuery("");
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentFolderId(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentFolderId(history[newIndex]);
    }
  };

  const handleModify = (
    targetItem: FileItem,
    action: "rename" | "trash" | "restore",
  ) => {
    if (action === "trash") {
      setItems((prev) =>
        prev.map((i) =>
          i.id === targetItem.id ? { ...i, isDeleted: true } : i,
        ),
      );
    } else if (action === "restore") {
      setItems((prev) =>
        prev.map((i) =>
          i.id === targetItem.id ? { ...i, isDeleted: false } : i,
        ),
      );
    } else if (action === "rename") {
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

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        path={breadcrumbPath}
        currentFolder={currentFolder}
        folders={items}
        searchResults={searchResults}
        onSearchSelect={handleSearchSelect}
        onNavigate={handleNavigate}
        onBack={handleBack}
        onForward={handleForward}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < history.length - 1}
      />

      <main className="mx-auto w-full max-w-[1600px] flex-1 p-4 md:p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">
            {currentFolder ? currentFolder.name : "Home"}
          </h1>
        </div>

        <FileGrid
          items={displayedItems}
          onNavigate={handleNavigate}
          onModify={handleModify}
          searchQuery=""
        />
      </main>
    </div>
  );
}
