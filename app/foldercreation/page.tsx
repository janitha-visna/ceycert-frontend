"use client";

import * as React from "react";
import {
  Plus,
  LayoutGrid,
  MoreVertical,
  Pencil,
  CalendarClock,
  Trash2,
  Moon,
} from "lucide-react";

import { initialTemplates } from "@/features/folder-template-designer/mock-data/templates"; // adjust this path if needed

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,initialtemplate
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export default function DummyTemplateUI() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">Templates</h2>
              <p className="text-muted-foreground">
                Select a template to design its structure.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-lg mr-2"
              >
                <Moon className="w-[1.2rem] h-[1.2rem]" />
              </Button>

              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Template
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initialTemplates.map((template) => (
              <Card
                key={template.id}
                className="group relative cursor-pointer overflow-hidden transition-all hover:border-primary/50 hover:shadow-md"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-primary/10 p-2 text-primary">
                      <LayoutGrid className="h-5 w-5" />
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
