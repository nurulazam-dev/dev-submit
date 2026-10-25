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
import { IJobPostPayload } from "@/types/jobPost.type";
import { jobPostsColumns } from "./jobPostsColumns";
import CreateJobPostModal from "./CreateJobPostModal";
import DeleteJobPostDialog from "./DeleteJobPostDialog";
import ViewJobPostModal from "./ViewJobPostModal";
import UpdateJobPostModal from "./UpdateJobPostModal";
import { getAllJobPostsService } from "@/services/jobPosts.services";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const JOB_POST_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
  serverManagedFilter.multi("role"),
];

export default function JobPostsTable({
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
  } = useRowActionModalState<IJobPostPayload>({
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
      definitions: JOB_POST_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: jobPostsDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["job-posts", queryString],
    queryFn: () => getAllJobPostsService(queryString),
  });

  const jobPosts = Array.isArray(jobPostsDataResponse?.data)
    ? jobPostsDataResponse.data
    : [];

  const meta: PaginationMeta | undefined =
    jobPostsDataResponse?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "isActive",
        label: "Active Status",
        type: "single-select",
        options: [
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" },
        ],
      },
      {
        id: "vacancy",
        label: "Vacancy",
        type: "single-select",
        options: [
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
        ],
      },
      {
        id: "serviceType",
        label: "Service Type",
        type: "multi-select",
        options: [
          { label: "Plumbing", value: "plumbing" },
          { label: "Electrical", value: "electrical" },
          { label: "Cleaning", value: "cleaning" },
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
        data={jobPosts}
        columns={jobPostsColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No job posts found."
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
          placeholder: "Search job posts...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        toolbarAction={<CreateJobPostModal />}
        meta={meta}
        actions={tableActions}
      />
      <UpdateJobPostModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        jobPost={editingItem}
      />
      <DeleteJobPostDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        jobPost={deletingItem}
      />
      <ViewJobPostModal
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        jobPost={viewingItem}
      />
    </>
  );
}
