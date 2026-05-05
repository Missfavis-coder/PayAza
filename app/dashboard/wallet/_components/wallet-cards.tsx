"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type WalletCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
  };
  children?: React.ReactNode;
  hoverColor?: string;
};

export function WalletCard({
  icon,
  title,
  description,
  action,
  children,
  hoverColor = "hover:border-slate-400",
}: WalletCardProps) {
  return (
    <Card
      className={`group w-full transition-all duration-300 shadow-3px ring-1 ring-neutral-800 ${hoverColor}`}
    >
      <CardHeader className="flex flex-row justify-between items-start mb-2">
        <div className="p-3 rounded-2xl group-hover:scale-110 transition-transform">
          {icon}
        </div>

      </CardHeader>

      <CardContent>
        <CardTitle className="text-lg">{title}</CardTitle>

        <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
          {description}
        </p>

        {children ? (
          children
        ) : action ? (
          <button
            onClick={action.onClick}
            disabled={action.disabled}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 dark:hover:bg-cyan-100 dark:text-cyan-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {action.label}
            {action.icon || <ChevronRight size={16} />}
          </button>
        ) : null}
      </CardContent>
    </Card>
  );
}