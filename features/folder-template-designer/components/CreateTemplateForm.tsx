"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type CreateTemplateFormProps = {
  value: string;
  onChange: (value: string) => void;
  onCreate: () => void;
};

export function CreateTemplateForm({
  value,
  onChange,
  onCreate,
}: CreateTemplateFormProps) {
  return (
    <Card className="border-zinc-200 shadow-sm">
      <CardHeader>
        <CardTitle>Create New Template</CardTitle>
        <CardDescription>
          Add a new template and start building its folder structure.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <Field className="flex-1">
            <FieldLabel htmlFor="template-name">Template name</FieldLabel>
            <Input
              id="template-name"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter template name"
            />
          </Field>

          <Button type="button" onClick={onCreate} className="sm:h-10">
            Add Template
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
