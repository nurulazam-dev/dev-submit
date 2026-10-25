"use client";

import {
  Menu,
  LogOut,
  User,
  LayoutDashboard,
  Loader2,
  ShieldCheck,
  FileText,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
// import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/hooks/useUser";
// import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { logoutUserAction } from "@/actions/auth.action";
import { toast } from "sonner";
import { useTransition } from "react";

interface MenuItem {
  title: string;
  url: string;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
  };
}

const CommonLayoutNavbar = ({
  logo = {
    url: "/",
    src: "/mna-serviceHub-logo.png",
    alt: "MNA ServiceHub",
    title: "MNA ServiceHub",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Services", url: "/services" },
    { title: "Careers", url: "/job-posts" },
    { title: "About Us", url: "/about-us" },
    { title: "Contact Us", url: "/contact-us" },
    { title: "Blogs", url: "/blogs" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
  },
  className,
}: Navbar1Props) => {
  // const router = useRouter();

  const { data: user } = useUser();

  const getDashboardPath = () => {
    switch (user?.role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "MANAGER":
        return "/manager/dashboard";
      case "SERVICE_PROVIDER":
        return "/service-provider/dashboard";
      case "JOB_CANDIDATE":
        return "/candidate/dashboard";
      case "CUSTOMER":
        return "/dashboard";
      default:
        return "/dashboard";
    }
  };

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

  const policyData = [
    {
      title: "Privacy Policy",
      url: "/privacy-policy",
      icon: <ShieldCheck className="size-4" />,
    },
    {
      title: "Terms of Conditions",
      url: "/terms-conditions",
      icon: <FileText className="size-4" />,
    },
    {
      title: "Refund Policy",
      url: "/refund-cancellation-policy",
      icon: <HelpCircle className="size-4" />,
    },
  ];

  return (
    <section
      className={cn(
        "py-2 border-b border-b-lime-950 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* ===============
            Desktop Menu
        ================ */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-1">
              <Image
                src={logo.src}
                height={40}
                width={40}
                alt={logo.alt}
                preload
                className="h-10 w-auto object-contain"
              />
              {/* <span className="text-2xl font-bold tracking-tighter">
                {logo.title}
              </span> */}
            </Link>
          </div>

          <div className="flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {menu.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                      )}
                      href={item.url}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent">
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-36 gap-0.5 p-1 md:w-42 lg:w-46">
                      {policyData.map((i) => (
                        <li key={i.url}>
                          <NavigationMenuLink
                            render={
                              <Link
                                href={i.url}
                                className="flex select-none items-center gap-2 rounded-md p-1 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                {i.icon}
                                <span>{i.title}</span>
                              </Link>
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                    >
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage
                          src={user?.image || ""}
                          alt={user?.name || "N/A"}
                        />
                        <AvatarFallback className="bg-primary/10">
                          <User className="size-5 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />

                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      render={
                        <Link
                          href={getDashboardPath()}
                          className="flex w-full items-center"
                        >
                          <LayoutDashboard className="mr-2 size-4" />
                          <span>Dashboard</span>
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
            ) : (
              <Button
                variant="default"
                size="lg"
                render={<Link href={auth.login.url}>{auth.login.title}</Link>}
              />
            )}
          </div>
        </nav>

        {/* ===========
          Mobile Menu
        ============= */}

        <div className="flex items-center justify-between px-2 lg:hidden">
          <Link href={logo.url} className="flex items-center gap-2">
            <Image src={logo.src} height={40} width={40} alt={logo.alt} />
            <span className="font-bold text-2xl">{logo.title}</span>
          </Link>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon">
                    <Menu className="size-5" />
                  </Button>
                }
              />
              <SheetContent side="right" className="w-75">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2 text-2xl">
                    <Image src={logo.src} height={40} width={40} alt="logo" />
                    {logo.title}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-3 py-3 mx-5">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      className="text-md font-medium hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <ModeToggle />
                  {user ? (
                    <div className="flex flex-col gap-4">
                      <Link
                        href={getDashboardPath()}
                        className="flex justify-center w-full items-center border rounded-md hover:bg-green-600 py-1.5"
                      >
                        <LayoutDashboard className="mr-2 size-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Button
                        disabled={isPending}
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                        variant="destructive"
                        className="w-full"
                      >
                        {isPending ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <LogOut className="mr-2 h-4 w-4" />
                        )}
                        <span>{isPending ? "Logging out..." : "Logout"}</span>
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      render={<Link href={auth.login.url}>Login</Link>}
                    />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CommonLayoutNavbar };
