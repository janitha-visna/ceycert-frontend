import React from "react";
import {
  NodeType,
  TemplateDocument,
} from "@/features/folder-template-designer/types/folder-tree";
import { generateNextId } from "@/features/folder-template-designer/lib/generate-next-is";

type AddFormState = {
  parentId: string;
  type: NodeType;
  name: string;
};

type AddChildNodeFormProps = {
  addForm: AddFormState;
  setAddForm: React.Dispatch<React.SetStateAction<AddFormState | null>>;
  selectedTemplate: TemplateDocument | null;
  availableTypes: NodeType[];
  onSave: () => void;
  onCancel: () => void;
};

export function AddChildNodeForm({
  addForm,
  setAddForm,
  selectedTemplate,
  availableTypes,
  onSave,
  onCancel,
}: AddChildNodeFormProps) {
  return (
    <div className="rounded border p-4 space-y-3">
      <h2 className="font-semibold">Add Child Node</h2>

      <div className="text-sm text-gray-600">
        Parent: <span className="font-medium">{addForm.parentId}</span>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Category</label>
        <select
          value={addForm.type}
          onChange={(e) =>
            setAddForm((prev) =>
              prev ? { ...prev, type: e.target.value as NodeType } : prev
            )
          }
          className="rounded border px-3 py-2"
        >
          {availableTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Name</label>
        <input
          value={addForm.name}
          onChange={(e) =>
            setAddForm((prev) =>
              prev ? { ...prev, name: e.target.value } : prev
            )
          }
          placeholder="Enter custom name"
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="text-xs text-gray-500">
        Generated ID preview:{" "}
        {selectedTemplate
          ? generateNextId(
              selectedTemplate.nodes,
              addForm.parentId,
              addForm.type
            )
          : ""}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSave}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded border px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
