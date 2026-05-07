"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ChartPeriod } from "@/lib/types/api";

const PERIODS: { value: ChartPeriod; label: string }[] = [
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "1y", label: "1Y" },
];

interface PeriodTabsProps {
  value: ChartPeriod;
  onChange: (value: ChartPeriod) => void;
}

export function PeriodTabs({ value, onChange }: PeriodTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(v as ChartPeriod)}
      className="!flex-row"
    >
      <TabsList variant="line" className="h-8">
        {PERIODS.map((p) => (
          <TabsTrigger key={p.value} value={p.value} className="text-xs px-2">
            {p.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
