import { FileItem } from "../mockData";
import { getIconForType } from "./icons";

interface SearchResultsDropdownProps {
  results: FileItem[];
  searchQuery: string;
  onSelect: (item: FileItem) => void;
}

export function SearchResultsDropdown({
  results,
  searchQuery,
  onSelect,
}: SearchResultsDropdownProps) {
  if (!searchQuery.trim()) return null;

  return (
    <div className="absolute left-1/2 top-full z-50 mt-3 w-full max-w-4xl -translate-x-1/2 overflow-hidden rounded-3xl border bg-background shadow-2xl">
      <div className="border-b px-4 py-3">
        <div className="flex flex-wrap gap-3">
          <button className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-accent">
            Type
          </button>
          <button className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-accent">
            People
          </button>
          <button className="rounded-xl border px-4 py-2 text-sm font-medium hover:bg-accent">
            Modified
          </button>
        </div>
      </div>

      <div className="max-h-[420px] overflow-y-auto py-2">
        {results.length > 0 ? (
          results.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="flex w-full items-start justify-between gap-4 px-5 py-3 text-left transition-colors hover:bg-accent"
            >
              <div className="flex min-w-0 items-start gap-3">
                <div className="mt-1 shrink-0">
                  {getIconForType(item.type, "h-5 w-5")}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-base font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Amara Bandu</p>
                </div>
              </div>

              <div className="shrink-0 text-sm text-muted-foreground">
                {new Intl.DateTimeFormat("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "2-digit",
                }).format(new Date(item.lastModified))}
              </div>
            </button>
          ))
        ) : (
          <div className="px-5 py-8 text-sm text-muted-foreground">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-5 py-4">
        <button className="text-base font-medium text-blue-600 hover:underline">
          Advanced search
        </button>

        <button className="text-base font-medium text-blue-600 hover:underline">
          All results
        </button>
      </div>
    </div>
  );
}
