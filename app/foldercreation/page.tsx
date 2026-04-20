"use client";

import {
  Plus,
  Moon,
} from "lucide-react";

import { initialTemplates } from "@/features/folder-template-designer/mock-data/templates";

import { Button, buttonVariants } from "@/components/ui/button";

import { TemplateCard } from "@/features/folder-template-designer/components/TemplateCard";

export default function DummyTemplateUI() {
  return (
    <div className="min-h-screen bg-background p-6 text-foreground">
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
              <TemplateCard key={template.id} template={template}/>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
