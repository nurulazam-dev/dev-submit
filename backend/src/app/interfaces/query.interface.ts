export type TExpr = any;
export type TFieldProxy = Record<string, any>;

export type TWhereArg =
  Record<string, unknown> | ((fields: TFieldProxy) => TExpr);

export type TOrderArg = (fields: TFieldProxy) => TExpr;

export type TIncludeRefiner = (
  collection: IQueryCollection,
) => IQueryCollection;

export type TIncludeConfig = Record<string, true | TIncludeRefiner>;

export interface IQueryCollection {
  where(condition: TWhereArg): IQueryCollection;
  select(...fields: string[]): IQueryCollection;
  include(relation: string, refine?: TIncludeRefiner): IQueryCollection;
  orderBy(order: TOrderArg | TOrderArg[]): IQueryCollection;
  limit(count: number): IQueryCollection;
  offset(count: number): IQueryCollection;
  all(): PromiseLike<any[]>;
  aggregate(
    builder: (a: any) => Record<string, any>,
  ): PromiseLike<Record<string, any>>;
}

export interface IQueryParams {
  searchTerm?: string;
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  fields?: string;
  include?: string;
  [key: string]: unknown;
}

export type TFieldType = "string" | "number" | "boolean" | "date";

export interface IQueryConfig {
  searchableFields?: string[];
  filterableFields?: string[];
  sortableFields?: string[];
  defaultSelect?: string[];
  defaultSortBy?: string;
  tieBreakerField?: string | null;
  maxLimit?: number;
  blockedFields?: string[];
  fieldTypes?: Record<string, TFieldType>;
}

export interface IQueryResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
