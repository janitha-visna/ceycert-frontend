import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export function AssignmentFilters({
  searchQuery,
  onSearchChange,
  filterStandard,
  onStandardChange,
  filterStatus,
  onStatusChange,
}: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 border-b bg-muted/30">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search clients..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Select value={filterStandard} onValueChange={onStandardChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="ISO Standard" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ISO 9001">ISO 9001</SelectItem>
            <SelectItem value="ISO 27001">ISO 27001</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="assigned">Active</SelectItem>
            <SelectItem value="unassigned">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
