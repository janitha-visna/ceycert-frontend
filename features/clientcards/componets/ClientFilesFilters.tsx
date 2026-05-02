import { Search, Filter, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SCHEMES, STATUSES } from "../constants/client";
import { Scheme, ClientStatus } from "../types/client";

interface ClientFilesFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedScheme: Scheme | "all";
  setSelectedScheme: (val: Scheme | "all") => void;
  selectedStatus: ClientStatus | "all";
  setSelectedStatus: (val: ClientStatus | "all") => void;
  onReset: () => void;
}

export function ClientFilesFilters({
  searchQuery,
  setSearchQuery,
  selectedScheme,
  setSelectedScheme,
  selectedStatus,
  setSelectedStatus,
  onReset,
}: ClientFilesFiltersProps) {
  return (
    <section className="px-8 py-5 bg-white border-b border-slate-200 flex flex-col md:flex-row items-center gap-4">
      {/* Search Bar */}
      <div className="relative flex-grow w-full md:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
        <Input
          placeholder="Search by organization, folder, or scheme..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 h-10 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* Filters Container */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* Scheme Select */}
        <Select
          value={selectedScheme}
          onValueChange={(val) => setSelectedScheme(val as Scheme | "all")}
        >
          <SelectTrigger className="w-[140px] h-10 bg-white border-slate-200 rounded-lg text-sm text-slate-600 shadow-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="All Schemes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Schemes</SelectItem>
            {SCHEMES.map((scheme) => (
              <SelectItem key={scheme} value={scheme}>
                {scheme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Select */}
        <Select
          value={selectedStatus}
          onValueChange={(val) =>
            setSelectedStatus(val as ClientStatus | "all")
          }
        >
          <SelectTrigger className="w-[140px] h-10 bg-white border-slate-200 rounded-lg text-sm text-slate-600 shadow-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 border border-transparent hover:border-slate-200"
          onClick={onReset}
          title="Reset Filters"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
