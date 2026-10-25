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
import { IPaymentPayload } from "@/types/payment.type";
import { getAllPaymentsService } from "@/services/payment.services";
import ViewPaymentByIdModal from "./ViewPaymentByIdModal";
import { allPaymentsColumns } from "./allPaymentsColumns";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const PAYMENT_FILTER_DEFINITIONS = [serverManagedFilter.single("status")];

export default function AllPaymentsTable({
  initialQueryString,
}: {
  initialQueryString: string;
}) {
  const searchParams = useSearchParams();
  const { viewingItem, isViewDialogOpen, onViewOpenChange, tableActions } =
    useRowActionModalState<IPaymentPayload>({
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
      definitions: PAYMENT_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: paymentDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["payments", queryString],
    queryFn: () => getAllPaymentsService(queryString),
  });

  const payments = Array.isArray(paymentDataResponse?.data)
    ? paymentDataResponse.data
    : [];

  const meta: PaginationMeta | undefined =
    paymentDataResponse?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "status",
        label: "Payment Status",
        type: "single-select",
        options: [
          { label: "Pending", value: "PENDING" },
          { label: "Paid", value: "PAID" },
          { label: "Unpaid", value: "UNPAID" },
          { label: "Failed", value: "FAILED" },
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
        data={payments}
        columns={allPaymentsColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No payments found."
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
          placeholder: "Search by Transaction ID...",
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
      <ViewPaymentByIdModal
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        payment={viewingItem}
      />
    </>
  );
}
