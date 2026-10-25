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
import { usersColumns } from "./usersColumns";
import { getAllUsers } from "@/services/users.services";
import { IUserPayload } from "@/types/users.type";
import CreateStaffModal from "./CreateStaffModal";
import ViewUserProfileModel from "./ViewUserProfileModel";
import AdminEditUserProfileModal from "./AdminEditUserProfileModal";
import AdminDeleteUserDialog from "./AdminDeleteUserDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const USER_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
  serverManagedFilter.multi("role"),
];

export default function UsersTable({
  initialQueryString,
}: {
  initialQueryString: string;
}) {
  const searchParams = useSearchParams();
  const {
    viewingItem,
    editingItem,
    deletingItem,
    isDeleteDialogOpen,
    onDeleteOpenChange,
    isViewDialogOpen,
    isEditModalOpen,
    onViewOpenChange,
    onEditOpenChange,
    tableActions,
  } = useRowActionModalState<IUserPayload>({
    enableView: true,
    enableEdit: true,
    enableDelete: true,
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
    queryKey: ["users", queryString],
    queryFn: () => getAllUsers(queryString),
  });

  // const users = userDataResponse?.data ?? [];
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
      {
        id: "role",
        label: "User Role",
        type: "multi-select",
        options: [
          { label: "Admin", value: "ADMIN" },
          { label: "Manager", value: "MANAGER" },
          { label: "Provider", value: "SERVICE_PROVIDER" },
          { label: "Customer", value: "CUSTOMER" },
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
        columns={usersColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No users found."
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
          placeholder: "Search user by name, email...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        toolbarAction={<CreateStaffModal />}
        meta={meta}
        actions={tableActions}
      />
      <AdminEditUserProfileModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        user={editingItem}
      />
      <AdminDeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        user={deletingItem}
      />
      <ViewUserProfileModel
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        user={viewingItem}
      />
    </>
  );
}
