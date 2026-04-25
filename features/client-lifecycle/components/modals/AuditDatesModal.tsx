import React, { useState } from "react";
import { CalendarDays } from "lucide-react";

import { Modal } from "../Modal";
import { AuditDate } from "../../types";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuditDatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  dates: AuditDate[];
}

export const AuditDatesModal: React.FC<AuditDatesModalProps> = ({
  isOpen,
  onClose,
  dates,
}) => {
  const [activeTab, setActiveTab] = useState("All");

  const availableCycles = [
    "All",
    ...Array.from(new Set(dates.map((d) => d.cycleName))).sort(),
  ];

  const filteredDates =
    activeTab === "All"
      ? dates
      : dates.filter((d) => d.cycleName === activeTab);

  const groupedDates = filteredDates.reduce((acc, date) => {
    if (!acc[date.cycleName]) acc[date.cycleName] = [];
    acc[date.cycleName].push(date);
    return acc;
  }, {} as Record<string, AuditDate[]>);

  const displayedCycles = Object.keys(groupedDates).sort();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Audit Schedule"
      maxWidth="max-w-2xl"
    >
      <div className="flex max-h-[calc(90vh-73px)] flex-col">
        <div className="border-b px-6 py-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              {availableCycles.map((cycle) => (
                <TabsTrigger key={cycle} value={cycle}>
                  {cycle}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {displayedCycles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
              <CalendarDays className="mb-3 h-10 w-10" />
              <p>No scheduled audits found.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {displayedCycles.map((cycleName) => (
                <Card key={cycleName}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{cycleName}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <div className="overflow-hidden rounded-md border">
                      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-muted px-4 py-3 text-sm font-medium text-muted-foreground">
                        <div>Stage</div>
                        <div>Status</div>
                        <div>Planned Date</div>
                        <div>Actual Date</div>
                      </div>

                      {groupedDates[cycleName].map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-t px-4 py-4 text-sm"
                        >
                          <div className="font-medium">{item.stage}</div>

                          <div>
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                item.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : item.status === "Delayed"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <div className="font-mono">{item.plannedDate}</div>

                          <div
                            className={
                              item.actualDate
                                ? "font-mono"
                                : "text-muted-foreground"
                            }
                          >
                            {item.actualDate || "Not completed"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end border-t bg-white px-6 py-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
