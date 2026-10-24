import { and, or } from "@prisma/orm-postgres/orm-client";
import status from "http-status";
import AppError from "../errorHelpers/AppError";
import {
  IQueryCollection,
  IQueryConfig,
  IQueryParams,
  IQueryResult,
  TExpr,
  TFieldProxy,
  TIncludeConfig,
  TOrderArg,
  TWhereArg,
} from "../interfaces/query.interface";

const orAll = or as unknown as (...exprs: TExpr[]) => TExpr;
const andAll = and as unknown as (...exprs: TExpr[]) => TExpr;

const RESERVED_PARAMS = [
  "searchTerm",
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "fields",
  "include",
];

const DEFAULT_BLOCKED_FIELDS = [
  "password",
  "resetOtpHash",
  "resetOtpExpiresAt",
];

const UNSAFE_SEGMENTS = ["__proto__", "constructor", "prototype"];
const IDENTIFIER = /^[A-Za-z_][A-Za-z0-9_]*$/;
const NUMBER_PATTERN = /^-?(0|[1-9]\d*)(\.\d+)?$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:?\d{2})?)?$/;
const COMPARISON_OPERATORS = ["lt", "lte", "gt", "gte"];

type TStep = (collection: IQueryCollection) => IQueryCollection;

const badRequest = (message: string) =>
  new AppError(status.BAD_REQUEST, message);

export class QueryBuilder<T> {
  private whereSteps: TStep[] = [];
  private includeSteps = new Map<string, TStep>();
  private selectedFields: string[] | undefined;
  private orderFns: TOrderArg[] = [];
  private page = 1;
  private limitValue = 10;

  constructor(
    private model: IQueryCollection,
    private queryParams: IQueryParams,
    private config: IQueryConfig = {},
  ) {}

  // ---------------- search ----------------

  search(): this {
    const { searchTerm } = this.queryParams;
    const { searchableFields } = this.config;

    if (
      typeof searchTerm === "string" &&
      searchTerm.trim() !== "" &&
      searchableFields &&
      searchableFields.length > 0
    ) {
      searchableFields.forEach((f) => this.assertAllowedPath(f));

      const pattern = `%${this.escapeLike(searchTerm.trim())}%`;

      this.whereSteps.push((c) =>
        c.where((p) => {
          const exprs = searchableFields.map((f) =>
            this.field(p, f).ilike(pattern),
          );
          return exprs.length === 1 ? exprs[0] : orAll(...exprs);
        }),
      );
    }

    return this;
  }

  // ---------------- filter ----------------

  filter(): this {
    const { filterableFields } = this.config;

    Object.entries(this.queryParams).forEach(([key, value]) => {
      if (RESERVED_PARAMS.includes(key)) return;
      if (value === undefined || value === "") return;

      if (
        filterableFields &&
        filterableFields.length > 0 &&
        !filterableFields.includes(key)
      ) {
        return;
      }

      this.assertAllowedPath(key);

      this.whereSteps.push((c) =>
        c.where((p) => this.buildFilterExpr(this.field(p, key), key, value)),
      );
    });

    return this;
  }

  // ---------------- sort ----------------

  sort(): this {
    const sortBy =
      this.queryParams.sortBy || this.config.defaultSortBy || "createdAt";
    const direction = this.queryParams.sortOrder === "asc" ? "asc" : "desc";

    this.assertAllowedPath(sortBy);

    const { sortableFields } = this.config;
    if (
      this.queryParams.sortBy &&
      sortableFields &&
      sortableFields.length > 0 &&
      !sortableFields.includes(sortBy)
    ) {
      throw badRequest(`Sorting by "${sortBy}" is not allowed`);
    }

    const makeOrder =
      (path: string): TOrderArg =>
      (p) =>
        this.field(p, path)[direction]();

    this.orderFns = [makeOrder(sortBy)];

    const tieBreaker =
      this.config.tieBreakerField === undefined
        ? "id"
        : this.config.tieBreakerField;

    if (tieBreaker && tieBreaker !== sortBy) {
      this.orderFns.push(makeOrder(tieBreaker));
    }

    return this;
  }

