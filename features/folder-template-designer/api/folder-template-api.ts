import { TemplateDocument, TemplateNode } from "../types/folder-tree";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function getFolderTemplates(): Promise<TemplateDocument[]> {
  const res = await fetch(`${API_URL}/folder-templates`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch templates");
  }

  return res.json();
}

export async function getFolderTemplateById(
  id: string,
): Promise<TemplateDocument> {
  const res = await fetch(`${API_URL}/folder-templates/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch template");
  }

  return res.json();
}

export async function createFolderTemplate(name: string) {
  const res = await fetch(`${API_URL}/folder-templates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    throw new Error("Failed to create template");
  }

  return res.json();
}

export async function updateFolderTemplate(
  id: string,
  payload: {
    name?: string;
    nodes?: TemplateNode[];
  },
): Promise<TemplateDocument> {
  const res = await fetch(`${API_URL}/folder-templates/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to update template");
  }

  return res.json();
}

export async function deleteFolderTemplate(id: string) {
  const res = await fetch(`${API_URL}/folder-templates/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete template");
  }

  return res.json();
}
