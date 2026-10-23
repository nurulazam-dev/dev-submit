import {
  IQueryConfig,
  IQueryParams,
  IQueryResult,
  PrismaCountArgs,
  PrismaFindManyArgs,
  PrismaModelDelegate,
  // PrismaNumberFilter,
  PrismaStringFilter,
  // PrismaWhereConditions,
  SortOrder,
} from "../interfaces/query.interface";

const RESERVED_QUERY_KEYS = new Set([
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "fields",
  "include",
  "includes",
]);

export class QueryBuilder<
  T,
  TWhereInput = Record<string, unknown>,
  TInclude = Record<string, unknown>,
> {
  private query: PrismaFindManyArgs;
  private countQuery: PrismaCountArgs;
  private page = 1;
  private limit = 10;
  private skip = 0;
  private sortBy = "createdAt";
  private sortOrder: SortOrder = "desc";
  private selectFields?: Record<string, boolean>;

  constructor(
    private readonly model: PrismaModelDelegate,
    private readonly queryParams: IQueryParams,
    private readonly config: IQueryConfig = {},
  ) {
    this.query = {
      where: {},
      include: {},
      orderBy: {},
      skip: 0,
      take: this.config.defaultLimit ?? 10,
    };

    this.countQuery = { where: {} };
    this.limit = this.config.defaultLimit ?? 10;
    this.query.take = this.limit;
  }

  search(): this {
    const searchTerm = this.asNonEmptyString(this.queryParams.searchTerm);
    const searchableFields = this.config.searchableFields ?? [];

    if (!searchTerm || searchableFields.length === 0) return this;

    const searchConditions = searchableFields
      .map((field) => this.buildSearchCondition(field, searchTerm))
      .filter(
        (condition): condition is Record<string, unknown> =>
          condition !== undefined,
      );

    if (searchConditions.length === 0) return this;

    this.mergeWhere({ OR: searchConditions });
    return this;
  }

  filter(): this {
    const filterableFields = this.config.filterableFields;
    const where = this.query.where as Record<string, unknown>;

    for (const [key, rawValue] of Object.entries(this.queryParams)) {
      if (
        RESERVED_QUERY_KEYS.has(key) ||
        rawValue === undefined ||
        rawValue === ""
      ) {
        continue;
      }

      if (filterableFields?.length && !filterableFields.includes(key)) {
        continue;
      }

      if (key.includes(".")) {
        if (filterableFields?.length && !filterableFields.includes(key)) {
          continue;
        }

        const nestedCondition = this.buildNestedFilter(key, rawValue);
        if (nestedCondition) this.mergeWhere(nestedCondition);
        continue;
      }

      const parsedValue = this.parseFilterValue(rawValue);
      if (parsedValue !== undefined) {
        where[key] = parsedValue;
      }
    }

    this.countQuery.where = this.deepMerge(
      (this.countQuery.where ?? {}) as Record<string, unknown>,
      where,
    );

    return this;
  }

  paginate(): this {
    const requestedPage = this.parsePositiveInteger(this.queryParams.page, 1);
    const configuredDefault = this.config.defaultLimit ?? 10;
    const maxLimit = this.config.maxLimit ?? 100;
    const requestedLimit = this.parsePositiveInteger(
      this.queryParams.limit,
      configuredDefault,
    );

    this.page = requestedPage;
    this.limit = Math.min(requestedLimit, maxLimit);
    this.skip = (this.page - 1) * this.limit;

    this.query.skip = this.skip;
    this.query.take = this.limit;

    return this;
  }

  sort(): this {
    const requestedSortBy =
      this.asNonEmptyString(this.queryParams.sortBy) ??
      this.config.defaultSortBy ??
      "createdAt";
    const requestedSortOrder =
      this.queryParams.sortOrder === "asc"
        ? "asc"
        : (this.config.defaultSortOrder ?? "desc");

    const sortableFields = this.config.sortableFields;
    const allowedSortBy =
      !sortableFields?.length || sortableFields.includes(requestedSortBy)
        ? requestedSortBy
        : (this.config.defaultSortBy ?? "createdAt");

    this.sortBy = allowedSortBy;
    this.sortOrder = requestedSortOrder;

    this.query.orderBy = this.buildOrderBy(this.sortBy, this.sortOrder);
    return this;
  }

  fields(): this {
    const fieldsParam = this.asNonEmptyString(this.queryParams.fields);
    if (!fieldsParam) return this;

    const requestedFields = fieldsParam
      .split(",")
      .map((field) => field.trim())
      .filter(Boolean);

    const selectableFields = this.config.selectableFields;
    const fields = requestedFields.filter(
      (field) => !selectableFields?.length || selectableFields.includes(field),
    );

    if (fields.length === 0) return this;

    this.selectFields = Object.fromEntries(
      fields.map((field) => [field, true]),
    );
    this.query.select = this.selectFields;

    delete this.query.include;

    return this;
  }

  include(relation: TInclude): this {
    if (this.selectFields) return this;

    const existing = (this.query.include ?? {}) as Record<string, unknown>;
    this.query.include = this.deepMerge(
      existing,
      relation as Record<string, unknown>,
    );

    return this;
  }

  dynamicInclude(
    includeConfig: Record<string, unknown>,
    defaultInclude: string[] = [],
  ): this {
    if (this.selectFields) return this;

    const result: Record<string, unknown> = {};
    for (const relation of defaultInclude) {
      if (Object.prototype.hasOwnProperty.call(includeConfig, relation)) {
        result[relation] = includeConfig[relation];
      }
    }

    const includeParam =
      this.asNonEmptyString(this.queryParams.include) ??
      this.asNonEmptyString(this.queryParams.includes);

    if (includeParam) {
      for (const relation of includeParam
        .split(",")
        .map((item) => item.trim())) {
        if (Object.prototype.hasOwnProperty.call(includeConfig, relation)) {
          result[relation] = includeConfig[relation];
        }
      }
    }

    this.query.include = this.deepMerge(
      (this.query.include ?? {}) as Record<string, unknown>,
      result,
    );

    return this;
  }

  where(condition: TWhereInput): this {
    const record = condition as Record<string, unknown>;
    this.query.where = this.deepMerge(
      (this.query.where ?? {}) as Record<string, unknown>,
      record,
    );
    this.countQuery.where = this.deepMerge(
      (this.countQuery.where ?? {}) as Record<string, unknown>,
      record,
    );

    return this;
  }

  async execute(): Promise<IQueryResult<T>> {
    const [total, data] = await Promise.all([
      this.model.count(this.countQuery),
      this.model.findMany(this.query),
    ]);

    return {
      data: data as T[],
      meta: {
        page: this.page,
        limit: this.limit,
        total,
        totalPages: total === 0 ? 0 : Math.ceil(total / this.limit),
      },
    };
  }

  async count(): Promise<number> {
    return this.model.count(this.countQuery);
  }

  getQuery(): PrismaFindManyArgs {
    return this.query;
  }

  private mergeWhere(condition: Record<string, unknown>): void {
    this.query.where = this.deepMerge(
      (this.query.where ?? {}) as Record<string, unknown>,
      condition,
    );
    this.countQuery.where = this.deepMerge(
      (this.countQuery.where ?? {}) as Record<string, unknown>,
      condition,
    );
  }

  private buildSearchCondition(
    field: string,
    searchTerm: string,
  ): Record<string, unknown> | undefined {
    const parts = field.split(".").filter(Boolean);
    const stringFilter: PrismaStringFilter = {
      contains: searchTerm,
      mode: "insensitive",
    };

    if (parts.length === 1) {
      return { [parts[0]]: stringFilter };
    }

    if (parts.length === 2) {
      return {
        [parts[0]]: {
          [parts[1]]: stringFilter,
        },
      };
    }

    if (parts.length === 3) {
      return {
        [parts[0]]: {
          some: {
            [parts[1]]: {
              [parts[2]]: stringFilter,
            },
          },
        },
      };
    }

    return undefined;
  }

  private buildNestedFilter(
    dottedKey: string,
    rawValue: unknown,
  ): Record<string, unknown> | undefined {
    const parts = dottedKey.split(".").filter(Boolean);
    if (parts.length < 2 || parts.length > 3) return undefined;

    const value = this.parseFilterValue(rawValue);
    if (value === undefined) return undefined;

    if (parts.length === 2) {
      return {
        [parts[0]]: {
          [parts[1]]: value,
        },
      };
    }

    return {
      [parts[0]]: {
        some: {
          [parts[1]]: {
            [parts[2]]: value,
          },
        },
      },
    };
  }

  private buildOrderBy(
    field: string,
    order: SortOrder,
  ): Record<string, unknown> {
    const parts = field.split(".").filter(Boolean);

    if (parts.length === 2) {
      return { [parts[0]]: { [parts[1]]: order } };
    }

    if (parts.length === 3) {
      return {
        [parts[0]]: {
          [parts[1]]: { [parts[2]]: order },
        },
      };
    }

    return { [field]: order };
  }

  private parseFilterValue(value: unknown): unknown {
    if (Array.isArray(value)) {
      return { in: value.map((item) => this.parseScalar(item)) };
    }

    if (typeof value === "object" && value !== null) {
      return this.parseRangeFilter(value as Record<string, unknown>);
    }

    return this.parseScalar(value);
  }

  private parseScalar(value: unknown): unknown {
    if (typeof value !== "string") return value;

    if (value === "true") return true;
    if (value === "false") return false;

    return value;
  }

  private parseRangeFilter(
    value: Record<string, unknown>,
  ): Record<string, unknown> {
    const allowedOperators = new Set([
      "lt",
      "lte",
      "gt",
      "gte",
      "equals",
      "not",
      "contains",
      "startsWith",
      "endsWith",
      "in",
      "notIn",
    ]);

    const result: Record<string, unknown> = {};

    for (const [operator, rawValue] of Object.entries(value)) {
      if (!allowedOperators.has(operator) || rawValue === undefined) continue;

      if (operator === "in" || operator === "notIn") {
        const values = Array.isArray(rawValue)
          ? rawValue
          : String(rawValue).split(",");
        result[operator] = values.map((item) => this.parseScalar(item));
        continue;
      }

      if (
        ["lt", "lte", "gt", "gte", "equals", "not"].includes(operator) &&
        typeof rawValue === "string" &&
        rawValue.trim() !== "" &&
        Number.isFinite(Number(rawValue))
      ) {
        result[operator] = Number(rawValue);
      } else {
        result[operator] = this.parseScalar(rawValue);
      }
    }

    return Object.keys(result).length > 0 ? result : value;
  }

  private parsePositiveInteger(value: unknown, fallback: number): number {
    if (typeof value !== "string" && typeof value !== "number") return fallback;

    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < 1) return fallback;

    return parsed;
  }

  private asNonEmptyString(value: unknown): string | undefined {
    if (typeof value !== "string") return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  private deepMerge(
    target: Record<string, unknown>,
    source: Record<string, unknown>,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = { ...target };

    for (const [key, sourceValue] of Object.entries(source)) {
      const targetValue = result[key];

      if (this.isPlainObject(targetValue) && this.isPlainObject(sourceValue)) {
        result[key] = this.deepMerge(targetValue, sourceValue);
      } else {
        result[key] = sourceValue;
      }
    }

    return result;
  }

  private isPlainObject(value: unknown): value is Record<string, unknown> {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      return false;
    }

    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }
}
