"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { AdminGuard } from "@/components/analytics/AdminGuard";
import { UserCard } from "@/components/analytics/UserCard";

import { useAdminUsers } from "@/lib/hooks/use-analytics";
import type { AnalyticsUserListItem } from "@/lib/types/api";

const PAGE_SIZE = 20;

export default function AdminUsersListPage() {
  return (
    <AdminGuard>
      <AdminUsersListInner />
    </AdminGuard>
  );
}

function AdminUsersListInner() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [accumulated, setAccumulated] = useState<AnalyticsUserListItem[]>([]);

  // Debounce search input -> committed search (500ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
      setAccumulated([]);
    }, 500);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useAdminUsers({ page, limit: PAGE_SIZE, search });

  const pageUsers = useMemo(() => data?.data?.users ?? [], [data]);
  const meta = data?.data?.meta;

  // Append page results into accumulated list (avoid duplicates by id)
  useEffect(() => {
    if (!pageUsers.length) return;
    setAccumulated((prev) => {
      if (page === 1) return pageUsers;
      const seen = new Set(prev.map((u) => u.id));
      const additions = pageUsers.filter((u) => !seen.has(u.id));
      return [...prev, ...additions];
    });
  }, [pageUsers, page]);

  const hasMore = Boolean(meta && page < meta.totalPages);
  const showInitialSkeleton = isLoading && accumulated.length === 0;

  return (
    <div className="flex bg-background flex-1 flex-col">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 pb-8 md:pb-10">
        <div className="w-full lg:px-6 px-4 flex flex-col gap-3">
          <div>
            <h1 className="md:text-xl text-lg font-medium uppercase">
              All Users
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm mt-1">
              {meta
                ? `${meta.total} total · page ${meta.page} of ${meta.totalPages}`
                : "Browse and search registered users"}
            </p>
          </div>

          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
            />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name or email"
              className="pl-9 bg-black/40 border-white/10 text-white placeholder:text-neutral-500"
            />
          </div>
        </div>

        <div className="px-4 space-y-2">
          {isError ? (
            <Card className="rounded-xl border border-rose-500/30 bg-rose-500/5">
              <CardHeader className="p-4 flex flex-row items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-rose-300">
                    Couldn’t load users
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

          {showInitialSkeleton ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full bg-neutral-800/40" />
            ))
          ) : accumulated.length > 0 ? (
            accumulated.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                onClick={() => router.push(`/dashboard/admin/users/${u.id}`)}
              />
            ))
          ) : (
            <div className="text-center text-sm text-neutral-500 py-8 border border-dashed border-white/10 rounded-lg">
              {search ? `No users match “${search}”` : "No users found"}
            </div>
          )}

          {hasMore ? (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isFetching}
                onClick={() => setPage((p) => p + 1)}
              >
                {isFetching ? "Loading…" : "Load more"}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
