import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  ShieldCheck,
  FolderOpen,
  UserPlus,
  LucideIcon,
} from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: string;
  color: string;
  bg: string;
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  ShieldCheck,
  FolderOpen,
  UserPlus,
};

export function SummaryCards({ cards }: { cards: SummaryCardProps[] }) {
  return (
    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((item, index) => {
        const Icon = iconMap[item.icon] || Users;

        return (
          <Card key={index} className="transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl border bg-muted p-2.5">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>

                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {item.title}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {item.value}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
