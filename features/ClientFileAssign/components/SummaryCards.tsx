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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {cards.map((item, index) => {
        const Icon = iconMap[item.icon] || Users;
        return (
          <Card
            key={index}
            className="border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
          >
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div
                  className={`p-2.5 rounded-xl ${item.bg} dark:bg-slate-900 border border-slate-100 dark:border-slate-800`}
                >
                  <Icon className={`h-5 w-5 ${item.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {item.title}
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
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
