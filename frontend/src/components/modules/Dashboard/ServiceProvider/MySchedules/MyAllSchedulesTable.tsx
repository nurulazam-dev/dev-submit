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
import { myScheduleColumns } from "./myScheduleColumns";
import { IServiceSchedulePayload } from "@/types/schedule.type";
import { getMyAllSchedulesService } from "@/services/serviceSchedules.services";
import ViewMyScheduleModal from "./ViewMyScheduleModal";
import CreateServiceScheduleModal from "./CreateServiceScheduleModal";
// import CancelServiceRequestDialog from "./CancelServiceRequestDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SCHEDULE_FILTER_DEFINITIONS = [serverManagedFilter.single("isBooked")];

export default function MyAllSchedulesTable({
  initialQueryString,
}: {
  initialQueryString: string;
}) {
  const searchParams = useSearchParams();
  const {
    viewingItem,
    // deletingItem,
    // isDeleteDialogOpen,
    // onDeleteOpenChange,
    isViewDialogOpen,
    onViewOpenChange,
    tableActions,
  } = useRowActionModalState<IServiceSchedulePayload>({
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
      definitions: SCHEDULE_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: mySchedulesDataRes,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["my-schedules", queryString],
    queryFn: () => getMyAllSchedulesService(queryString),
  });

  const mySchedules = Array.isArray(mySchedulesDataRes?.data?.data)
    ? mySchedulesDataRes.data?.data
    : [];

  const meta: PaginationMeta | undefined =
    mySchedulesDataRes?.data?.meta ?? undefined;

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => {
    return [
      {
        id: "isBooked",
        label: "Booking Status",
        type: "single-select",
        options: [
          { label: "Available", value: "false" },
          { label: "Booked", value: "true" },
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
        data={mySchedules}
        columns={myScheduleColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No schedules found."
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
          placeholder: "Search schedule by ID...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        toolbarAction={<CreateServiceScheduleModal />}
        meta={meta}
        actions={tableActions}
      />
      {/* <CancelServiceRequestDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        myServiceRequest={deletingItem}
      /> */}

      <ViewMyScheduleModal
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        mySchedule={viewingItem}
      />
    </>
  );
}
