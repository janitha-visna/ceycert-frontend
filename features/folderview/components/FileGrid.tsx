import { FileItem } from "../mockData";
import { FileCard } from "./FileCard";
import { Folder } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface FileGridProps {
  items: FileItem[];
  onNavigate: (id: string) => void;
  onModify: (item: FileItem, action: "rename" | "trash" | "restore") => void;
  searchQuery: string;
}

export function FileGrid({
  items,
  onNavigate,
  onModify,
  searchQuery,
}: FileGridProps) {
  const isSearching = searchQuery.trim() !== "";

  if (items.length === 0) {
    return (
      <Card className="mx-auto mt-10 max-w-md border-dashed">
        <CardContent className="flex min-h-[320px] flex-col items-center justify-center px-6 py-10 text-center">
          <Folder className="mb-4 h-14 w-14 text-muted-foreground/40" />
          <h2 className="mb-2 text-xl font-semibold">No files here</h2>
          {searchQuery ? (
            <p className="text-sm text-muted-foreground">
              We couldn&apos;t find anything matching "{searchQuery}".
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Upload files or create folders to get started.
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  const folders = items.filter((i) => i.type === "folder");
  const files = items.filter((i) => i.type !== "folder");

  if (isSearching) {
    return (
      <section className="space-y-3 pb-12">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Results
        </h2>

        <div className="rounded-xl border bg-card p-2">
          <div className="space-y-1">
            {items.map((item) => (
              <FileCard
                key={item.id}
                item={item}
                onNavigate={onNavigate}
                onModify={onModify}
                layout="list"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-12">
      {folders.length > 0 && (
        <section className="space-y-3">
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Folders
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {folders.map((folder) => (
              <FileCard
                key={folder.id}
                item={folder}
                onNavigate={onNavigate}
                onModify={onModify}
                layout="grid"
              />
            ))}
          </div>
        </section>
      )}

      {folders.length > 0 && files.length > 0 && <Separator />}

      {files.length > 0 && (
        <section className="space-y-3">
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Files
          </h2>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {files.map((file) => (
              <FileCard
                key={file.id}
                item={file}
                onModify={onModify}
                layout="grid"
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
