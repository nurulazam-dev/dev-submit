import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { db } from "prisma/db";
import {
  IAdminUpdateUserPayload,
  IUserPayload,
  UserRole,
  UserStatus,
} from "./user.interface";
// import { QueryBuilder } from "../../utils/QueryBuilder";
import { IQueryParams } from "../../interfaces/query.interface";
// import {
//   userFilterableFields,
//   userIncludeConfig,
//   userSearchableFields,
// } from "./user.constant";

/* const getAllUsers = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    User,
    Prisma.UserWhereInput,
    Prisma.UserInclude
  >(prisma.user, query, {
    searchableFields: userSearchableFields,
    filterableFields: userFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .include({
      submission: true,
      reviews: true,
    })
    .dynamicInclude(userIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();

  return result;
}; */

/* const getAllStudents = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    User,
    Prisma.UserWhereInput,
    Prisma.UserInclude
  >(prisma.user, query, {
    searchableFields: userSearchableFields,
    filterableFields: userFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .where({
      role: "STUDENT",
    })
    .include({
      submission: true,
      reviews: true,
    })
    .dynamicInclude(userIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();

  return result;
}; */

/* const getAllAdmins = async (query: IQueryParams) => {
  const queryBuilder = new QueryBuilder<
    User,
    Prisma.UserWhereInput,
    Prisma.UserInclude
  >(prisma.user, query, {
    searchableFields: userSearchableFields,
    filterableFields: userFilterableFields,
  });

  const result = await queryBuilder
    .search()
    .filter()
    .where({
      role: "ADMIN",
    })
    .include({
      reviews: true,
    })
    .dynamicInclude(userIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();

  return result;
}; */

const getAllUsers = async (query: IQueryParams) => {
  return getUsers(query);
};

const getAllStudents = async (query: IQueryParams) => {
  return getUsers(query, "STUDENT");
};

const getAllAdmins = async (query: IQueryParams) => {
  return getUsers(query, "ADMIN");
};

const getUsers = async (query: IQueryParams, role?: UserRole) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 10));
  const offset = (page - 1) * limit;

  const baseQuery = role
    ? db.orm.public.User.where({ role })
    : db.orm.public.User;

  const [data, countResult] = await Promise.all([
    baseQuery
      .orderBy((user) => user.createdAt.desc())
      .limit(limit)
      .offset(offset)
      .include("submissions")
      .include("reviews")
      .all(),

    baseQuery.aggregate((aggregate) => ({
      total: aggregate.count(),
    })),
  ]);

  const total = countResult.total;

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
// ==============================================

const getUserById = async (id: string) => {
  const result = await db.orm.public.User.first({
    id,
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "User not found!");
  }

  return result;
};

const updateUserById = async (id: string, payload: Partial<IUserPayload>) => {
  const data: Record<string, unknown> = {};

  if (payload.name !== undefined) data.name = payload.name;
  if (payload.address !== undefined) data.address = payload.address;

  const result = await db.orm.public.User.where({ id }).update(data);

  return result;
};

const adminUpdateUserById = async (
  id: string,
  payload: IAdminUpdateUserPayload,
) => {
  const data: Record<string, unknown> = {};

  if (payload.email !== undefined) data.email = payload.email;
  if (payload.phone !== undefined) data.phone = payload.phone;
  if (payload.role !== undefined) data.role = payload.role as UserRole;
  if (payload.status !== undefined) data.status = payload.status as UserStatus;

  const result = await db.orm.public.User.where({ id }).update(data);

  if (!result) {
    throw new AppError(status.NOT_FOUND, "User not found!");
  }

  return result;
};

export const UserService = {
  getAllUsers,
  getAllStudents,
  getAllAdmins,
  getUserById,
  updateUserById,
  adminUpdateUserById,
};
