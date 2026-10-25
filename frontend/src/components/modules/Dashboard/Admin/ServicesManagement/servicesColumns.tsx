import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IServicePayload } from "@/types/service.type";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Image from "next/image";

export const servicesColumns: ColumnDef<IServicePayload>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Service Details",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-md border bg-muted">
          {row.original.imageUrl ? (
            <Image
              src={row.original.imageUrl}
              alt={row.original.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
              No BG
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm line-clamp-1">
            {row.original.name}
          </span>
          <span className="text-xs text-muted-foreground line-clamp-1">
            {row.original.description?.substring(0, 30) + "..." ||
              "No description"}
          </span>
        </div>
      </div>
    ),
  },

  {
    id: "rating",
    accessorKey: "averageRating",
    header: "Ratings",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">
          {row.original.averageRating?.toFixed(1) || "0.0"}
        </span>
        <span className="text-xs text-muted-foreground">
          ({row.original.totalReviews})
        </span>
      </div>
    ),
  },

  {
    id: "isActive",
    accessorKey: "isActive",
    header: "Visibility",
    cell: ({ row }) => {
      const active = row.original.isActive;
      return (
        <Badge
          variant={active ? "default" : "secondary"}
          className={
            active ? "bg-green-100 text-green-700 hover:bg-green-100" : ""
          }
        >
          {active ? "Public" : "Hidden"}
        </Badge>
      );
    },
  },

  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      return (
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      );
    },
  },
];
