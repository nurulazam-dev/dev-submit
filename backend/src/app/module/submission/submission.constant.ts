export const submissionSearchableFields = [
  "title",
  "description",
  "githubUrl",
  "liveUrl",
  "studentId",
];

export const submissionFilterableFields = ["status"];

export const submissionSortableFields = ["createdAt", "studentId"];

export const submissionIncludeConfig = {
  review: true,
  student: true,
} as const;