  // ---------------- paginate ----------------

  paginate(): this {
    const maxLimit = this.config.maxLimit ?? 50;

    this.page = Math.max(1, Math.floor(Number(this.queryParams.page)) || 1);
    this.limitValue = Math.min(
      maxLimit,
      Math.max(1, Math.floor(Number(this.queryParams.limit)) || 10),
    );

    return this;
  }

  // ---------------- fields (select) ----------------

  fields(): this {
    const param = this.queryParams.fields;

    const requested =
      typeof param === "string"
        ? param
            .split(",")
            .map((f) => f.trim())
            .filter(Boolean)
        : [];

    if (requested.length > 0) {
      const blocked = this.blockedSet();

      requested.forEach((f) => {
        if (!IDENTIFIER.test(f) || blocked.has(f)) {
          throw badRequest(`Invalid field: ${f}`);
        }
      });

      this.selectedFields = requested;
    } else if (this.config.defaultSelect && this.config.defaultSelect.length) {
      this.selectedFields = this.config.defaultSelect;
    }

    return this;
  }

  // ---------------- include ----------------

  include(config: TIncludeConfig): this {
    Object.entries(config).forEach(([name, refine]) =>
      this.addInclude(name, refine),
    );
    return this;
  }

  dynamicInclude(
    includeConfig: TIncludeConfig,
    defaultInclude: string[] = [],
  ): this {
    const param = this.queryParams.include;

    const requested =
      typeof param === "string"
        ? param
            .split(",")
            .map((r) => r.trim())
            .filter(Boolean)
        : [];

    [...new Set([...defaultInclude, ...requested])].forEach((name) => {
      if (Object.prototype.hasOwnProperty.call(includeConfig, name)) {
        this.addInclude(name, includeConfig[name] as TIncludeConfig[string]);
      }
    });

    return this;
  }

  // ---------------- custom where ----------------

  where(condition: TWhereArg): this {
    this.whereSteps.push((c) => c.where(condition));
    return this;
  }

  // ---------------- run ----------------

  async execute(): Promise<IQueryResult<T>> {
    const [total, data] = await Promise.all([
      this.count(),
      this.buildCollection().all(),
    ]);

    return {
      data: data as T[],
      meta: {
        page: this.page,
        limit: this.limitValue,
        total,
        totalPages: Math.ceil(total / this.limitValue),
      },
    };
  }

  async count(): Promise<number> {
    const result = await this.applyWhere().aggregate((a) => ({
      total: a.count(),
    }));

    return Number(result.total ?? 0);
  }

  buildCollection(): IQueryCollection {
    let collection = this.applyWhere();

    if (this.selectedFields) {
      collection = collection.select(...this.selectedFields);
    } else {
      this.includeSteps.forEach((step) => {
        collection = step(collection);
      });
    }

    if (this.orderFns.length > 0) {
      collection = collection.orderBy(
        this.orderFns.length === 1
          ? (this.orderFns[0] as TOrderArg)
          : this.orderFns,
      );
    }

    return collection
      .limit(this.limitValue)
      .offset((this.page - 1) * this.limitValue);
  }

  // ---------------- private helpers ----------------

  private applyWhere(): IQueryCollection {
    return this.whereSteps.reduce((c, step) => step(c), this.model);
  }

  private addInclude(name: string, refine: TIncludeConfig[string]) {
    this.includeSteps.set(
      name,
      refine === true ? (c) => c.include(name) : (c) => c.include(name, refine),
    );
  }

  private blockedSet() {
    return new Set([
      ...DEFAULT_BLOCKED_FIELDS,
      ...(this.config.blockedFields ?? []),
    ]);
  }

