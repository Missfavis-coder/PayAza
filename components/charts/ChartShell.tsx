"use client";

import type { ReactNode } from "react";
import { LineChart as LineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChartShellProps {
  title: string;
  description?: string;
  trailing?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  isEmpty?: boolean;
  emptyMessage?: string;
  height?: number;
  children?: ReactNode;
  className?: string;
}

export function ChartShell({
  title,
  description,
  trailing,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  isEmpty,
  emptyMessage = "No data for this period",
  height = 240,
  children,
  className,
}: ChartShellProps) {
  return (
    <Card className={cn("rounded-xl", className)}>
      <CardHeader className="px-4 flex flex-row items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          {description ? (
            <p className="text-[11px] text-neutral-400 mt-0.5">{description}</p>
          ) : null}
        </div>
        {trailing ? <div className="shrink-0">{trailing}</div> : null}
      </CardHeader>

      <CardContent className="px-4 pt-0">
        {isLoading ? (
          <Skeleton
            className="w-full bg-neutral-800/40 rounded-md"
            style={{ height }}
          />
        ) : isError ? (
          <ErrorState
            message={errorMessage || "Could not load chart data"}
            onRetry={onRetry}
            height={height}
          />
        ) : isEmpty ? (
          <EmptyState message={emptyMessage} height={height} />
        ) : (
          <div style={{ minHeight: height, height }}>{children}</div>
        )}
      </CardContent>
    </Card>
  );
}

function ErrorState({
  message,
  onRetry,
  height,
}: {
  message: string;
  onRetry?: () => void;
  height: number;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-md border border-rose-500/30 bg-rose-500/5"
      style={{ height }}
    >
      <p className="text-sm font-medium text-rose-300">{message}</p>
      {onRetry ? (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-3"
        >
          Retry
        </Button>
      ) : null}
    </div>
  );
}

function EmptyState({ message, height }: { message: string; height: number }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center rounded-md border border-dashed border-white/10 bg-white/2"
      style={{ height }}
    >
      <LineIcon size={28} className="text-neutral-600" />
      <p className="text-xs text-neutral-500 mt-2">{message}</p>
    </div>
  );
}
