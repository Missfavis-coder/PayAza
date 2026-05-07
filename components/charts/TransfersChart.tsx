"use client";

import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { ChartShell } from "@/components/charts/ChartShell";
import { PeriodTabs } from "@/components/charts/PeriodTabs";
import { useTransfersChart } from "@/lib/hooks/use-charts";
import type { ChartPeriod, TransferType } from "@/lib/types/api";

const COLORS: Record<TransferType, string> = {
  NFC: "#3B82F6",
  QR: "#A855F7",
  MANUAL: "#F97316",
};

const LABELS: Record<TransferType, string> = {
  NFC: "NFC",
  QR: "QR",
  MANUAL: "Manual",
};

export function TransfersChart() {
  const [period, setPeriod] = useState<ChartPeriod>("30d");
  const { data, isLoading, isError, refetch } = useTransfersChart(period);

  const byType = data?.data?.byType;
  const total = byType
    ? (byType.NFC ?? 0) + (byType.QR ?? 0) + (byType.MANUAL ?? 0)
    : 0;

  const segments = (["NFC", "QR", "MANUAL"] as TransferType[])
    .map((type) => ({
      name: LABELS[type],
      type,
      value: byType?.[type] ?? 0,
      color: COLORS[type],
    }))
    .filter((s) => s.value > 0);

  return (
    <ChartShell
      title="Transfer Breakdown"
      description="Distribution by transfer method"
      trailing={<PeriodTabs value={period} onChange={setPeriod} />}
      isLoading={isLoading}
      isError={isError}
      onRetry={() => refetch()}
      isEmpty={!isLoading && !isError && total === 0}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center h-full">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {segments.map((s) => (
                <Cell key={s.type} fill={s.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #ffffff20",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(value) => [`${Number(value)}`, "transfers"]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-widest text-neutral-500">
            Total transfers
          </p>
          <p className="text-2xl font-bold text-white">{total}</p>

          <ul className="space-y-1.5 mt-3">
            {(["NFC", "QR", "MANUAL"] as TransferType[]).map((type) => (
              <li
                key={type}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ background: COLORS[type] }}
                  />
                  <span className="text-neutral-300">{LABELS[type]}</span>
                </span>
                <span className="text-white font-medium">
                  {byType?.[type] ?? 0}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ChartShell>
  );
}
