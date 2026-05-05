"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Landmark, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatToKobo } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function StatsCards() {
  const availableBalance = 15050000;
  const incomingFunds = 3200000;
  const totalSpent = 4850000;

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 px-2">

        {/* 1. Available Balance */}
        <StatCard
          title="Available Balance"
          value={formatToKobo(availableBalance)}
          description="Spendable wallet balance across all payment modes"
          type="cash"
        />

        {/* 2. Incoming Funds */}
        <StatCard
          title="Incoming Transfers"
          value={formatToKobo(incomingFunds)}
          description="Pending and processing payments (NFC, QR, Bank)"
          type="incoming"
        />

        {/* 3. Total Spent */}
        <StatCard
          title="Today’s Spending"
          value={formatToKobo(totalSpent)}
          description="Real-time outflow across all TapPay transactions"
          type="outflow"
        />
      </div>
    </TooltipProvider>
  );
}

function StatCard({
  title,
  value,
  description,
  type,
}: {
  title: string;
  value: string;
  description: string;
  type: "cash" | "incoming" | "outflow";
}) {
  const config = {
    cash: {
      icon: Landmark,
      accent: "bg-cyan-500",
      glow: "from-cyan-500/15",
      text: "text-cyan-400",
    },
    incoming: {
      icon: ArrowDownLeft,
      accent: "bg-green-500",
      glow: "from-green-500/15",
      text: "text-green-400",
    },
    outflow: {
      icon: ArrowUpRight,
      accent: "bg-rose-500",
      glow: "from-rose-500/15",
      text: "text-rose-400",
    },
  }[type];

  const Icon = config.icon;

  return (
    <Card
      className={cn(
        "relative overflow-hidden rounded-xl border backdrop-blur-md",
        "border-white/10 bg-black/40 text-white",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl group"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition",
          `bg-gradient-to-br ${config.glow} via-transparent to-transparent`
        )}
      />

      <CardHeader className="p-4 relative z-10">

        <div className="flex justify-between items-start">
          <CardDescription className="text-[11px] uppercase tracking-widest text-neutral-300 font-semibold">
            {title}
          </CardDescription>

          <div className={cn("p-2 rounded-lg bg-white/5", config.text)}>
            <Icon size={18} />
          </div>
        </div>

        <CardTitle className="text-2xl font-bold tracking-tight">
          {value}
        </CardTitle>

        <p className="text-[11px] text-neutral-500 leading-relaxed mt-2">
          {description}
        </p>
      </CardHeader>

      <div className={cn("absolute -right-10 -bottom-10 opacity-[0.04]", config.text)}>
        <Icon size={160} />
      </div>
    </Card>
  );
}