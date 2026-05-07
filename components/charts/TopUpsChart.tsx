"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartShell } from "@/components/charts/ChartShell";
import { PeriodTabs } from "@/components/charts/PeriodTabs";
import { useTopUpsChart } from "@/lib/hooks/use-charts";
import { formatNaira } from "@/lib/utils";
import type { ChartPeriod } from "@/lib/types/api";

const ACCENT = "#00CF7B";

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

export function TopUpsChart() {
  const [period, setPeriod] = useState<ChartPeriod>("30d");
  const { data, isLoading, isError, refetch } = useTopUpsChart(period);

  const points = data?.data?.trend ?? [];
  const total = data?.data?.summary?.totalAmount ?? 0;
  const count = data?.data?.summary?.count ?? 0;

  return (
    <ChartShell
      title="Top-Up Trend"
      description={`Total topped up: ${formatNaira(total)} · ${count} top-up${count === 1 ? "" : "s"}`}
      trailing={<PeriodTabs value={period} onChange={setPeriod} />}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      isEmpty={!isLoading && !isError && points.length === 0}
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={points}
          margin={{ top: 5, right: 8, bottom: 0, left: -10 }}
        >
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
            formatter={(value) => [formatNaira(Number(value)), "Top-up"]}
            labelFormatter={(label) => shortDate(String(label))}
          />
          <Bar dataKey="amount" fill={ACCENT} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartShell>
  );
}
