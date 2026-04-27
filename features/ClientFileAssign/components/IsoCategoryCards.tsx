import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IsoCategory } from "../types/clientAssignment.types";

interface IsoCategoryCardsProps {
  categories: IsoCategory[];
}

export function IsoCategoryCards({ categories }: IsoCategoryCardsProps) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {categories.map((cat) => {
        const percentage =
          cat.total === 0 ? 0 : Math.round((cat.assigned / cat.total) * 100);

        return (
          <Card key={cat.name} className="transition-all hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="w-fit">
                  {cat.name}
                </Badge>

                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xl font-bold">{cat.clients}</span>
                    <span className="ml-1 text-xs text-muted-foreground">
                      Clients
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-muted-foreground">
                    {percentage}%
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
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
