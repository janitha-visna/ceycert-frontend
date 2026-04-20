"use client";

import Link from "next/link";
import {
  LayoutGrid,
  MoreVertical,
  Pencil,
  CalendarClock,
  Trash2,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { TemplateDocument } from "../types/folder-tree";

type TemplateCardProps = {
  template: TemplateDocument,
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Link href={`/foldercreation/${template.id}`} className="block">
      <Card className="group relative cursor-pointer overflow-hidden transition-all hover:border-primary/50 hover:shadow-md">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <LayoutGrid className="h-5 w-5" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger
                onClick={(e) => e.preventDefault()}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-8 w-8 opacity-100"
                )}
              >
                <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <Pencil className="h-4 w-4" />
                  Rename
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-2">
                  <CalendarClock className="h-4 w-4" />
                  Date Scheduler
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <CardTitle className="mt-4">{template.name}</CardTitle>
        </CardHeader>

        <CardContent />
      </Card>
    </Link>
  );
}
