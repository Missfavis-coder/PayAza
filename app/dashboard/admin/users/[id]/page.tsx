"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  Mail,
  Phone,
  RefreshCw,
  Wallet,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { AdminGuard } from "@/components/analytics/AdminGuard";
import { SectionHeader } from "@/components/analytics/SectionHeader";
import { TransactionRow } from "@/components/analytics/TransactionRow";
import { RoleBadge } from "@/components/analytics/UserCard";

import { useAdminUser } from "@/lib/hooks/use-analytics";
import { cn, formatLongDate, formatNaira } from "@/lib/utils";
import type {
  AnalyticsTopUp,
  AnalyticsTransfer,
} from "@/lib/types/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminUserDetailPage({ params }: PageProps) {
  const { id } = use(params);
  return (
    <AdminGuard>
      <AdminUserDetailInner userId={id} />
    </AdminGuard>
  );
}

function AdminUserDetailInner({ userId }: { userId: string }) {
  const router = useRouter();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useAdminUser(userId);

  const d = data?.data;

  return (
    <div className="flex bg-background flex-1 flex-col">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 pb-8 md:pb-10">
        <div className="w-full lg:px-6 px-4 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="text-neutral-300"
          >
            <ArrowLeft size={14} />
            Back
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-neutral-300"
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>

        <div className="px-4 space-y-6">
          {isError ? (
            <Card className="rounded-xl border border-rose-500/30 bg-rose-500/5">
              <CardHeader className="p-4 flex flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-rose-300">
                    Couldn’t load user
                  </p>
                  <p className="text-xs text-rose-200/80 mt-1">
                    {(error as Error)?.message || "Request failed"}
                  </p>
                </div>
                <Button size="sm" variant="outline" onClick={() => refetch()}>
                  Retry
                </Button>
              </CardHeader>
            </Card>
          ) : null}

          {/* USER INFO */}
          <Card className="rounded-2xl border border-white/10 bg-black/40 text-white">
            <CardHeader className="p-5 space-y-3">
              {isLoading ? (
                <>
                  <Skeleton className="h-5 w-48 bg-neutral-800" />
                  <Skeleton className="h-4 w-64 bg-neutral-800" />
                  <Skeleton className="h-4 w-40 bg-neutral-800" />
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-semibold">{d?.user?.name}</h2>
                    {d?.user?.role ? <RoleBadge role={d.user.role} /> : null}
                  </div>
                  <div className="text-xs text-neutral-400 space-y-1">
                    <p className="flex items-center gap-2">
                      <Mail size={12} />
                      {d?.user?.email}
                    </p>
                    {d?.user?.phone ? (
                      <p className="flex items-center gap-2">
                        <Phone size={12} />
                        {d.user.phone}
                      </p>
                    ) : null}
                    <p>Joined {formatLongDate(d?.user?.createdAt)}</p>
                  </div>
                </>
              )}
            </CardHeader>
          </Card>

          {/* WALLET BALANCE */}
          <Card className="rounded-2xl border border-white/10 bg-linear-to-br from-[#00CF7B]/15 via-black/40 to-black/40 text-white">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest text-neutral-300 font-semibold">
                  Wallet Balance
                </span>
                <div className="p-2 rounded-lg bg-[#00CF7B]/20 text-[#00CF7B]">
                  <Wallet size={18} />
                </div>
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-40 bg-neutral-800 mt-3" />
              ) : (
                <>
                  <div className="mt-3 text-2xl font-bold tracking-tight">
                    {formatNaira(Number(d?.wallet?.balance ?? 0))}
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    {d?.wallet?.currency ?? "NGN"}
                  </p>
                </>
              )}
            </CardHeader>
          </Card>

          {/* TRANSFERS SENT */}
          <section>
            <SectionHeader title="Sent Transfers" />
            <TransferList
              transfers={d?.transfers?.sent ?? []}
              isLoading={isLoading}
              direction="SENT"
            />
          </section>

          {/* TRANSFERS RECEIVED */}
          <section>
            <SectionHeader title="Received Transfers" />
            <TransferList
              transfers={d?.transfers?.received ?? []}
              isLoading={isLoading}
              direction="RECEIVED"
            />
          </section>

          {/* TOP-UPS */}
          <section>
            <SectionHeader title="Top-Ups" />
            <TopUpList topUps={d?.topUps ?? []} isLoading={isLoading} />
          </section>

          {/* RECENT TRANSACTIONS */}
          <section>
            <SectionHeader title="Recent Transactions" />
            <div className="space-y-2">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full bg-neutral-800/40" />
                ))
              ) : (d?.transactions?.length ?? 0) > 0 ? (
                d!.transactions.map((tx) => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))
              ) : (
                <Empty message="No transactions" />
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function TransferList({
  transfers,
  isLoading,
  direction,
}: {
  transfers: AnalyticsTransfer[];
  isLoading: boolean;
  direction: "SENT" | "RECEIVED";
}) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full bg-neutral-800/40" />
        ))}
      </div>
    );
  }

  if (transfers.length === 0) {
    return <Empty message={`No ${direction.toLowerCase()} transfers`} />;
  }

  const Icon = direction === "SENT" ? ArrowUpRight : ArrowDownLeft;
  const isOut = direction === "SENT";

  return (
    <div className="space-y-2">
      {transfers.map((t) => (
        <div
          key={t.id}
          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                "p-1.5 rounded-lg",
                isOut
                  ? "bg-rose-500/15 text-rose-400"
                  : "bg-emerald-500/15 text-emerald-400",
              )}
            >
              <Icon size={14} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Badge className="h-5 bg-neutral-500/15 text-neutral-300 border border-neutral-500/30">
                  {t.type}
                </Badge>
                <Badge className="h-5 bg-white/5 text-neutral-300 border border-white/10">
                  {t.status}
                </Badge>
              </div>
              <p className="text-[11px] text-neutral-500 mt-1">
                {formatLongDate(t.createdAt)}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "text-sm font-semibold whitespace-nowrap",
              isOut ? "text-rose-400" : "text-emerald-400",
            )}
          >
            {isOut ? "-" : "+"}
            {formatNaira(t.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}

function TopUpList({
  topUps,
  isLoading,
}: {
  topUps: AnalyticsTopUp[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full bg-neutral-800/40" />
        ))}
      </div>
    );
  }
  if (topUps.length === 0) return <Empty message="No top-ups" />;

  return (
    <div className="space-y-2">
      {topUps.map((t) => (
        <div
          key={t.id}
          className="flex items-center justify-between gap-3 p-3 rounded-lg border border-white/5 bg-white/[0.02]"
        >
          <div className="min-w-0">
            <Badge className="h-5 bg-white/5 text-neutral-300 border border-white/10">
              {t.status}
            </Badge>
            <p className="text-[11px] text-neutral-500 mt-1">
              {formatLongDate(t.createdAt)}
            </p>
          </div>
          <span className="text-sm font-semibold text-emerald-400 whitespace-nowrap">
            +{formatNaira(t.amount)}
          </span>
        </div>
      ))}
    </div>
  );
}

function Empty({ message }: { message: string }) {
  return (
    <div className="text-center text-sm text-neutral-500 py-6 border border-dashed border-white/10 rounded-lg">
      {message}
    </div>
  );
}
