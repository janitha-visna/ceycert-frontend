import { FolderSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <Card className="mx-auto mt-16 max-w-md border-dashed bg-white">
      <CardContent className="flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-5 rounded-full bg-slate-100 p-4">
          <FolderSearch className="h-9 w-9 text-slate-400" />
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          No client files found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try changing the search keyword, scheme, or status filter.
        </p>

        <Button variant="outline" className="mt-6" onClick={onClearFilters}>
          Clear filters
        </Button>
      </CardContent>
    </Card>
  );
}
