import React, { useEffect, useState } from "react";
import { Folder } from "../types";
import { storageService, StorageFile } from "../services/StorageService";
import {
  ArrowLeft,
  UploadCloud,
  File as FileIcon,
  Download,
  Trash2,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FolderDetailsProps {
  folder: Folder;
  onBack: () => void;
}

export const FolderDetails: React.FC<FolderDetailsProps> = ({
  folder,
  onBack,
}) => {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      try {
        const data = await storageService.listFiles(folder.id);
        setFiles(data);
      } catch (error) {
        console.error("Failed to load files", error);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [folder.id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setUploading(true);

    try {
      const newFile = await storageService.uploadFile(
        folder.id,
        e.target.files[0]
      );
      setFiles((prev) => [newFile, ...prev]);
    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const isCompleted = folder.status === "completed";

  return (
    <div className="space-y-6">
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="px-0 text-slate-700 hover:text-slate-900"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Stage
      </Button>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-950">
                {folder.name}
              </h2>
              <p className="mt-1 text-sm text-slate-700">
                Manage files and documents for this section.
              </p>
            </div>

            <Badge
              variant={isCompleted ? "default" : "secondary"}
              className={
                isCompleted
                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
              }
            >
              {isCompleted ? "Status: Complete" : "Status: Pending"}
            </Badge>
          </div>

          <div className="mb-8">
            <label
              className={`flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                uploading
                  ? "border-slate-300 bg-slate-50"
                  : "border-slate-300 hover:border-primary hover:bg-slate-50"
              }`}
            >
              {uploading ? (
                <div className="flex flex-col items-center">
                  <div className="mb-3 h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
                  <p className="text-sm font-medium text-slate-700">
                    Uploading to storage...
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center">
                  <UploadCloud className="mb-2 h-8 w-8 text-slate-500" />

                  <p className="text-sm text-slate-700">
                    <span className="font-semibold text-primary">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>

                  <p className="mt-1 text-xs font-medium text-slate-500">
                    PDF, XLSX, DOCX, JPG (MAX. 10MB)
                  </p>
                </div>
              )}

              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                disabled={uploading}
              />
            </label>
          </div>

          <div>
            <h3 className="mb-4 flex items-center text-lg font-semibold text-slate-950">
              <FileText className="mr-2 h-5 w-5 text-slate-500" />
              Uploaded Documents
            </h3>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-lg bg-slate-100"
                  />
                ))}
              </div>
            ) : files.length === 0 ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 py-12 text-center">
                <p className="text-sm font-medium text-slate-600">
                  No files uploaded yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-lg bg-blue-50 p-3 text-primary">
                        <FileIcon className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-950">
                          {file.name}
                        </p>
                        <p className="text-xs font-medium text-slate-500">
                          {(file.size / 1024).toFixed(0)} KB •{" "}
                          {new Date(file.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        title="Download"
                        className="text-slate-500 hover:text-primary"
                      >
                        <Download className="h-4 w-4" />
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        title="Delete"
                        className="text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
