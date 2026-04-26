// features/folderview/hooks/useFolderSearch.ts

import { useMemo, useState } from "react";
import { FileItem } from "../mockData";

export function useFolderSearch(items: FileItem[]) {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return items
      .filter((i) => !i.isDeleted)
      .filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 8);
  }, [items, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
  };
}
