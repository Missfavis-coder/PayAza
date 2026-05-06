"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, CreditCard, Bell } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/hooks/use-auth";


function HeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4 lg:px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 bg-neutral-200/10 rounded animate-pulse" />
          <div className="h-4 w-24 bg-neutral-200/10 rounded animate-pulse" />
        </div>

        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-neutral-200/10 rounded-full animate-pulse" />
          <div className="h-8 w-8 bg-neutral-200/10 rounded-full animate-pulse" />
        </div>
      </div>
    </header>
  );
}

/* ---------------- HEADER ---------------- */

export function SiteHeader() {
  const { user, isLoading, logout, isLoggingOut } = useAuth();
  const path = usePathname();
  const last = path.split("/").pop();

  if (isLoading) return <HeaderSkeleton />;

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "U";

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center border-b bg-background px-4 lg:px-6">
      <div className="flex w-full items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-2 text-muted-foreground">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-sm font-medium capitalize text-foreground">
            {last}
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* NOTIFICATION */}
          <Link href="/dashboard/notification">
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                1
              </span>
            </Button>
          </Link>

          {/* USER MENU */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <p className="text-xs font-medium uppercase">
                  {user?.name ?? "User"}
                </p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => logout()}
                disabled={isLoggingOut}
                className="text-red-500 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Log out"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </header>
  );
}