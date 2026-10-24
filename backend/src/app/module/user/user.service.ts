import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { db } from "prisma/db";
import {
  IAdminUpdateUserPayload,
  IUserPayload,
  UserRole,
  UserStatus,
} from "./user.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import {
  IQueryCollection,
  IQueryParams,
} from "../../interfaces/query.interface";
import {
  userFilterableFields,
  userIncludeConfig,
  userSearchableFields,
  userSortableFields,
} from "./user.constant";

const getAllUsers = async (query: IQueryParams) => {
  return new QueryBuilder<IUserPayload>(
    db.orm.public.User as unknown as IQueryCollection,
    query,
    {
      searchableFields: userSearchableFields,
      filterableFields: userFilterableFields,
      sortableFields: userSortableFields,
      fieldTypes: { createdAt: "date" },
    },
  )
    .search()
    .filter()
    .include({
      submissions: true,
      reviews: true,
    })
    .dynamicInclude(userIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();
};

const getAllStudents = async (query: IQueryParams) => {
  return new QueryBuilder<IUserPayload>(
    db.orm.public.User as unknown as IQueryCollection,
    query,
    {
      searchableFields: userSearchableFields,
      filterableFields: userFilterableFields,
    },
  )
    .search()
    .filter()
    .where({
      role: "STUDENT",
    })
    .include({
      submissions: true,
      reviews: true,
    })
    .dynamicInclude(userIncludeConfig)
    .paginate()
    .sort()
    .fields()
    .execute();
};

const getAllAdmins = async (query: IQueryParams) => {
  return new QueryBuilder<IUserPayload>(
    db.orm.public.User as unknown as IQueryCollection,
    query,
    {
      searchableFields: userSearchableFields,
      filterableFields: userFilterableFields,
    },
  )
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
};

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
