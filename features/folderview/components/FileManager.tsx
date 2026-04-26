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
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className={isDarkMode ? "dark" : ""}>
      <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100">
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
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((prev) => !prev)}
        />

        <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-8 md:px-10 md:py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
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
    </div>
  );
}
