import { Card } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  subValue: string;
  subColor: string;
  isPercentage?: boolean;
}

export default function StatCard({
  title,
  value,
  subValue,
  subColor,
  isPercentage,
}: StatCardProps) {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-indigo-200">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        {title}
      </p>

      <div className="flex items-baseline gap-1">
        <p className="text-2xl font-bold tracking-tight text-slate-900">
          {value.toLocaleString()}
        </p>

        {isPercentage && (
          <span className="text-sm font-bold text-slate-900">%</span>
        )}
      </div>

      <div className={`mt-2 text-xs font-semibold ${subColor}`}>{subValue}</div>
    </Card>
  );
}
