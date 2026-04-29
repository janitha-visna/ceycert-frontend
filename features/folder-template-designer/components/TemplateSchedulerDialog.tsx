"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarDays, Clock, Plus, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SchedulingRule,
  TemplateDocument,
  TemplateNode,
} from "../types/folder-tree";
import { updateFolderTemplate } from "../api/folder-template-api";

interface DateVariable {
  id: string;
  name: string;
}

interface FolderItem {
  id: string;
  name: string;
  schedulingRule: SchedulingRule | null;
}

interface CycleGroup {
  id: string;
  name: string;
  folders: FolderItem[];
}

interface TemplateSchedulerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  template: TemplateDocument | null;
  onTemplateUpdated?: (template: TemplateDocument) => void;
}

function isDescendantOfCycle(
  nodeId: string,
  cycleId: string,
  nodes: TemplateDocument["nodes"],
): boolean {
  let currentNode = nodes.find((node) => node.id === nodeId);

  while (currentNode?.parentId) {
    if (currentNode.parentId === cycleId) {
      return true;
    }

    currentNode = nodes.find((node) => node.id === currentNode?.parentId);
  }

  return false;
}

function buildCycleGroups(template: TemplateDocument | null): CycleGroup[] {
  if (!template) return [];

  const cycles = template.nodes.filter((node) => node.type === "cycle");
  const folders = template.nodes.filter((node) => node.type === "folder");

  return cycles.map((cycle) => {
    const cycleFolders = folders
      .filter((folder) =>
        isDescendantOfCycle(folder.id, cycle.id, template.nodes),
      )
      .map((folder) => ({
        id: folder.id,
        name: folder.name,
        schedulingRule: folder.schedulingRule ?? null,
      }));

    return {
      id: cycle.id,
      name: cycle.name,
      folders: cycleFolders,
    };
  });
}

