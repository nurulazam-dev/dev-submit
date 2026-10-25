export const reviewSearchableFields = [
  "feedback",
  "submissionId",
  "reviewerId",
];

export const reviewFilterableFields = ["status"];

export const reviewSortableFields = ["createdAt"];

export const reviewIncludeConfig = {
  submission: true,
  reviewer: true,
} as const;
