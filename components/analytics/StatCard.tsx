"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  icon?: LucideIcon;
  accent?: "default" | "green" | "rose" | "cyan" | "violet" | "amber";
  className?: string;
}

const accentMap: Record<NonNullable<StatCardProps["accent"]>, string> = {
  default: "text-foreground",
  green: "text-emerald-400",
  rose: "text-rose-400",
  cyan: "text-cyan-400",
  violet: "text-violet-400",
  amber: "text-amber-400",
};

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "default",
  className,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        "rounded-xl border border-white/10 bg-black/40 text-white",
        className,
      )}
    >
      <CardHeader className="p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-semibold">
            {label}
          </span>
          {Icon ? (
            <div className={cn("p-1.5 rounded-lg bg-white/5", accentMap[accent])}>
              <Icon size={16} />
            </div>
          ) : null}
        </div>

        <div className={cn("mt-2 text-xl font-bold tracking-tight", accentMap[accent])}>
          {value}
        </div>

        {hint ? (
          <p className="text-[11px] text-neutral-500 mt-1">{hint}</p>
        ) : null}
      </CardHeader>
    </Card>
  );
}

export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-xl border border-white/10 bg-black/40",
        className,
      )}
    >
      <CardHeader className="p-4 space-y-3">
        <Skeleton className="h-3 w-24 bg-neutral-800" />
        <Skeleton className="h-6 w-32 bg-neutral-800" />
        <Skeleton className="h-2 w-20 bg-neutral-800" />
      </CardHeader>
    </Card>
  );
}
