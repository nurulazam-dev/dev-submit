import DateCell from "@/components/shared/cell/DateCell";
import StatusBadgeCell from "@/components/shared/cell/StatusBadgeCell";
import UserInfoCell from "@/components/shared/cell/UserInfoCell";
import { IUserPayload } from "@/types/users.type";
import { ColumnDef } from "@tanstack/react-table";

export const usersColumns: ColumnDef<IUserPayload>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => (
      <UserInfoCell
        name={row.original.name}
        email={row.original.email}
        image={row.original.image}
      />
    ),
  },

  {
    id: "phone",
    accessorKey: "phone",
    header: "Contact Number",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm">{row.original?.phone || "N/A"}</span>
      </div>
    ),
  },

  {
    id: "emailVerified",
    accessorKey: "emailVerified",
    header: "Email Verified",
    cell: ({ row }) => {
      return (
        <span className="text-sm capitalize">
          {row.original.emailVerified ? "Verified" : "Not Verified"}
        </span>
      );
    },
  },
  {
    id: "role",
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.role.charAt(0).toUpperCase() +
            row.original.role.slice(1)}
        </span>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadgeCell status={row.original.status} />;
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) => {
      return (
        <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
      );
    },
  },
];
