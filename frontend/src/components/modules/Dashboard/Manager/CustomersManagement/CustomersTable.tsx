"use client";

import DataTable from "@/components/shared/table/DataTable";
import {
  DataTableFilterConfig,
  DataTableFilterValues,
} from "@/components/shared/table/DataTableFilters";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { PaginationMeta } from "@/types/api.types";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { customersColumns } from "./customersColumns";
import { getAllCustomers } from "@/services/users.services";
import { IUserPayload } from "@/types/users.type";
import ViewUserProfileModel from "../../Admin/UsersManagement/ViewUserProfileModel";
import ManagerEditUserProfileModal from "./ManagerEditUserProfileModal";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const USER_FILTER_DEFINITIONS = [serverManagedFilter.single("status")];

export default function CustomersTable({
  initialQueryString,
}: {
  initialQueryString: string;
}) {
  const searchParams = useSearchParams();
  const {
    viewingItem,
    editingItem,
    isViewDialogOpen,
    isEditModalOpen,
    onViewOpenChange,
    onEditOpenChange,
    tableActions,
  } = useRowActionModalState<IUserPayload>({
    enableView: true,
    enableEdit: true,
    enableDelete: false,
  });

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  });

  const queryString = queryStringFromUrl || initialQueryString;

  const { searchTermFromUrl, handleDebouncedSearchChange } =
    useServerManagedDataTableSearch({
      searchParams,
      updateParams,
    });

  const { filterValues, handleFilterChange, clearAllFilters } =
    useServerManagedDataTableFilters({
      searchParams,
      definitions: USER_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: userDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["customers", queryString],
    queryFn: () => getAllCustomers(queryString),
  });

  const users = Array.isArray(userDataResponse?.data)
    ? userDataResponse.data
    : [];

  const meta: PaginationMeta | undefined = userDataResponse?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "status",
        label: "Status",
        type: "single-select",
        options: [
          { label: "Active", value: "ACTIVE" },
          { label: "Blocked", value: "BLOCKED" },
          { label: "Deleted", value: "DELETED" },
          { label: "Other", value: "OTHER" },
        ],
      },
    ];
  }, []);

  const filterValuesForTable = useMemo<DataTableFilterValues>(() => {
    return {
      status: filterValues.status || "",
      role: filterValues.role || [],
    };
  }, [filterValues]);

  return (
    <>
      <DataTable
        data={users}
        columns={customersColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No customers found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search customer by name, email...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        // toolbarAction={<CreateStaffModal />}
        meta={meta}
        actions={tableActions}
      />
      <ManagerEditUserProfileModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        user={editingItem}
      />
      <ViewUserProfileModel
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        user={viewingItem}
      />
    </>
  );
}
