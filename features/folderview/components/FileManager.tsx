"use client";

import { useMemo, useState } from "react";
import { FileItem, initialData } from "../mockData";
import { Header } from "./Header";
import { FileGrid } from "./FileGrid";

import { useFolderNavigation } from "../hooks/useFolderNavigation";
import { useFolderSearch } from "../hooks/useFolderSearch";
import { useFileActions } from "../hooks/useFileActions";

export function FileManager() {
  const [items, setItems] = useState<FileItem[]>(initialData);

  const {
    currentFolderId,
    currentFolder,
    breadcrumbPath,
    navigateTo,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
  } = useFolderNavigation(items);

  const { searchQuery, setSearchQuery, searchResults } = useFolderSearch(items);

  const { modifyFile } = useFileActions(setItems);

  const displayedItems = useMemo(() => {
    return items.filter((i) => !i.isDeleted && i.parentId === currentFolderId);
  }, [items, currentFolderId]);

  const handleNavigate = (id: string | null) => {
    navigateTo(id);
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
        onBack={goBack}
        onForward={goForward}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
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
          onModify={modifyFile}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}
