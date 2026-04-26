import { Moon, Search, SlidersHorizontal, Sun, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { FolderDropdown } from "./FolderDropdown";
import { FileItem } from "../mockData";
import { SearchResultsDropdown } from "./SearchResultsDropdown";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  path: FileItem[];
  currentFolder: FileItem | null;
  folders: FileItem[];
  searchResults: FileItem[];
  onSearchSelect: (item: FileItem) => void;
  onNavigate: (id: string | null) => void;
  onBack: () => void;
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  path,
  currentFolder,
  folders,
  searchResults,
  onSearchSelect,
  onNavigate,
  isDarkMode,
  onToggleTheme,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md transition-colors dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-4 md:px-10">
        <div className="flex flex-col gap-4">
          <div className="relative flex min-h-[48px] items-center justify-center">
            <div className="relative w-full max-w-3xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-zinc-500 dark:text-zinc-400" />

              <Input
                placeholder="Search in Drive..."
                className="h-12 w-full rounded-full border-zinc-300 bg-white pl-12 pr-16 text-base shadow-sm transition-colors placeholder:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />

              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-3">
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange("")}
                    className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}

                <button
                  type="button"
                  className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
              </div>

              <SearchResultsDropdown
                results={searchResults}
                searchQuery={searchQuery}
                onSelect={onSearchSelect}
              />
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={onToggleTheme}
              className="absolute right-0 h-10 w-10 rounded-full border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900"
              title={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <BreadcrumbNav path={path} onNavigate={onNavigate} />

            <FolderDropdown
              currentFolder={currentFolder}
              folders={folders}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
