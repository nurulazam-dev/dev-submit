import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoCellProps {
  name: string;
  email: string;
  image?: string | null | undefined;
}

const UserInfoCell = ({ name, email, image }: UserInfoCellProps) => {
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={image || undefined} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="font-medium text-sm">{name}</span>
        <span className="text-muted-foreground text-xs">{email}</span>
      </div>
    </div>
  );
};

export default UserInfoCell;
