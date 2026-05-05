"use client";

import { cn } from "@/lib/utils";
import {
  ScanLine,
  QrCode,
  User,
  Phone,
  Plus,
  ArrowDownToLine,
} from "lucide-react";

const actions = [
  { label: "Tap", icon: ScanLine },
  { label: "Scan", icon: QrCode },
  { label: "Username", icon: User },
  { label: "Phone", icon: Phone },
  { label: "Fund", icon: Plus },
  { label: "Withdraw", icon: ArrowDownToLine },
];

export function ActionRail() {
  return (
    <div className="w-full overflow-x-auto px-2 mt-4">


      <div className="text-green-500 font-bold px-2">Quick Actions</div>  
      <div className="flex gap-6 py-2">
 
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              className={cn(
                "flex flex-col items-center justify-center gap-2 mt-4",
                "min-w-[80px] px-4 py-3 rounded-md cursor-pointer",
                "bg-white/5 border border-white/10",
                "hover:bg-green-600/10 transition"
              )}
            >
              <Icon className="w-5 h-5 text-white/80" />
              <span className="text-[11px] text-neutral-300">
                {action.label}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
}