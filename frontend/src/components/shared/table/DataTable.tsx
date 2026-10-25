"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaginationMeta } from "@/types/api.types";
import {
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  stockFeatures,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  PaginationState,
  RowData,
  SortingState,
  StockFeatures,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import DataTableFilters, {
  type DataTableFilterConfig,
  type DataTableFilterValue,
  type DataTableFilterValues,
} from "./DataTableFilters";
import DataTablePagination from "./DataTablePagination";
import DataTableSearch from "./DataTableSearch";

interface DataTableActions<TData> {
  onView?: (data: TData) => void;
  onEdit?: (data: TData) => void;
  onDelete?: (data: TData) => void;
}

interface DataTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<StockFeatures, TData>[];
  actions?: DataTableActions<TData>;
  toolbarAction?: React.ReactNode;
  emptyMessage?: string;
  isLoading?: boolean;
  sorting?: {
    state: SortingState;
    onSortingChange: (state: SortingState) => void;
  };
  pagination?: {
    state: PaginationState;
    onPaginationChange: (state: PaginationState) => void;
  };
  search?: {
    initialValue?: string;
    placeholder?: string;
    debounceMs?: number;
    onDebouncedChange: (value: string) => void;
  };
  filters?: {
    configs: DataTableFilterConfig[];
    values: DataTableFilterValues;
    onFilterChange: (
      filterId: string,
      value: DataTableFilterValue | undefined,
    ) => void;
    onClearAll?: () => void;
  };
  meta?: PaginationMeta;
}

const dataTableFeatures = tableFeatures({
  ...stockFeatures,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
});

const DataTable = <TData extends RowData>({
  data = [],
  columns,
  actions,
  toolbarAction,
  emptyMessage,
  isLoading,
  sorting,
  pagination,
  search,
  filters,
  meta,
}: DataTableProps<TData>) => {
  const showLoadingOverlay = Boolean(isLoading);

  const tableColumns: ColumnDef<StockFeatures, TData>[] = actions
    ? [
        ...columns,
        {
          id: "actions",
          header: "Actions",
          enableSorting: false,
          cell: ({ row }) => {
            const rowData = row.original;

            return (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open Menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  }
                />

                <DropdownMenuContent align="end">
                  {actions.onView && (
                    <DropdownMenuItem onClick={() => actions.onView?.(rowData)}>
                      View
                    </DropdownMenuItem>
                  )}

                  {actions.onEdit && (
                    <DropdownMenuItem onClick={() => actions.onEdit?.(rowData)}>
                      Edit
                    </DropdownMenuItem>
                  )}

                  {actions.onDelete && (
                    <DropdownMenuItem
                      onClick={() => actions.onDelete?.(rowData)}
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        },
      ]
    : columns;

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns: tableColumns,

    manualSorting: Boolean(sorting),
    manualPagination: Boolean(pagination),

    pageCount: pagination ? Math.max(meta?.totalPages ?? 0, 0) : undefined,

    state: {
      ...(sorting ? { sorting: sorting.state } : {}),
      ...(pagination ? { pagination: pagination.state } : {}),
    },

    onSortingChange: sorting
      ? (updater) => {
          const nextSortingState =
            typeof updater === "function" ? updater(sorting.state) : updater;

          sorting.onSortingChange(nextSortingState);
        }
      : undefined,

    onPaginationChange: pagination
      ? (updater) => {
          const nextPaginationState =
            typeof updater === "function" ? updater(pagination.state) : updater;

          pagination.onPaginationChange(nextPaginationState);
        }
      : undefined,
  });

  return (
    <div className="relative">
      {showLoadingOverlay && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}

      {(search || filters || toolbarAction) && (
        <div className="mb-4 flex flex-wrap items-start gap-3">
          {search && (
            <DataTableSearch
              key={search.initialValue ?? ""}
              initialValue={search.initialValue}
              placeholder={search.placeholder}
              debounceMs={search.debounceMs}
              onDebouncedChange={search.onDebouncedChange}
              isLoading={isLoading}
            />
          )}

          {filters && (
            <DataTableFilters
              filters={filters.configs}
              values={filters.values}
              onFilterChange={filters.onFilterChange}
              onClearAll={filters.onClearAll}
              isLoading={isLoading}
            />
          )}

          {toolbarAction && (
            <div className="ml-auto shrink-0">{toolbarAction}</div>
          )}
        </div>
      )}

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <Button
                        variant="ghost"
                        className="h-auto cursor-pointer p-0 font-semibold hover:bg-transparent hover:text-inherit focus-visible:ring-0"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="ml-1 h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="ml-1 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-1 h-4 w-4 opacity-50" />
                        )}
                      </Button>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={tableColumns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage || "No data available."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {pagination && (
          <DataTablePagination
            table={table}
            pagination={pagination.state}
            totalPages={meta?.totalPages}
            totalRows={meta?.total}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;
