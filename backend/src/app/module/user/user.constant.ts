export const userSearchableFields = ["name", "email", "phone"];

export const userFilterableFields = ["status", "role"];

export const userSortableFields = ["name", "createdAt"];

export const userIncludeConfig = {
  submissions: true,
  reviews: true,
} as const;

/* export const userDefaultSelect = [
  "id",
  "name",
  "email",
  "role",
  "phone",
  "address",
  "status",
  "passwordChangedAt",
  "createdAt",
]; */

/* export const userBlockedFields = [
  "password",
  "resetOtpHash",
  "resetOtpExpiresAt",
]; */
