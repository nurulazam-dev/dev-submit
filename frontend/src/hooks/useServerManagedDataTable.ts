"use client";

import type { PaginationState, SortingState } from "@tanstack/react-table";
import {
  type ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";

interface UseServerManagedDataTableParams {
  searchParams: ReadonlyURLSearchParams;
  defaultPage?: number;
  defaultLimit?: number;
}

export interface UpdateParamsOptions {
  resetPage?: boolean;
}

export type UpdateParamsFn = (
  updater: (params: URLSearchParams) => void,
  options?: UpdateParamsOptions,
) => void;

const parsePositiveInteger = (
  value: string | null,
  fallbackValue: number,
): number => {
  if (!value) {
    return fallbackValue;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    return fallbackValue;
  }

  return parsed;
};

export const useServerManagedDataTable = ({
  searchParams,
  defaultPage = 1,
  defaultLimit = 10,
}: UseServerManagedDataTableParams) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isRouteRefreshPending, startRouteRefreshTransition] = useTransition();

  const queryStringFromUrl = useMemo(
    () => searchParams.toString(),
    [searchParams],
  );

  const paginationStateFromUrl = useMemo<PaginationState>(() => {
    const page = parsePositiveInteger(searchParams.get("page"), defaultPage);

    const limit = parsePositiveInteger(searchParams.get("limit"), defaultLimit);

    return {
      pageIndex: page - 1,
      pageSize: limit,
    };
  }, [defaultPage, defaultLimit, queryStringFromUrl]);

  const sortingStateFromUrl = useMemo<SortingState>(() => {
    const sortBy = searchParams.get("sortBy");
    const sortOrder = searchParams.get("sortOrder");

    if (!sortBy || (sortOrder !== "asc" && sortOrder !== "desc")) {
      return [];
    }

    return [
      {
        id: sortBy,
        desc: sortOrder === "desc",
      },
    ];
  }, [queryStringFromUrl]);

  // Keep only local changes that have not yet been reflected in the URL.
  const [optimisticSorting, setOptimisticSorting] = useState<{
    query: string;
    state: SortingState;
  } | null>(null);

  const [optimisticPagination, setOptimisticPagination] = useState<{
    query: string;
    state: PaginationState;
  } | null>(null);

  const optimisticSortingState =
    optimisticSorting?.query === queryStringFromUrl
      ? optimisticSorting.state
      : sortingStateFromUrl;

  const optimisticPaginationState =
    optimisticPagination?.query === queryStringFromUrl
      ? optimisticPagination.state
      : paginationStateFromUrl;

  const updateUrlAndRefresh = useCallback(
    (params: URLSearchParams) => {
      const nextQuery = params.toString();
      const currentQuery = window.location.search.replace(/^\?/, "");

      if (nextQuery === currentQuery) {
        return;
      }

      const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

      // Update the URL immediately for responsive navigation.
      window.history.pushState(null, "", nextUrl);

      startRouteRefreshTransition(() => {
        router.refresh();
      });
    },
    [pathname, router],
  );

  const updateParams = useCallback<UpdateParamsFn>(
    (updater, options) => {
      const params = new URLSearchParams(window.location.search);

      updater(params);

      if (options?.resetPage) {
        params.set("page", "1");
      }

      updateUrlAndRefresh(params);
    },
    [updateUrlAndRefresh],
  );

  const handleSortingChange = useCallback(
    (state: SortingState) => {
      const params = new URLSearchParams(window.location.search);

      const nextSorting = state[0];

      if (nextSorting) {
        params.set("sortBy", nextSorting.id);
        params.set("sortOrder", nextSorting.desc ? "desc" : "asc");
      } else {
        params.delete("sortBy");
        params.delete("sortOrder");
      }

      // Reset the page when sorting changes.
      params.set("page", "1");

      const nextQuery = params.toString();

      setOptimisticSorting({
        query: nextQuery,
        state,
      });

      setOptimisticPagination({
        query: nextQuery,
        state: {
          pageIndex: 0,
          pageSize: optimisticPaginationState.pageSize,
        },
      });

      updateUrlAndRefresh(params);
    },
    [optimisticPaginationState.pageSize, updateUrlAndRefresh],
  );

  const handlePaginationChange = useCallback(
    (state: PaginationState) => {
      const params = new URLSearchParams(window.location.search);

      params.set("page", String(state.pageIndex + 1));
      params.set("limit", String(state.pageSize));

      const nextQuery = params.toString();

      setOptimisticPagination({
        query: nextQuery,
        state,
      });

      updateUrlAndRefresh(params);
    },
    [updateUrlAndRefresh],
  );

  return {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  };
};
