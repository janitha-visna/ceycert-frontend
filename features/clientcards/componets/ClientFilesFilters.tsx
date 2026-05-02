import { RotateCcw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SCHEMES, STATUSES } from "../constants/client";
import { ClientStatus, Scheme } from "../types/client";

interface ClientFilesFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedScheme: Scheme | "all";
  setSelectedScheme: (value: Scheme | "all") => void;
  selectedStatus: ClientStatus | "all";
  setSelectedStatus: (value: ClientStatus | "all") => void;
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
    <section className="border-b bg-white px-6 py-4 lg:px-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search organization, folder, or scheme..."
            className="pl-9"
          />
        </div>

        <Select
          value={selectedScheme}
          onValueChange={(value) => setSelectedScheme(value as Scheme | "all")}
        >
          <SelectTrigger className="w-full md:w-[170px]">
            <SelectValue placeholder="Scheme" />
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

        <Select
          value={selectedStatus}
          onValueChange={(value) =>
            setSelectedStatus(value as ClientStatus | "all")
          }
        >
          <SelectTrigger className="w-full md:w-[160px]">
            <SelectValue placeholder="Status" />
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

        <Button variant="outline" size="icon" onClick={onReset}>
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
}
