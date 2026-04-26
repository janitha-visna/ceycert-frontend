import { FileItem } from "../mockData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";
import { Home } from "lucide-react";

interface BreadcrumbNavProps {
  path: FileItem[];
  onNavigate: (id: string | null) => void;
}

export function BreadcrumbNav({ path, onNavigate }: BreadcrumbNavProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-sm font-medium text-muted-foreground">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(null);
            }}
            className="flex items-center gap-2 transition-colors hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {path.map((folder, index) => {
          const isLast = index === path.length - 1;

          return (
            <Fragment key={folder.id}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="font-semibold text-foreground">
                    {folder.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(folder.id);
                    }}
                    className="transition-colors hover:text-foreground"
                  >
                    {folder.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
