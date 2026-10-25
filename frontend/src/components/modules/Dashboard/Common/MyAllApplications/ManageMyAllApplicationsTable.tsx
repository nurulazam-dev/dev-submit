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
import { PaginationMeta } from "@/types/api.types";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import ViewMyApplicationByIdModal from "./ViewMyApplicationByIdModal";
import { IJobApplicationPayload } from "@/types/jobApplication.type";
import { getMyAllJobApplicationsService } from "@/services/jobApplications.services";
import { myApplicationsColumns } from "./myApplicationsColumns";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SERVICE_REQUEST_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
];

export default function ManageMyAllApplicationsTable({
  initialQueryString,
}: {
  initialQueryString: string;
}) {
  const searchParams = useSearchParams();
  const { viewingItem, isViewDialogOpen, onViewOpenChange, tableActions } =
    useRowActionModalState<IJobApplicationPayload>({
      enableView: true,
      enableEdit: false,
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
      definitions: SERVICE_REQUEST_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: applicationDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["my-applications", queryString],
    queryFn: () => getMyAllJobApplicationsService(queryString),
  });

  const applications = Array.isArray(applicationDataResponse?.data)
    ? applicationDataResponse.data
    : [];

  const meta: PaginationMeta | undefined =
    applicationDataResponse?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "status",
        label: "Application Status",
        type: "single-select",
        options: [
          { label: "Pending", value: "PENDING" },
          { label: "Accepted", value: "ACCEPTED" },
          { label: "Rejected", value: "REJECTED" },
        ],
      },
    ];
  }, []);

  const filterValuesForTable = useMemo<DataTableFilterValues>(() => {
    return {
      status: filterValues.status || "",
    };
  }, [filterValues]);

  return (
    <>
      <DataTable
        data={applications}
        columns={myApplicationsColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No application found."
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
          placeholder: "Search application by ID...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        meta={meta}
        actions={tableActions}
      />
      <ViewMyApplicationByIdModal
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        application={viewingItem}
      />
    </>
  );
}
