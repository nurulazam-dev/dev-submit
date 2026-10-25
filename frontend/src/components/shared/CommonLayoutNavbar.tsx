"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, Loader2, LogOut, Menu, User } from "lucide-react";
import { toast } from "sonner";

import { logoutUserAction } from "@/actions/auth.action";
import { useUser } from "@/hooks/useUser";
import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./ModeToggle";

// import ModeToggle from "@/components/shared/ModeToggle";

type UserRole = "ADMIN" | "STUDENT";

interface NavbarUser {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  status: "ACTIVE" | "BLOCKED";
}

interface NavbarProps {
  auth?: {
    login?: boolean;
    register?: boolean;
  };
}

interface UserMenuProps {
  user: NavbarUser;
  dashboardPath: string;
  initials: string;
  isPending: boolean;
  handleLogout: () => void;
}

/**
 * Keep UserMenu outside CommonLayoutNavbar.
 * This prevents React from recreating the component on every render.
 */
function UserMenu({
  user,
  dashboardPath,
  initials,
  isPending,
  handleLogout,
}: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-full px-2"
            aria-label="Open user menu"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {initials}
            </span>

            <span className="hidden max-w-32 truncate text-sm font-medium sm:block">
              {user.name}
            </span>
          </Button>
        }
      />

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col gap-1">
            <span className="truncate font-semibold">{user.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user.email}
            </span>
            <span className="text-xs text-muted-foreground">{user.role}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          render={
            <Link href={dashboardPath}>
              <LayoutDashboard className="mr-2 size-4" />
              Dashboard
            </Link>
          }
        />

        <DropdownMenuItem
          render={
            <Link href={dashboardPath}>
              <User className="mr-2 size-4" />
              My Account
            </Link>
          }
        />

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={isPending}
          onSelect={(event) => {
            event.preventDefault();
            handleLogout();
          }}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          {isPending ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 size-4" />
          )}

          {isPending ? "Logging out..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function CommonLayoutNavbar({
  auth = { login: true, register: true },
}: NavbarProps) {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dashboardPath = user ? getDefaultDashboardRoute(user.role) : "/login";

  const initials =
    user?.name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "U";

  const navItems = [
    { title: "Home", url: "/" },
    { title: "Contact Us", url: "/contact-us" },
    { title: "Home", url: "/" },
  ];

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await logoutUserAction();
      } catch {
        toast.error("Unable to log out. Please try again.");
      }
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Dev Submit home"
        >
          <Image
            src="/dev-submit-logo.png"
            alt="Dev Submit"
            width={40}
            height={40}
            priority
            className="size-10 object-contain"
          />

          <span className="text-lg font-bold tracking-tight sm:text-xl">
            Dev <span className="text-primary">Submit</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.url}
              href={item.url}
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors",
                "hover:text-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />

          {user ? (
            <UserMenu
              user={user}
              dashboardPath={dashboardPath}
              initials={initials}
              isPending={isPending}
              handleLogout={handleLogout}
            />
          ) : (
            <>
              {auth.login && (
                <Button
                  variant="ghost"
                  render={<Link href="/login">Login</Link>}
                />
              )}

              {auth.register && (
                <Button render={<Link href="/register">Get Started</Link>} />
              )}
            </>
          )}
        </div>

        {/* Mobile navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />

            <SheetContent side="right" className="w-75 sm:w-87.5">
              <SheetHeader>
                <SheetTitle className="text-left">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex items-center gap-2"
                  >
                    <Image
                      src="/dev-submit-logo.png"
                      alt="Dev Submit"
                      width={32}
                      height={32}
                      className="size-8 object-contain"
                    />
                    <span>
                      Dev <span className="text-primary">Submit</span>
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-8 flex flex-col gap-5">
                <nav
                  className="flex flex-col gap-2"
                  aria-label="Mobile navigation"
                >
                  {navItems.map((item) => (
                    <SheetClose
                      key={item.url}
                      render={
                        <Link
                          href={item.url}
                          className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                        >
                          {item.title}
                        </Link>
                      }
                    />
                  ))}
                </nav>

                <div className="border-t pt-5">
                  {user ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 px-2">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                          {initials}
                        </span>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {user.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        render={
                          <Link
                            href={dashboardPath}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <LayoutDashboard className="mr-2 size-4" />
                            Dashboard
                          </Link>
                        }
                      />

                      <Button
                        variant="destructive"
                        className="w-full"
                        disabled={isPending}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        {isPending ? (
                          <Loader2 className="mr-2 size-4 animate-spin" />
                        ) : (
                          <LogOut className="mr-2 size-4" />
                        )}
                        {isPending ? "Logging out..." : "Logout"}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {auth.login && (
                        <Button
                          variant="outline"
                          className="w-full"
                          render={
                            <Link
                              href="/login"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Login
                            </Link>
                          }
                        />
                      )}

                      {auth.register && (
                        <Button
                          className="w-full"
                          render={
                            <Link
                              href="/register"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              Get Started
                            </Link>
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
