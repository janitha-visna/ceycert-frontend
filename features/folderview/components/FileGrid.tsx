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

export function FileGrid({ items, onNavigate, onModify }: FileGridProps) {
  if (items.length === 0) {
    return (
      <Card className="mx-auto mt-10 max-w-md border-dashed">
        <CardContent className="flex min-h-[320px] flex-col items-center justify-center px-6 py-10 text-center">
          <Folder className="mb-4 h-14 w-14 text-muted-foreground/40" />
          <h2 className="mb-2 text-xl font-semibold">No files here</h2>

          <p className="text-sm text-muted-foreground">
            Upload files or create folders to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  const folders = items.filter((i) => i.type === "folder");
  const files = items.filter((i) => i.type !== "folder");

  return (
    <div className="flex flex-col gap-8 pb-12">
      {folders.length > 0 && (
        <section className="space-y-4">
          <h2 className="px-1 text-sm font-medium text-muted-foreground">
            Folders
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
        <section className="space-y-4">
          <h2 className="px-1 text-sm font-medium text-muted-foreground">
            Files
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
