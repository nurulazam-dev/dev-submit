import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IJobPostPayload } from "@/types/jobPost.type";
import { ColumnDef } from "@tanstack/react-table";
import { Users } from "lucide-react";

export const jobPostsColumns: ColumnDef<IJobPostPayload>[] = [
  {
    id: "title",
    accessorKey: "title",
    header: "Job Details",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-sm text-primary line-clamp-1">
          {row.original.title}
        </span>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="outline" className="text-[10px] py-0 h-4">
            {row.original.serviceType}
          </Badge>
          <span className="line-clamp-1">
            {row.original.location || "Remote"}
          </span>
        </div>
      </div>
    ),
  },

  {
    id: "vacancy",
    accessorKey: "vacancy",
    header: "Vacancy",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Users className="size-3.5 text-muted-foreground" />
        <span className="text-sm font-medium">
          {row.original.vacancy} Positions
        </span>
      </div>
    ),
  },

  {
    id: "salaryRange",
    accessorKey: "salaryRange",
    header: "Salary",
    cell: ({ row }) => (
      <div className=" text-sm text-green-600 font-medium">
        <span>{row.original.salaryRange || "Negotiable"}</span>
      </div>
    ),
  },

  {
    id: "isActive",
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.isActive ? "default" : "secondary"}
        className={
          row.original.isActive
            ? "bg-green-100 text-green-700 hover:bg-green-100"
            : ""
        }
      >
        {row.original.isActive ? "Live" : "Closed"}
      </Badge>
    ),
  },
  {
    id: "applications",
    accessorKey: "applications",
    header: "Applied",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Users className="size-3.5 text-muted-foreground" />
        <span className="text-sm font-medium">
          {row.original.applications?.length || 0} Candidates
        </span>
      </div>
    ),
  },
  {
    id: "deadline",
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => (
      <DateCell date={row.original.deadline} formatString="MMM dd, yyyy" />
    ),
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Posted On",
    cell: ({ row }) => (
      <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    ),
  },
];
