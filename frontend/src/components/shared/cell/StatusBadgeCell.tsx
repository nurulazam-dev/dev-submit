import { Badge } from "@/components/ui/badge";
import { UserStatus } from "@/types/users.type";

interface IStatusBadgeCellProps {
  status: UserStatus;
}

const StatusBadgeCell = ({ status }: IStatusBadgeCellProps) => {
  return (
    <Badge
      variant={
        status === "ACTIVE"
          ? "default"
          : status === "BLOCKED"
            ? "destructive"
            : "secondary"
      }
    >
      <span className="text-sm capitalize">{status.toLowerCase()}</span>
    </Badge>
  );
};

export default StatusBadgeCell;
