import { Card, CardContent } from "@/components/ui/card";
import { IsoCategory } from "../types/clientAssignment.types";

interface IsoCategoryCardsProps {
  categories: IsoCategory[];
}

export function IsoCategoryCards({ categories }: IsoCategoryCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
      {categories.map((cat) => {
        const percentage = Math.round((cat.assigned / cat.total) * 100);
        return (
          <Card
            key={cat.name}
            className="border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
          >
            <CardContent className="p-4">
              <div className="flex flex-col gap-1">
                <span
                  className={`text-[10px] font-bold uppercase tracking-tight ${cat.color}`}
                >
                  {cat.name}
                </span>
                <div className="flex justify-between items-baseline">
                  <span className="text-xl font-bold">
                    {cat.clients}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      Clients
                    </span>
                  </span>
                  <span className="text-xs font-semibold">{percentage}%</span>
                </div>
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${cat.bar} transition-all duration-500 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
                  <span>{cat.assigned} Assigned</span>
                  <span>{cat.total - cat.assigned} Left</span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
