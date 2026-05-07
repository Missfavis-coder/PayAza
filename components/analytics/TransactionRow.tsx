"use client";

import { Badge } from "@/components/ui/badge";
import { cn, formatLongDate, formatNaira } from "@/lib/utils";
import type { AnalyticsTransaction } from "@/lib/types/api";

interface TransactionRowProps {
  tx: AnalyticsTransaction;
  onClick?: () => void;
}

export function TransactionRow({ tx, onClick }: TransactionRowProps) {
  const isCredit = tx.type === "CREDIT";
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center justify-between gap-3 px-3 py-3 rounded-lg",
        "border border-white/5 bg-white/[0.02]",
        onClick && "cursor-pointer hover:bg-white/[0.04] transition-colors",
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Badge
          className={cn(
            "h-5",
            isCredit
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : "bg-rose-500/15 text-rose-400 border border-rose-500/30",
          )}
        >
          {tx.type}
        </Badge>
        <div className="min-w-0">
          <p className="text-sm text-white truncate">
            {tx.description || (isCredit ? "Credit" : "Debit")}
          </p>
          <p className="text-[11px] text-neutral-500">
            {formatLongDate(tx.createdAt)}
          </p>
        </div>
      </div>

      <span
        className={cn(
          "text-sm font-semibold whitespace-nowrap",
          isCredit ? "text-emerald-400" : "text-rose-400",
        )}
      >
        {isCredit ? "+" : "-"}
        {formatNaira(tx.amount)}
      </span>
    </div>
  );
}
