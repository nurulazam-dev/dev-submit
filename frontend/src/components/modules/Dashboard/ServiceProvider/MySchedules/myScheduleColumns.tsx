import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IServiceSchedulePayload } from "@/types/schedule.type";
import { ColumnDef } from "@tanstack/react-table";
import { Clock, Hash } from "lucide-react";

export const myScheduleColumns: ColumnDef<IServiceSchedulePayload>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: "S No",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Hash className="w-3 h-3 text-slate-400" />
        <span className="font-mono text-xs font-semibold uppercase text-slate-500">
          {row.original.id.slice(-6)}
        </span>
      </div>
    ),
  },
  {
    id: "scheduleDate",
    accessorKey: "scheduleDate",
    header: "Schedule Date",
    cell: ({ row }) => (
      <div className="flex justify-center w-fit">
        <span className="font-bold text-sm text-slate-900 dark:text-slate-200">
          <DateCell date={row.original.scheduleDate} formatString="PPP" />
        </span>
      </div>
    ),
  },
  {
    id: "schedule",
    header: "Schedule Time",
    cell: ({ row }) => {
      const { startTime, endTime } = row.original;
      return (
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <Clock className="w-3 h-3 text-primary" />
          <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded">
            {startTime}
          </span>
          <span className="text-slate-300">—</span>
          <span className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            {endTime}
          </span>
        </div>
      );
    },
  },
  {
    id: "slotNumber",
    accessorKey: "slotNumber",
    header: "Slot",
    cell: ({ row }) => (
      <div className="flex justify-center w-fit">
        <Badge
          variant="secondary"
          className="font-mono font-bold px-2.5 py-0.5 rounded-full"
        >
          {String(row.original.slotNumber).padStart(2, "0")}
        </Badge>
      </div>
    ),
  },
  {
    id: "isBooked",
    accessorKey: "isBooked",
    header: "Booking Status",
    cell: ({ row }) => {
      const isBooked = row.original.isBooked;
      return (
        <Badge
          className={`text-[10px] font-bold uppercase px-2.5 py-1 border shadow-none ${
            isBooked
              ? "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-500/10 dark:border-orange-500/20"
              : "bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/20"
          }`}
        >
          {isBooked ? "Booked" : "Available"}
        </Badge>
      );
    },
  },
  /*   {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 text-[12px]">
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Created:</span>
          <DateCell date={row.original.createdAt} formatString="MMM dd, yy" />
        </div> 
        <div className="flex items-center gap-1">
          <span className="text-slate-400">Updated:</span>
          <DateCell date={row.original.updatedAt} formatString="MMM dd, yy" />
        </div>
      </div>
    ),
  }, */
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => (
      <div className="flex items-center ">
        <DateCell date={row.original.updatedAt} formatString="MMM dd, yy" />
      </div>
    ),
  },
];
