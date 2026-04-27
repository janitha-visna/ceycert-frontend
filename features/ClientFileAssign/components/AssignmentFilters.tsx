import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface AssignmentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterStandard: string;
  onStandardChange: (value: string) => void;
  filterStatus: string;
  onStatusChange: (value: string) => void;
}

export function AssignmentFilters({
  searchQuery,
  onSearchChange,
  filterStandard,
  onStandardChange,
  filterStatus,
  onStatusChange,
}: AssignmentFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border-b border-slate-100 dark:border-slate-900 bg-slate-50/30 dark:bg-slate-900/10">
      <div className="relative flex-1 w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Filter clients by name..."
          className="pl-9 h-10 border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 focus-visible:ring-1 focus-visible:ring-slate-400"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-3 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
        <Select value={filterStandard} onValueChange={onStandardChange}>
          <SelectTrigger className="w-full sm:w-[160px] h-10 border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950">
            <SelectValue placeholder="All Standards" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-xl">
            <SelectItem value="all">All Standards</SelectItem>
            <SelectItem value="ISO 9001">ISO 9001</SelectItem>
            <SelectItem value="ISO 14001">ISO 14001</SelectItem>
            <SelectItem value="ISO 22000">ISO 22000</SelectItem>
            <SelectItem value="ISO 27001">ISO 27001</SelectItem>
            <SelectItem value="ISO 45001">ISO 45001</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-[140px] h-10 border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950">
            <SelectValue placeholder="Any Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-xl">
            <SelectItem value="all">Status: All</SelectItem>
            <SelectItem value="assigned">Active</SelectItem>
            <SelectItem value="unassigned">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
