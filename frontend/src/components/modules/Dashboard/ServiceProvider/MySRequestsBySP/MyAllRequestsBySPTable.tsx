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
import { getMyAllRequestsBySPService } from "@/services/serviceRequest.services";
import { mySRequestsBySPColumns } from "./mySRequestsBySPColumns";
import ViewServiceRequestBySPModal from "./ViewServiceRequestBySPModal";
import UpdateServiceRequestBySPDialog from "./UpdateServiceRequestBySPDialog";
// import { getMyAllServiceRequestByCustomerService } from "@/services/serviceRequest.services";
// import { myServiceRequestsCustomerColumns } from "./myServiceRequestsCustomerColumns";
// import ViewServiceRequestByCustomerModal from "./ViewServiceRequestByCustomerModal";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SERVICE_REQUEST_FILTER_DEFINITIONS = [
  serverManagedFilter.single("status", "paymentStatus"),
];

export default function MyAllRequestsBySPTable({
  initialQueryString,
}: {
  initialQueryString: string;
}) {
  const searchParams = useSearchParams();
  const {
    viewingItem,
    isViewDialogOpen,
    onViewOpenChange,
    editingItem,
    isEditModalOpen,
    onEditOpenChange,
    tableActions,
  } = useRowActionModalState<IServiceRequestPayload>({
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
      definitions: SERVICE_REQUEST_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: mySRsSPDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["my-requests-sp", queryString],
    queryFn: () => getMyAllRequestsBySPService(queryString),
  });

  const mySRequests = Array.isArray(mySRsSPDataResponse?.data?.data)
    ? mySRsSPDataResponse?.data?.data
    : [];

  const meta: PaginationMeta | undefined =
    mySRsSPDataResponse?.data?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "status",
        label: "Service Requests Status",
        type: "single-select",
        options: [
          { label: "Accepted", value: "ACCEPTED" },
          { label: "Completed", value: "COMPLETED" },
        ],
      },
      {
        id: "paymentStatus",
        label: "Payment Status",
        type: "single-select",
        options: [
          { label: "Pending", value: "PENDING" },
          { label: "Paid", value: "PAID" },
          { label: "Unpaid", value: "UNPAID" },
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
        data={mySRequests}
        columns={mySRequestsBySPColumns}
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
      <UpdateServiceRequestBySPDialog
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        mySRequest={editingItem}
      />
      <ViewServiceRequestBySPModal
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        mySRequest={viewingItem}
      />
    </>
  );
}
