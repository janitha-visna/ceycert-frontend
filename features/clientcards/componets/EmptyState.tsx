import { FolderX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <div className="bg-slate-100 p-6 rounded-2xl mb-6">
        <FolderX className="h-10 w-10 text-slate-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 tracking-tight">
        No results found
      </h3>
      <p className="text-slate-500 max-w-sm mb-8 mt-2 text-sm leading-relaxed">
        We couldn't find any client files matching your current search or filter
        criteria. Try adjusting your filters.
      </p>
      <Button
        onClick={onClearFilters}
        variant="outline"
        className="h-10 px-6 rounded-lg text-sm border-slate-200 hover:bg-slate-50 text-slate-600"
      >
        Clear all filters
      </Button>
    </div>
  );
}
