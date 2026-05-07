"use client";

import {
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  CreditCard,
  Nfc,
  PiggyBank,
  QrCode,
  RefreshCw,
  Send,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { AdminGuard } from "@/components/analytics/AdminGuard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import {
  StatCard,
  StatCardSkeleton,
} from "@/components/analytics/StatCard";
import { RoleBadge } from "@/components/analytics/UserCard";

import { useAdminAnalytics } from "@/lib/hooks/use-analytics";
import { formatLongDate, formatNaira } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminDashboardInner />
    </AdminGuard>
  );
}

function AdminDashboardInner() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminAnalytics();

  const a = data?.data;

  return (
    <div className="flex bg-background flex-1 flex-col">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 pb-8 md:pb-10">
        <div className="w-full lg:px-6 px-4 md:flex justify-between items-start md:items-center gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="md:text-xl text-lg font-medium">
              <span className="text-sm md:text-base uppercase">
                Admin Overview
              </span>
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">
              Platform-wide metrics and recent activity
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-2 md:mt-0 text-neutral-300"
          >
            <RefreshCw
              size={14}
              className={isFetching ? "animate-spin" : ""}
            />
            Refresh
          </Button>
        </div>

        <div className="px-4 space-y-6">
          {isError ? (
            <ErrorPanel
              message={(error as Error)?.message || "Failed to load admin analytics"}
              onRetry={() => refetch()}
            />
          ) : null}

          {/* PLATFORM OVERVIEW */}
          <section>
            <SectionHeader title="Platform Overview" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {isLoading ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : (
                <>
                  <StatCard
                    label="Total Users"
                    value={a?.users.total ?? 0}
                    icon={Users}
                  />
                  <StatCard
                    label="New This Month"
                    value={a?.users.newThisMonth ?? 0}
                    hint={`This week: ${a?.users.newThisWeek ?? 0}`}
                    icon={UserPlus}
                    accent="cyan"
                  />
                  <StatCard
                    label="Active This Month"
                    value={a?.users.activeThisMonth ?? 0}
                    icon={TrendingUp}
                    accent="green"
                  />
                </>
              )}
            </div>
          </section>

          {/* TRANSACTION VOLUME */}
          <section>
            <SectionHeader title="Transaction Volume" />
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {isLoading ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : (
                <>
                  <StatCard
                    label="Total Transactions"
                    value={a?.transactions.total ?? 0}
                    icon={CreditCard}
                  />
                  <StatCard
                    label="Total Volume"
                    value={formatNaira(a?.transactions.totalVolume ?? 0)}
                    icon={ArrowUpRight}
                    accent="green"
                  />
                  <StatCard
                    label="This Month"
                    value={a?.transactions.thisMonth ?? 0}
                    icon={Calendar}
                    accent="cyan"
                  />
                  <StatCard
                    label="This Month Volume"
                    value={formatNaira(a?.transactions.thisMonthVolume ?? 0)}
                    accent="green"
                  />
                </>
              )}
            </div>
          </section>

          {/* TRANSFER BREAKDOWN */}
          <section>
            <SectionHeader title="Transfer Breakdown" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {isLoading ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : (
                <>
                  <StatCard
                    label="Total Transfers"
                    value={a?.transfers.total ?? 0}
                    hint={`Volume: ${formatNaira(a?.transfers.totalVolume ?? 0)}`}
                    icon={Send}
                  />
                  <StatCard
                    label="NFC"
                    value={a?.transfers.byType?.NFC ?? 0}
                    icon={Nfc}
                    accent="cyan"
                  />
                  <StatCard
                    label="QR"
                    value={a?.transfers.byType?.QR ?? 0}
                    icon={QrCode}
                    accent="violet"
                  />
                  <StatCard
                    label="Manual"
                    value={a?.transfers.byType?.MANUAL ?? 0}
                    icon={Send}
                    accent="amber"
                  />
                </>
              )}
            </div>
          </section>

          {/* TOP-UP OVERVIEW */}
          <section>
            <SectionHeader title="Top-Up Overview" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {isLoading ? (
                <>
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                  <StatCardSkeleton />
                </>
              ) : (
                <>
                  <StatCard
                    label="Total Top-Ups"
                    value={a?.topUps.total ?? 0}
                    icon={PiggyBank}
                  />
                  <StatCard
                    label="Total Amount"
                    value={formatNaira(a?.topUps.totalAmount ?? 0)}
                    icon={ArrowDownLeft}
                    accent="green"
                  />
                  <StatCard
                    label="This Month"
                    value={a?.topUps.thisMonth ?? 0}
                    hint={`Amount: ${formatNaira(a?.topUps.thisMonthAmount ?? 0)}`}
                    icon={Calendar}
                    accent="cyan"
                  />
                </>
              )}
            </div>
          </section>

          {/* RECENT USERS */}
          <section>
            <SectionHeader
              title="Recent Users"
              seeAllHref="/dashboard/admin/users"
            />
            <div className="space-y-2">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-14 w-full bg-neutral-800/40"
                  />
                ))
              ) : (a?.recentUsers?.length ?? 0) > 0 ? (
                a!.recentUsers.slice(0, 10).map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white truncate">
                          {u.name}
                        </p>
                        <RoleBadge role={u.role} />
                      </div>
                      <p className="text-xs text-neutral-400 truncate">
                        {u.email}
                      </p>
                    </div>
                    <span className="text-[11px] text-neutral-500 shrink-0">
                      {formatLongDate(u.createdAt)}
                    </span>
                  </div>
                ))
              ) : (
                <EmptyState message="No users yet" />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function ErrorPanel({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <Card className="rounded-xl border border-rose-500/30 bg-rose-500/5">
      <CardHeader className="p-4 flex flex-row items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-rose-300">
            Couldn’t load analytics
          </p>
          <p className="text-xs text-rose-200/80 mt-1">{message}</p>
        </div>
        <Button size="sm" variant="outline" onClick={onRetry}>
          Retry
        </Button>
      </CardHeader>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center text-sm text-neutral-500 py-8 border border-dashed border-white/10 rounded-lg">
      {message}
    </div>
  );
}