  private assertAllowedPath(path: string) {
    const segments = path.split(".");
    const blocked = this.blockedSet();

    if (
      segments.length > 2 ||
      segments.some(
        (s) =>
          !IDENTIFIER.test(s) || UNSAFE_SEGMENTS.includes(s) || blocked.has(s),
      )
    ) {
      throw badRequest(`Invalid field: ${path}`);
    }
  }

  private field(fields: TFieldProxy, path: string) {
    let current: any = fields;

    for (const segment of path.split(".")) {
      current = current?.[segment];
    }

    if (!current || typeof current.eq !== "function") {
      throw badRequest(`Invalid field: ${path}`);
    }

    return current;
  }

  private escapeLike(value: string) {
    return value.replace(/[\\%_]/g, "\\$&");
  }

  private toArray(raw: unknown): unknown[] {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string") return raw.split(",");
    return [raw];
  }

  private buildFilterExpr(field: any, key: string, value: unknown): TExpr {
    if (Array.isArray(value)) {
      return field.in(value.map((v) => this.parseValue(key, v)));
    }

    if (value && typeof value === "object") {
      const exprs = Object.entries(value as Record<string, unknown>).map(
        ([op, raw]) => this.applyOperator(field, key, op, raw),
      );

      if (exprs.length === 0) {
        throw badRequest(`Invalid filter for ${key}`);
      }

      return exprs.length === 1 ? exprs[0] : andAll(...exprs);
    }

    return field.eq(this.parseValue(key, value));
  }

  private applyOperator(
    field: any,
    key: string,
    op: string,
    raw: unknown,
  ): TExpr {
    switch (op) {
      case "eq":
      case "equals":
        return field.eq(this.parseValue(key, raw, op));
      case "ne":
      case "neq":
      case "not":
        return field.neq(this.parseValue(key, raw, op));
      case "lt":
        return field.lt(this.parseValue(key, raw, op));
      case "lte":
        return field.lte(this.parseValue(key, raw, op));
      case "gt":
        return field.gt(this.parseValue(key, raw, op));
      case "gte":
        return field.gte(this.parseValue(key, raw, op));
      case "contains":
        return field.ilike(`%${this.escapeLike(String(raw))}%`);
      case "startsWith":
        return field.ilike(`${this.escapeLike(String(raw))}%`);
      case "endsWith":
        return field.ilike(`%${this.escapeLike(String(raw))}`);
      case "in":
        return field.in(this.toArray(raw).map((v) => this.parseValue(key, v)));
      case "notIn":
        return field.notIn(
          this.toArray(raw).map((v) => this.parseValue(key, v)),
        );
      case "isNull":
        return String(raw) === "false" ? field.isNotNull() : field.isNull();
      default:
        throw badRequest(`Unsupported operator "${op}" for ${key}`);
    }
  }

  private parseValue(key: string, raw: unknown, op?: string): unknown {
    if (typeof raw !== "string") return raw;

    switch (this.config.fieldTypes?.[key]) {
      case "string":
        return raw;
      case "number": {
        const n = Number(raw);
        if (Number.isNaN(n)) throw badRequest(`${key} must be a number`);
        return n;
      }
      case "boolean":
        if (raw === "true") return true;
        if (raw === "false") return false;
        throw badRequest(`${key} must be true or false`);
      case "date": {
        const d = new Date(raw);
        if (Number.isNaN(d.getTime()))
          throw badRequest(`${key} must be a date`);
        return d;
      }
    }

    if (raw === "true") return true;
    if (raw === "false") return false;

    if (NUMBER_PATTERN.test(raw)) {
      const n = Number(raw);
      if (raw.includes(".") || Number.isSafeInteger(n)) return n;
    }

    if (op && COMPARISON_OPERATORS.includes(op) && ISO_DATE_PATTERN.test(raw)) {
      const d = new Date(raw);
      if (!Number.isNaN(d.getTime())) return d;
    }

    return raw;
  }
}
