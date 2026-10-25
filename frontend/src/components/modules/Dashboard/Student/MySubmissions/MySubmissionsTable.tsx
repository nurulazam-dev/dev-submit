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
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import type { PaginationMeta } from "@/types/api.types";
import type { ISubmissionPayload } from "@/types/submission.type";
import { getMySubmissions } from "@/services/submission.services";
import { mySubmissionsColumns } from "./mySubmissionsColumns";
import ViewSubmissionModal from "./ViewSubmissionModal";
import ApplySubmissionModal from "./ApplySubmissionModal";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

const SUBMISSION_FILTER_DEFINITIONS = [serverManagedFilter.single("status")];

interface MySubmissionsTableProps {
  initialQueryString: string;
  studentId: string;
}

export default function MySubmissionsTable({
  initialQueryString,
  studentId,
}: MySubmissionsTableProps) {
  const searchParams = useSearchParams();

  const { viewingItem, isViewDialogOpen, onViewOpenChange, tableActions } =
    useRowActionModalState<ISubmissionPayload>({
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
      definitions: SUBMISSION_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: mySubmissionsDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["my-submissions", queryString],
    queryFn: () => getMySubmissions(queryString),
  });

  const mySubmissions: ISubmissionPayload[] = Array.isArray(
    mySubmissionsDataResponse?.data,
  )
    ? mySubmissionsDataResponse.data
    : [];

  const meta: PaginationMeta | undefined =
    mySubmissionsDataResponse?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(
    () => [
      {
        id: "status",
        label: "Submission Status",
        type: "single-select",
        options: [
          { label: "Pending", value: "PENDING" },
          { label: "Approved", value: "APPROVED" },
          { label: "Rejected", value: "REJECTED" },
        ],
      },
    ],
    [],
  );

  const filterValuesForTable = useMemo<DataTableFilterValues>(
    () => ({
      status: filterValues.status || "",
    }),
    [filterValues],
  );

  // The modal requires a submission object. Use an existing submission
  // as the context for now; if this button creates a brand-new submission,
  // update ApplySubmissionModal to accept studentId only.
  const submissionForModal = mySubmissions[0];

  return (
    <>
      <DataTable
        data={mySubmissions}
        columns={mySubmissionsColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No submissions found."
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
          placeholder: "Search submission...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        toolbarAction={
          submissionForModal ? (
            <ApplySubmissionModal
              studentId={studentId}
              submission={submissionForModal}
            />
          ) : null
        }
        meta={meta}
        actions={tableActions}
      />

      <ViewSubmissionModal
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        mySubmission={viewingItem}
      />
    </>
  );
}
