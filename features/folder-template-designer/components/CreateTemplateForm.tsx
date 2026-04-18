"use client";

import React from "react";

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
    <div className="rounded border p-4 space-y-3">
      <h2 className="font-semibold">Create New Template</h2>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter template name"
          className="flex-1 rounded border px-3 py-2"
        />
        <button
          type="button"
          onClick={onCreate}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Add Template
        </button>
      </div>
    </div>
  );
}
