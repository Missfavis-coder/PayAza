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
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { SectionHeader } from "@/components/analytics/SectionHeader";
import {
  StatCard,
  StatCardSkeleton,
} from "@/components/analytics/StatCard";
import { TransactionRow } from "@/components/analytics/TransactionRow";
import { SpendingChart } from "@/components/charts/SpendingChart";
import { TopUpsChart } from "@/components/charts/TopUpsChart";
import { TransfersChart } from "@/components/charts/TransfersChart";

import { useAuth } from "@/lib/hooks/use-auth";
import { useUserAnalytics } from "@/lib/hooks/use-analytics";
import { useTransactions } from "@/lib/hooks/use-dashboard";
import { formatNaira } from "@/lib/utils";
import type {
  AnalyticsTransaction,
  Transaction,
} from "@/lib/types/api";

const Page = () => {
  const { user } = useAuth();
  const { data, isLoading, isError, error, refetch, isFetching } =
    useUserAnalytics();

  const a = data?.data;

  // Live recent transactions from /wallet/transactions (limit=5).
  const {
    data: txData,
    isLoading: isLoadingTx,
    isError: isErrorTx,
    refetch: refetchTx,
  } = useTransactions({ limit: 5 });

  const recentTx: AnalyticsTransaction[] = (
    txData?.data?.transactions ?? []
  )
    .slice(0, 5)
    .map(toAnalyticsTransaction);

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
                message={(error as Error)?.message || "Failed to load analytics"}
                onRetry={() => refetch()}
              />
            ) : null}

            {/* WALLET CARD */}
            <section>
              {isLoading ? (
                <WalletCardSkeleton />
              ) : (
                <WalletCard
                  balance={Number(a?.wallet?.balance ?? 0)}
                  currency={a?.wallet?.currency ?? "NGN"}
                />
              )}
            </section>

            {/* CHARTS */}
            <section className="space-y-4">
              <SectionHeader title="Activity Charts" />
              <SpendingChart />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TransfersChart />
                <TopUpsChart />
              </div>
            </section>

            {/* TRANSACTION SUMMARY */}
            <section>
              <SectionHeader title="Transaction Summary" />
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
                      label="This Month"
                      value={a?.transactions.thisMonth ?? 0}
                      icon={Calendar}
                      accent="cyan"
                    />
                    <StatCard
                      label="Total Credit"
                      value={formatNaira(a?.transactions.totalCredit ?? 0)}
                      hint={`This month: ${formatNaira(a?.transactions.thisMonthCredit ?? 0)}`}
                      icon={ArrowDownLeft}
                      accent="green"
                    />
                    <StatCard
                      label="Total Debit"
                      value={formatNaira(a?.transactions.totalDebit ?? 0)}
                      hint={`This month: ${formatNaira(a?.transactions.thisMonthDebit ?? 0)}`}
                      icon={ArrowUpRight}
                      accent="rose"
                    />
                  </>
                )}
              </div>
            </section>

            {/* TRANSFER BREAKDOWN */}
            <section>
              <SectionHeader title="Transfer Breakdown" />
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {isLoading ? (
                  <>
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                  </>
                ) : (
                  <>
                    <StatCard
                      label="Total Sent"
                      value={a?.transfers.sent ?? 0}
                      icon={ArrowUpRight}
                      accent="rose"
                    />
                    <StatCard
                      label="Total Received"
                      value={a?.transfers.received ?? 0}
                      icon={ArrowDownLeft}
                      accent="green"
                    />
                  </>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4 mt-3">
                {isLoading ? (
                  <>
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                    <StatCardSkeleton />
                  </>
                ) : (
                  <>
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

            {/* TOP-UP SUMMARY */}
            <section>
              <SectionHeader title="Top-Up Summary" />
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
                      label="Total Top-Ups"
                      value={a?.topUps.total ?? 0}
                      icon={PiggyBank}
                    />
                    <StatCard
                      label="This Month"
                      value={a?.topUps.thisMonth ?? 0}
                      icon={Calendar}
                      accent="cyan"
                    />
                    <StatCard
                      label="Total Amount"
                      value={formatNaira(a?.topUps.totalAmount ?? 0)}
                      accent="green"
                    />
                    <StatCard
                      label="This Month Amount"
                      value={formatNaira(a?.topUps.thisMonthAmount ?? 0)}
                      accent="green"
                    />
                  </>
                )}
              </div>
            </section>

            {/* RECENT TRANSACTIONS */}
            <section>
              <SectionHeader
                title="Recent Transactions"
                seeAllHref="/dashboard/transactions"
              />
              <div className="space-y-2">
                {isLoadingTx ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      className="h-14 w-full bg-neutral-800/40"
                    />
                  ))
                ) : isErrorTx ? (
                  <ErrorPanel
                    message="Could not load recent transactions"
                    onRetry={() => refetchTx()}
                  />
                ) : recentTx.length > 0 ? (
                  recentTx.map((tx) => (
                    <TransactionRow key={tx.id} tx={tx} />
                  ))
                ) : (
                  <EmptyState message="No transactions yet" />
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

function WalletCard({
  balance,
  currency,
}: {
  balance: number;
  currency: string;
}) {
  return (
    <Card className="rounded-2xl border border-white/10 bg-linear-to-br from-[#00CF7B]/15 via-black/40 to-black/40 text-white overflow-hidden">
      <CardHeader className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-widest text-neutral-300 font-semibold">
            Wallet Balance
          </span>
          <div className="p-2 rounded-lg bg-[#00CF7B]/20 text-[#00CF7B]">
            <Wallet size={18} />
          </div>
        </div>
        <div className="mt-3 text-3xl font-bold tracking-tight">
          {formatNaira(balance)}
        </div>
        <p className="text-[11px] text-neutral-400 mt-1">{currency}</p>
      </CardHeader>
    </Card>
  );
}

function WalletCardSkeleton() {
  return (
    <Card className="rounded-2xl border border-white/10 bg-black/40">
      <CardHeader className="p-5 space-y-3">
        <Skeleton className="h-3 w-32 bg-neutral-800" />
        <Skeleton className="h-9 w-48 bg-neutral-800" />
        <Skeleton className="h-2 w-12 bg-neutral-800" />
      </CardHeader>
    </Card>
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

function toAnalyticsTransaction(tx: Transaction): AnalyticsTransaction {
  return {
    id: tx.id,
    type: tx.type,
    amount: Number(tx.amount ?? 0),
    description: tx.description ?? null,
    createdAt: tx.createdAt,
  };
}
