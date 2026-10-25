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
import { IServiceRequestPayload } from "@/types/serviceRequest.type";
import { getMyAllServiceRequestByCustomerService } from "@/services/serviceRequest.services";
import { myServiceRequestsCustomerColumns } from "./myServiceRequestsCustomerColumns";
import ViewServiceRequestByCustomerModal from "./ViewServiceRequestByCustomerModal";
import CancelServiceRequestDialog from "./CancelServiceRequestDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SERVICE_REQUEST_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status"),
];

export default function MyAllSRsByCustomerTable({
  initialQueryString,
}: {
  initialQueryString: string;
}) {
  const searchParams = useSearchParams();
  const {
    viewingItem,
    deletingItem,
    isDeleteDialogOpen,
    onDeleteOpenChange,
    isViewDialogOpen,
    onViewOpenChange,
    tableActions,
  } = useRowActionModalState<IServiceRequestPayload>({
    enableView: true,
    enableEdit: false,
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
      definitions: SERVICE_REQUEST_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: mySRsCustomerDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["my-service-requests-customer", queryString],
    queryFn: () => getMyAllServiceRequestByCustomerService(queryString),
  });

  const myServiceRequests = Array.isArray(mySRsCustomerDataResponse?.data)
    ? mySRsCustomerDataResponse.data
    : [];

  const meta: PaginationMeta | undefined =
    mySRsCustomerDataResponse?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "status",
        label: "Service Requests Status",
        type: "single-select",
        options: [
          { label: "Pending", value: "PENDING" },
          { label: "Accepted", value: "ACCEPTED" },
          { label: "Rejected", value: "REJECTED" },
          { label: "Completed", value: "COMPLETED" },
          { label: "Cancelled", value: "CANCELLED" },
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
        data={myServiceRequests}
        columns={myServiceRequestsCustomerColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No service requests found."
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
          placeholder: "Search service request by SR ID...",
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
      <CancelServiceRequestDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        myServiceRequest={deletingItem}
      />
      <ViewServiceRequestByCustomerModal
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        myServiceRequest={viewingItem}
      />
    </>
  );
}
