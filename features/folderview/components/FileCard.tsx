import { FileItem } from "../mockData";
import { getIconForType } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2, Edit2, RotateCcw, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FileCardProps {
  item: FileItem;
  onNavigate?: (id: string) => void;
  onModify?: (item: FileItem, action: "rename" | "trash" | "restore") => void;
  layout?: "grid" | "list";
}

export function FileCard({
  item,
  onNavigate,
  onModify,
  layout = "grid",
}: FileCardProps) {
  const isFolder = item.type === "folder";

  const handleClick = () => {
    if (isFolder && onNavigate) {
      onNavigate(item.id);
    }
  };

  if (layout === "list") {
    return (
      <div
        onClick={handleClick}
        className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-accent"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">{getIconForType(item.type, "h-4 w-4")}</div>

          <span className="truncate text-sm font-medium" title={item.name}>
            {item.name}
          </span>
        </div>

        {onModify && (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                >
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {!item.isDeleted && (
                  <>
                    {!isFolder && (
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onModify(item, "rename");
                      }}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onModify(item, "trash");
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Move to Trash
                    </DropdownMenuItem>
                  </>
                )}

                {item.isDeleted && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onModify(item, "restore");
                    }}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restore
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    );
  }

  return (
    <Card
      onClick={handleClick}
      className="group cursor-pointer rounded-xl border bg-card transition-all hover:bg-accent hover:shadow-md"
    >
      <CardContent className="flex items-center justify-between px-4 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="shrink-0">{getIconForType(item.type, "h-5 w-5")}</div>

          <span className="truncate text-sm font-medium" title={item.name}>
            {item.name}
          </span>
        </div>

        {onModify && (
          <div onClick={(e) => e.stopPropagation()} className="shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                >
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-48">
                {!item.isDeleted && (
                  <>
                    {!isFolder && (
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        onModify(item, "rename");
                      }}
                    >
                      <Edit2 className="mr-2 h-4 w-4" />
                      Rename
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        onModify(item, "trash");
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Move to Trash
                    </DropdownMenuItem>
                  </>
                )}

                {item.isDeleted && (
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onModify(item, "restore");
                    }}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Restore
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
