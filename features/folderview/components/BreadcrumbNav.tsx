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
      <BreadcrumbList className="text-lg font-medium">
        <BreadcrumbItem>
          <BreadcrumbLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(null);
            }}
            className="flex items-center gap-2 text-lg hover:text-primary transition-colors"
          >
            <Home className="w-6 h-6" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {path.map((folder, index) => {
          const isLast = index === path.length - 1;

          return (
            <Fragment key={folder.id}>
              <BreadcrumbSeparator className="text-lg" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-lg font-semibold text-primary">
                    {folder.name}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(folder.id);
                    }}
                    className="text-lg hover:text-primary transition-colors"
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
