"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

import { Button } from "../../components/ui/button";
///import { useProfile, useWhatsAppStatus } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { StatsCards } from "@/components/layouts/dashboard/stats-card";
import { ActionRail } from "@/app/dashboard/wallet/_components/action-buttons";
import { ChartAreaInteractive } from "@/components/layouts/dashboard/charts";
import { useAuth } from "@/lib/hooks/use-auth";
import RecentTable from "@/components/layouts/dashboard/recent-transactions";
///import { redirectToIntegration } from "@/lib/utils/redirect";

const page = () => {
  const { user, isLoading } = useAuth();
  
  

  return (
    <div className="flex bg-background flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 pb-8 md:pb-10">
          <div className="w-full lg:px-6 px-4 md:flex justify-between items-start md:items-center gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="md:text-xl text-lg font-medium gap-1 md:gap-2 flex flex-wrap items-center">
                <span className="text-sm md:text-base uppercase">
                  Welcome Back, {user?.name ?? "User"} !!
                </span>
              </h1>
              <p className="text-muted-foreground text-xs md:text-sm mt-1">
                Track your transactions and activity insights
              </p>
            </div>
          </div>
          <div className="px-4 space-y-4">
            <StatsCards/>
            <ChartAreaInteractive/>
            <RecentTable/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
