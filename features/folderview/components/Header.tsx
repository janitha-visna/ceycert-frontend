import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BreadcrumbNav } from "./BreadcrumbNav";
import { FolderDropdown } from "./FolderDropdown";
import { FileItem } from "../mockData";
import { SearchResultsDropdown } from "./SearchResultsDropdown";


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
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border bg-background/80 px-4 pt-5 pb-3 backdrop-blur-md md:px-8">
      <div className="flex flex-col gap-4">
        <div className="relative flex min-h-[52px] items-start justify-center">
          <div className="relative w-full max-w-4xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search in Drive..."
              className="h-14 w-full rounded-full border bg-muted/40 pl-12 pr-24 text-lg"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />

            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-3">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
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
        </div>

        {!searchQuery.trim() && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 overflow-x-auto pb-1">
              <BreadcrumbNav path={path} onNavigate={onNavigate} />
              <FolderDropdown
                currentFolder={currentFolder}
                folders={folders}
                onNavigate={onNavigate}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