export function TemplateSchedulerDialog({
  isOpen,
  onClose,
  template,
  onTemplateUpdated,
}: TemplateSchedulerDialogProps) {
  const [localVariables, setLocalVariables] = React.useState<DateVariable[]>([
    { id: "v1", name: "Stage 1 Audit Date" },
    { id: "v2", name: "Stage 2 Audit Date" },
  ]);

  const [localRules, setLocalRules] = React.useState<
    Record<string, SchedulingRule | null>
  >({});

  const [newVarName, setNewVarName] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const cycleGroups = React.useMemo(
    () => buildCycleGroups(template),
    [template],
  );

  React.useEffect(() => {
    if (!isOpen || !template) return;

    const initialRules: Record<string, SchedulingRule | null> = {};

    template.nodes.forEach((node) => {
      if (node.type === "folder") {
        initialRules[node.id] = node.schedulingRule ?? null;
      }
    });

    setLocalRules(initialRules);
    setNewVarName("");
  }, [isOpen, template]);

  const handleAddVariable = () => {
    const trimmed = newVarName.trim();
    if (!trimmed) return;

    const newVariable: DateVariable = {
      id: `v_${Date.now()}`,
      name: trimmed,
    };

    setLocalVariables((prev) => [...prev, newVariable]);
    setNewVarName("");
  };

  const handleRemoveVariable = (id: string) => {
    setLocalVariables((prev) => prev.filter((item) => item.id !== id));

    setLocalRules((prev) => {
      const updated = { ...prev };

      Object.keys(updated).forEach((folderId) => {
        if (updated[folderId]?.variableId === id) {
          updated[folderId] = null;
        }
      });

      return updated;
    });
  };

  const handleToggleRule = (folderId: string, enabled: boolean) => {
    setLocalRules((prev) => ({
      ...prev,
      [folderId]: enabled
        ? {
            variableId: localVariables[0]?.id ?? "",
            offsetValue: 0,
            offsetUnit: "days",
            type: "before",
          }
        : null,
    }));
  };

  const handleUpdateRule = (
    folderId: string,
    field: keyof SchedulingRule,
    value: string | number,
  ) => {
    setLocalRules((prev) => {
      const current = prev[folderId] ?? {
        variableId: localVariables[0]?.id ?? "",
        offsetValue: 0,
        offsetUnit: "days",
        type: "before",
      };

      return {
        ...prev,
        [folderId]: {
          ...current,
          [field]: value,
        },
      };
    });
  };

  const handleSave = async () => {
    if (!template) return;

    try {
      setSaving(true);

      const updatedNodes: TemplateNode[] = template.nodes.map((node) => {
        if (node.type !== "folder") {
          return {
            ...node,
            schedulingRule: node.schedulingRule ?? null,
          };
        }

        const rule = localRules[node.id];

        return {
          ...node,
          schedulingRule: rule
            ? {
                variableId: rule.variableId,
                offsetValue: Number(rule.offsetValue),
                offsetUnit: rule.offsetUnit,
                type: rule.type,
              }
            : null,
        };
      });

      console.log("UPDATED NODES BEFORE SAVE:", updatedNodes);

      const updatedTemplate = await updateFolderTemplate(template.id, {
        nodes: updatedNodes,
      });

      console.log("UPDATED TEMPLATE FROM BACKEND:", updatedTemplate);

      onTemplateUpdated?.(updatedTemplate);
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save scheduling rules");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="flex h-[90vh] flex-col overflow-hidden p-0 sm:max-w-[900px]">
        <DialogHeader className="shrink-0 p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Clock className="h-6 w-6 text-primary" />
            Template Scheduler & Variables
          </DialogTitle>

          <DialogDescription>
            Manage date variables and scheduling rules for this template.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="min-h-0 flex-1">
          <div className="space-y-6 p-6 pt-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Template: {template?.name ?? "No template selected"}
              </p>
              <p className="text-xs text-muted-foreground">
                Template ID: {template?.id ?? "-"}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <CalendarDays className="h-4 w-4 text-primary" />
                1. Define Template Variables
              </h3>

              <div className="flex items-end gap-2">
                <div className="grid flex-1 gap-1.5">
                  <Label htmlFor="newVar" className="text-xs">
                    New Variable Name
                  </Label>
                  <Input
                    id="newVar"
                    placeholder="e.g. Stage 1 Audit Date"
                    value={newVarName}
                    onChange={(e) => setNewVarName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddVariable();
                      }
                    }}
                    className="h-9"
                  />
                </div>

                <Button
                  onClick={handleAddVariable}
                  disabled={!newVarName.trim()}
                  size="sm"
                  className="h-9"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variable
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {localVariables.map((variable) => (
                  <div
                    key={variable.id}
                    className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 py-1 pl-3 pr-1"
                  >
                    <span className="text-xs font-medium text-primary">
                      {variable.name}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleRemoveVariable(variable.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="h-4 w-4 text-primary" />
                2. Configure Folder Rules
              </h3>

              {cycleGroups.length > 0 ? (
                <Tabs defaultValue={cycleGroups[0]?.id} className="w-full">
                  <TabsList className="mb-4 h-9 w-fit justify-start bg-muted/50 p-1">
                    {cycleGroups.map((cycle) => (
                      <TabsTrigger
                        key={cycle.id}
                        value={cycle.id}
                        className="h-7 px-3 text-xs capitalize"
                      >
                        {cycle.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {cycleGroups.map((cycle) => (
                    <TabsContent
                      key={cycle.id}
                      value={cycle.id}
                      className="mt-0"
                    >
                      <div className="space-y-3 pb-2">
                        {cycle.folders.length === 0 ? (
                          <div className="rounded-xl border-2 border-dashed bg-muted/10 py-12 text-center text-muted-foreground">
                            <p className="text-xs">
                              No folders found in this cycle.
                            </p>
                          </div>
                        ) : (
                          <div className="grid gap-2">
                            <div className="grid grid-cols-12 gap-4 px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              <div className="col-span-4">Folder Name</div>
                              <div className="col-span-8">Scheduling Rule</div>
                            </div>

                            {cycle.folders.map((folder) => {
                              const rule = localRules[folder.id];

                              return (
                                <div
                                  key={folder.id}
                                  className="grid grid-cols-12 items-center gap-4 rounded-lg border bg-muted/30 p-3"
                                >
                                  <div className="col-span-4 truncate text-sm font-medium">
                                    {folder.name}
                                  </div>

                                  <div className="col-span-8 flex items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={!!rule}
                                      onChange={(e) =>
                                        handleToggleRule(
                                          folder.id,
                                          e.target.checked,
                                        )
                                      }
                                      className="h-4 w-4"
                                    />

                                    {rule ? (
                                      <div className="flex flex-1 flex-wrap items-center gap-2">
                                        <Input
                                          type="number"
                                          className="h-8 w-16 text-xs"
                                          value={rule.offsetValue}
                                          onChange={(e) =>
                                            handleUpdateRule(
                                              folder.id,
                                              "offsetValue",
                                              Number(e.target.value),
                                            )
                                          }
                                        />

                                        <Select
                                          value={rule.offsetUnit}
                                          onValueChange={(value) =>
                                            handleUpdateRule(
                                              folder.id,
                                              "offsetUnit",
                                              value,
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8 w-24 text-xs">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="days">
                                              days
                                            </SelectItem>
                                            <SelectItem value="months">
                                              months
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>

                                        <Select
                                          value={rule.type}
                                          onValueChange={(value) =>
                                            handleUpdateRule(
                                              folder.id,
                                              "type",
                                              value,
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8 w-24 text-xs">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="before">
                                              before
                                            </SelectItem>
                                            <SelectItem value="after">
                                              after
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>

                                        <Select
                                          value={rule.variableId}
                                          onValueChange={(value) =>
                                            handleUpdateRule(
                                              folder.id,
                                              "variableId",
                                              value,
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8 min-w-[180px] flex-1 text-xs">
                                            <SelectValue placeholder="Select variable" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {localVariables.map((variable) => (
                                              <SelectItem
                                                key={variable.id}
                                                value={variable.id}
                                              >
                                                {variable.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    ) : (
                                      <span className="text-xs italic text-muted-foreground">
                                        No rule set
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2 rounded-xl border-2 border-dashed p-8 text-center">
                  <Clock className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm font-medium">No Cycles Found</p>
                  <p className="text-xs text-muted-foreground">
                    Add cycles to your template to configure folder rules.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="shrink-0 border-t bg-muted/20 p-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSave} disabled={saving} className="px-8">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
