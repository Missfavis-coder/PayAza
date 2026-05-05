"use client";

import * as React from "react";
import {
  Activity,
  Bell,
  CreditCard,
  LayoutDashboardIcon,
  Settings,
  Sofa,
  Users,
  WalletCards,
  X,
} from "lucide-react";

import { NavMain } from "@/components/layouts/dashboard/nav-mains";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navcredits from "./nav-footer";
import Navsettings from "./nav-footer";

const navMain = [
  {
    title: "Home",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Transactions",
    url: "/dashboard/transactions",
    icon: Activity,
  },
  {
    title: "Wallet",
    url: "/dashboard/wallet",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Users,
  },
  {
    title: "Help & Support",
    url: "/dashboard/help",
    icon: Sofa,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, isMobile, setOpenMobile } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <Sidebar
      className="border-r bg-card relative overflow-hidden"
      collapsible="icon"
      {...props}
    >
      <div
        className="absolute inset-0 w-full h-full mix-blend-overlay pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "url(/images/backgrounds/noise.svg)",
          backgroundSize: "200px 200px",
        }}
      />
      <SidebarHeader className="relative  z-10  px-3">
        <div className="flex items-center justify-between">
          <SidebarMenu className="flex-1">
            <SidebarMenuItem className="flex items-center py-2 justify-center">
              <SidebarMenuButton asChild>
                <div className="flex items-center gap-2">
                  {/* ICON CHANGES WHEN COLLAPSED */}
                  <div className="bg-[#090D18] text-white p-3 rounded-md">
                    {isCollapsed ? (
                      <WalletCards size={18} />
                    ) : (
                      <WalletCards size={18} />
                    )}
                  </div>

                  {/* TEXT ONLY WHEN EXPANDED */}
                  {!isCollapsed && (
                    <span className="text-xl font-bold">PayAza</span>
                  )}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              onClick={() => setOpenMobile(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          )}
        </div>
      </SidebarHeader>
      <hr />
      <SidebarContent className="relative z-10 px-3">
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter className="relative z-10 p-4">
        <Navsettings />
      </SidebarFooter>
    </Sidebar>
  );
}
