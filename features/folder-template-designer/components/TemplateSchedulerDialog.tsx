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
import { TemplateDocument } from "../types/folder-tree";

type OffsetUnit = "days" | "months";
type RuleType = "before" | "after";

interface DateVariable {
  id: string;
  name: string;
}

interface SchedulingRule {
  variableId: string;
  offsetValue: number;
  offsetUnit: OffsetUnit;
  type: RuleType;
}

interface FolderItem {
  id: string;
  name: string;
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
}

function buildCycleGroups(template: TemplateDocument | null): CycleGroup[] {
  if (!template) return [];

  const cycles = template.nodes.filter((node) => node.type === "cycle");
  const stages = template.nodes.filter((node) => node.type === "stage");
  const folders = template.nodes.filter((node) => node.type === "folder");

  return cycles.map((cycle) => {
    const stageIds = stages
      .filter((stage) => stage.parentId === cycle.id)
      .map((stage) => stage.id);

    const cycleFolders = folders
      .filter((folder) => folder.parentId && stageIds.includes(folder.parentId))
      .map((folder) => ({
        id: folder.id,
        name: folder.name,
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
}: TemplateSchedulerDialogProps) {
  const cycleGroups = React.useMemo(
    () => buildCycleGroups(template),
    [template]
  );

  const [localVariables, setLocalVariables] = React.useState<DateVariable[]>([
    { id: "v1", name: "Stage 1 Audit Date" },
    { id: "v2", name: "Stage 2 Audit Date" },
  ]);

  const [localRules, setLocalRules] = React.useState<
    Record<string, SchedulingRule | undefined>
  >({});

  const [newVarName, setNewVarName] = React.useState("");

  React.useEffect(() => {
    if (!isOpen) return;

    setLocalVariables([
      { id: "v1", name: "Stage 1 Audit Date" },
      { id: "v2", name: "Stage 2 Audit Date" },
    ]);

    const initialRules: Record<string, SchedulingRule | undefined> = {};

    cycleGroups.forEach((cycle) => {
      cycle.folders.forEach((folder) => {
        initialRules[folder.id] = undefined;
      });
    });

    setLocalRules(initialRules);
    setNewVarName("");
  }, [isOpen, cycleGroups]);

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
          updated[folderId] = undefined;
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
            variableId: "",
            offsetValue: 0,
            offsetUnit: "days",
            type: "before",
          }
        : undefined,
    }));
  };

  const handleUpdateRule = (
    folderId: string,
    field: keyof SchedulingRule,
    value: string | number
  ) => {
    setLocalRules((prev) => {
      const current = prev[folderId] ?? {
        variableId: "",
        offsetValue: 0,
        offsetUnit: "days" as OffsetUnit,
        type: "before" as RuleType,
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

  const handleSave = () => {
    if (!template) return;

    const finalPayload = {
      templateId: template.id,
      templateName: template.name,

      variables: localVariables,

      rules: Object.entries(localRules)
        .filter(([_, rule]) => rule !== undefined)
        .map(([folderId, rule]) => ({
          folderId,
          ...rule,
        })),
    };

    console.log("FINAL JSON:", finalPayload);

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] h-[90vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="shrink-0 p-6 pb-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Clock className="w-6 h-6 text-primary" />
            Template Scheduler & Variables
          </DialogTitle>
          <DialogDescription>
            Manage date variables and scheduling rules for this template.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-6 pt-4 space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">
                Template: {template?.name ?? "No template selected"}
              </p>
              <p className="text-xs text-muted-foreground">
                Template ID: {template?.id ?? "-"}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                1. Define Template Variables
              </h3>

              <div className="flex items-end gap-2">
                <div className="grid gap-1.5 flex-1">
                  <Label htmlFor="newVar" className="text-xs">
                    New Variable Name
                  </Label>
                  <Input
                    id="newVar"
                    placeholder="e.g. Stage 1 Audit Date"
                    value={newVarName}
                    onChange={(e) => setNewVarName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddVariable()}
                    className="h-9"
                  />
                </div>

                <Button
                  onClick={handleAddVariable}
                  disabled={!newVarName.trim()}
                  size="sm"
                  className="h-9"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Variable
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {localVariables.map((variable) => (
                  <div
                    key={variable.id}
                    className="flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-full pl-3 pr-1 py-1"
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
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}

                {localVariables.length === 0 && (
                  <p className="text-xs text-muted-foreground italic">
                    No variables defined yet.
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                2. Configure Folder Rules
              </h3>

              {cycleGroups.length > 0 ? (
                <Tabs defaultValue={cycleGroups[0]?.id} className="w-full">
                  <TabsList className="w-fit justify-start h-9 bg-muted/50 p-1 mb-4">
                    {cycleGroups.map((cycle) => (
                      <TabsTrigger
                        key={cycle.id}
                        value={cycle.id}
                        className="text-xs px-3 h-7 capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm"
                      >
                        {cycle.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {cycleGroups.map((cycle) => (
                    <TabsContent
                      key={cycle.id}
                      value={cycle.id}
                      className="mt-0 outline-none"
                    >
                      <div className="space-y-3 pb-2">
                        {cycle.folders.length === 0 ? (
                          <div className="text-center py-12 border-2 border-dashed rounded-xl text-muted-foreground bg-muted/10">
                            <p className="text-xs">
                              No folders found in this cycle.
                            </p>
                          </div>
                        ) : (
                          <div className="grid gap-2">
                            <div className="grid grid-cols-12 gap-4 px-2 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                              <div className="col-span-4">Folder Name</div>
                              <div className="col-span-8">Scheduling Rule</div>
                            </div>

                            {cycle.folders.map((folder) => {
                              const rule = localRules[folder.id];

                              return (
                                <div
                                  key={folder.id}
                                  className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg border bg-muted/30 group hover:bg-muted/50 transition-colors"
                                >
                                  <div className="col-span-4 font-medium text-sm truncate">
                                    {folder.name}
                                  </div>

                                  <div className="col-span-8 flex items-center gap-3">
                                    <input
                                      type="checkbox"
                                      checked={!!rule}
                                      onChange={(e) =>
                                        handleToggleRule(
                                          folder.id,
                                          e.target.checked
                                        )
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                    />

                                    {rule ? (
                                      <div className="flex items-center gap-2 flex-1 flex-wrap">
                                        <Input
                                          type="number"
                                          className="w-16 h-8 text-xs font-mono"
                                          value={rule.offsetValue}
                                          onChange={(e) =>
                                            handleUpdateRule(
                                              folder.id,
                                              "offsetValue",
                                              parseInt(e.target.value) || 0
                                            )
                                          }
                                        />

                                        <Select
                                          value={rule.offsetUnit}
                                          onValueChange={(value) =>
                                            handleUpdateRule(
                                              folder.id,
                                              "offsetUnit",
                                              value
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8 text-xs w-24">
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
                                              value
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8 text-xs w-24">
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
                                              value
                                            )
                                          }
                                        >
                                          <SelectTrigger className="h-8 text-xs flex-1 min-w-[180px]">
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
                                      <span className="text-xs text-muted-foreground italic">
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
                <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center space-y-2">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                  <p className="text-sm font-medium">No Cycles Found</p>
                  <p className="text-xs text-muted-foreground">
                    Add cycles to your template to configure folder rules.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="shrink-0 p-6 border-t bg-muted/20">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="px-8">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
