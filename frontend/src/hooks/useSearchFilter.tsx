// useSearchFilter.ts
import { useState } from "react";

interface SearchFilterOptions<T> {
  initialSearchTerm?: string;
  initialStatusFilter?: "All" | "Active" | "Inactive" | "Pending";
  initialRoleFilter?: string;
  availableRoles: string[];
  filterFunction: (
    items: T[],
    searchTerm: string,
    statusFilter: "All" | "Active" | "Inactive" | "Pending",
    roleFilter: string
  ) => T[];
}

export function useSearchFilter<T>({
  initialSearchTerm = "",
  initialStatusFilter = "All",
  initialRoleFilter = "All",
  availableRoles,
  filterFunction,
}: SearchFilterOptions<T>) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive" | "Pending"
  >(initialStatusFilter);
  const [roleFilter, setRoleFilter] = useState(initialRoleFilter);

  const filterItems = (items: T[]) => {
    return filterFunction(items, searchTerm, statusFilter, roleFilter);
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    availableRoles,
    filterItems,
  };
}
