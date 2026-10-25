"use client";

import { logoutUserAction } from "@/actions/auth.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IUserPayload } from "@/types/users.type";
import { Key, Loader2, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

interface UserDropdownProps {
  userInfo: IUserPayload;
}

const UserDropdown = ({ userInfo }: UserDropdownProps) => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logoutUserAction();
        toast.success("Logged out successfully");
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={"outline"}
            size={"icon"}
            className="rounded-full focus-visible:ring-0"
          >
            <Avatar className="h-10 w-10 border">
              <AvatarImage
                src={userInfo?.image || ""}
                alt={userInfo?.name || "N/A"}
              />
              <AvatarFallback className="bg-primary/10">
                <User className="size-5 text-primary" />
              </AvatarFallback>
            </Avatar>
          </Button>
        }
      />

      <DropdownMenuContent align={"end"} className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userInfo?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userInfo?.email}
              </p>
              <p className="text-xs text-primary capitalize mt-1">
                {userInfo?.role?.toLowerCase().replace("_", " ")}
              </p>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            render={
              <Link href={"/profile/me"} className="flex w-full items-center">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </Link>
            }
          />

          <DropdownMenuItem
            render={
              <Link
                href={"/change-password"}
                className="flex w-full items-center"
              >
                <Key className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </Link>
            }
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
          className="text-destructive focus:bg-destructive focus:text-white cursor-pointer"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          <span>{isPending ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
