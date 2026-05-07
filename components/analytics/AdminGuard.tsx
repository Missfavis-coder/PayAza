"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";

export function AdminGuard({ children }: { children: ReactNode }) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  const role = (user?.role ?? "").toUpperCase();
  const isAdmin = role === "ADMIN";

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace("/auth/login");
      return;
    }
    if (!isAdmin) {
      router.replace("/dashboard");
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading || !isAuthenticated || !isAdmin) {
    return (
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-48 bg-neutral-800" />
        <Skeleton className="h-32 w-full bg-neutral-800/50" />
        <Skeleton className="h-32 w-full bg-neutral-800/50" />
      </div>
    );
  }

  return <>{children}</>;
}
