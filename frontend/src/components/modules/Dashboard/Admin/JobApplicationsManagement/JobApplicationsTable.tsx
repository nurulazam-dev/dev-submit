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
import { IJobApplicationPayload } from "@/types/jobApplication.type";
import { getAllJobApplicationsService } from "@/services/jobApplications.services";
import UpdateJobApplicationModal from "./UpdateJobApplicationModal";
import ViewJobApplicationModal from "./ViewJobApplicationModal";
import { jobApplicationsColumns } from "./jobApplicationsColumns";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const JOB_APPLICATION_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
];

export default function JobApplicationsTable({
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
  } = useRowActionModalState<IJobApplicationPayload>({
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
      definitions: JOB_APPLICATION_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: jobApplicationsDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["job-applications", queryString],
    queryFn: () => getAllJobApplicationsService(queryString),
    placeholderData: (previousData) => previousData,
  });
  const jobApplications = Array.isArray(jobApplicationsDataResponse?.data?.data)
    ? jobApplicationsDataResponse.data.data
    : [];

  // console.log("jobApplicationsDataResponse===", jobApplicationsDataResponse);

  const meta: PaginationMeta | undefined =
    jobApplicationsDataResponse?.data?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "status",
        label: "Active Status",
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
        data={jobApplications}
        columns={jobApplicationsColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No job applications found."
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
          placeholder: "Search job application by userId or appId...",
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
      <UpdateJobApplicationModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        jobApplication={editingItem}
      />
      <ViewJobApplicationModal
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        jobApplication={viewingItem}
      />
    </>
  );
}
