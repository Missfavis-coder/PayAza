"use client"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

function getInitials(name?: string, givenName?: string, familyName?: string): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0]?.toUpperCase() || "U";
  }
  if (givenName && familyName) {
    return (givenName[0] + familyName[0]).toUpperCase();
  }
  if (givenName) {
    return givenName[0]?.toUpperCase() || "U";
  }
  return "U";
}

export function SiteHeader() {
  const {logout} = useAuth();
  const path = usePathname();
  const last = path.split("/")[path.split("/").length - 1];

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-sm font-medium capitalize text-foreground">{last}</h1>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dashboard/notification">
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
                1
              </span>
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={""} />
                  <AvatarFallback className="text-xs font-semibold">
                    AO
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Adeshola</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex w-full items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/wallet" className="flex w-full items-center cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Wallet</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer"
              onClick={()=>("")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>


        </div>
      </div>
    </header>
  );
}
