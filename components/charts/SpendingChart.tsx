"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartShell } from "@/components/charts/ChartShell";
import { PeriodTabs } from "@/components/charts/PeriodTabs";
import { useSpendingChart } from "@/lib/hooks/use-charts";
import { cn, formatNaira } from "@/lib/utils";
import type { ChartPeriod } from "@/lib/types/api";

const GREEN = "#22C55E";
const RED = "#EF4444";

function shortDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

function compactNaira(value: number) {
  if (Math.abs(value) >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  if (Math.abs(value) >= 1_000) return `₦${(value / 1_000).toFixed(0)}k`;
  return `₦${value}`;
}

export function SpendingChart() {
  const [period, setPeriod] = useState<ChartPeriod>("7d");
  const { data, isLoading, isError, refetch } = useSpendingChart(period);

  const inflowSeries = data?.data?.inflow ?? [];
  const outflowSeries = data?.data?.outflow ?? [];
  const summary = data?.data?.summary;
  const totalInflow = summary?.totalInflow ?? 0;
  const totalOutflow = summary?.totalOutflow ?? 0;
  const netFlow = summary?.netFlow ?? totalInflow - totalOutflow;

  // Merge the inflow + outflow arrays into a single per-date row so the
  // recharts AreaChart can plot both series on a shared x-axis.
  const points = (() => {
    const dates = Array.from(
      new Set([
        ...inflowSeries.map((p) => p.date),
        ...outflowSeries.map((p) => p.date),
      ]),
    ).sort();
    const inMap = new Map(inflowSeries.map((p) => [p.date, p.amount]));
    const outMap = new Map(outflowSeries.map((p) => [p.date, p.amount]));
    return dates.map((date) => ({
      date,
      inflow: inMap.get(date) ?? 0,
      outflow: outMap.get(date) ?? 0,
    }));
  })();

  return (
    <ChartShell
      title="Inflow vs Outflow"
      description="Money coming in vs going out"
      trailing={<PeriodTabs value={period} onChange={setPeriod} />}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      isEmpty={!isLoading && !isError && points.length === 0}
    >
      <div className="space-y-3">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={points}
            margin={{ top: 5, right: 8, bottom: 0, left: -10 }}
          >
            <defs>
              <linearGradient id="inflowFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GREEN} stopOpacity={0.4} />
                <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outflowFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={RED} stopOpacity={0.4} />
                <stop offset="100%" stopColor={RED} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#ffffff10" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={shortDate}
              tick={{ fill: "#a3a3a3", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={compactNaira}
              tick={{ fill: "#a3a3a3", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={48}
            />
            <Tooltip
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #ffffff20",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value, name) => [
                formatNaira(Number(value)),
                name === "inflow" ? "Inflow" : "Outflow",
              ]}
              labelFormatter={(label) => shortDate(String(label))}
            />
            <Area
              type="monotone"
              dataKey="inflow"
              stroke={GREEN}
              fill="url(#inflowFill)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="outflow"
              stroke={RED}
              fill="url(#outflowFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/5">
          <Stat label="Total Inflow" value={totalInflow} positive />
          <Stat label="Total Outflow" value={-totalOutflow} negative />
          <Stat
            label="Net Flow"
            value={netFlow}
            positive={netFlow >= 0}
            negative={netFlow < 0}
          />
        </div>
      </div>
    </ChartShell>
  );
}

function Stat({
  label,
  value,
  positive,
  negative,
}: {
  label: string;
  value: number;
  positive?: boolean;
  negative?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-neutral-500">
        {label}
      </p>
      <p
        className={cn(
          "text-sm font-semibold mt-1",
          positive && "text-emerald-400",
          negative && "text-rose-400",
          !positive && !negative && "text-white",
        )}
      >
        {formatNaira(Math.abs(value))}
      </p>
    </div>
  );
}
