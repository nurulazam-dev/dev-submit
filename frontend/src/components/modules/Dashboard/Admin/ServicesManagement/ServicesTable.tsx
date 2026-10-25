"use client";

import DataTable from "@/components/shared/table/DataTable";
import {
  DataTableFilterConfig,
  DataTableFilterValues,
} from "@/components/shared/table/DataTableFilters";
import { useRowActionModalState } from "@/hooks/useRowActionModalState";
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable";
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters";
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDataTableSearch";
import { getAllServices } from "@/services/servicesData.services";
import { PaginationMeta } from "@/types/api.types";
import { useSearchParams } from "next/navigation";
import { IServicePayload } from "@/types/service.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import CreateServiceModal from "./CreateServiceModal";
import EditServiceModal from "./EditServiceModal";
import ViewServiceModel from "./ViewServiceModel";
import { servicesColumns } from "./servicesColumns";
import DeleteServiceDialog from "./DeleteServiceDialog";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const SERVICE_FILTER_DEFINITIONS = [serverManagedFilter.single("isActive")];

export default function ServicesTable({
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
  } = useRowActionModalState<IServicePayload>({
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
      definitions: SERVICE_FILTER_DEFINITIONS,
      updateParams,
    });

  const {
    data: serviceDataResponse,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["services", queryString],
    queryFn: () => getAllServices(queryString),
  });

  const servicesData = Array.isArray(serviceDataResponse?.data)
    ? serviceDataResponse.data
    : [];

  const meta: PaginationMeta | undefined =
    serviceDataResponse?.meta ?? undefined;

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
    ];
  }, []);

  const filterValuesForTable = useMemo<DataTableFilterValues>(() => {
    return {
      isActive: filterValues.isActive || "",
    };
  }, [filterValues]);

  return (
    <>
      <DataTable
        data={servicesData}
        columns={servicesColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No services found."
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
          placeholder: "Search service by name...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        filters={{
          configs: filterConfigs,
          values: filterValuesForTable,
          onFilterChange: handleFilterChange,
          onClearAll: clearAllFilters,
        }}
        toolbarAction={<CreateServiceModal />}
        meta={meta}
        actions={tableActions}
      />
      <EditServiceModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        service={editingItem}
      />
      <DeleteServiceDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        service={deletingItem}
      />
      <ViewServiceModel
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        service={viewingItem}
      />
    </>
  );
}
