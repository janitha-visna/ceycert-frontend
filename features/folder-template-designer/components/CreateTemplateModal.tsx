"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CreateTemplateModalProps = {
  open: boolean;
  templateName: string;
  onTemplateNameChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export function CreateTemplateModal({
  open,
  templateName,
  onTemplateNameChange,
  onClose,
  onSave,
}: CreateTemplateModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Create New Template</CardTitle>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">Template Name</Label>
            <Input
              id="template-name"
              placeholder="Enter template name"
              value={templateName}
              onChange={(e) => onTemplateNameChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSave();
                }
              }}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
