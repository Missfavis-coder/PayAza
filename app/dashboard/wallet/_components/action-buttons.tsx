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
import { useState } from "react";

import { ScanModal } from "../../../../components/layouts/dashboard/scan";
import { FundWalletModal } from "../../../../components/layouts/dashboard/fund";
import { WithdrawModal } from "../../../../components/layouts/dashboard/withdraw";

const actions = [
  { label: "Tap", icon: ScanLine },
  { label: "Scan", icon: QrCode },
  { label: "Fund", icon: Plus },
  { label: "Withdraw", icon: ArrowDownToLine }
];

export function ActionRail() {
  const [openScan, setOpenScan] = useState(false);
  const [openFund, setOpenFund] = useState(false);
  const [openWithdraw, setOpenWithdraw] = useState(false);

  const handleClick = (label: string) => {
    if (label === "Scan") setOpenScan(true);
    if (label === "Fund") setOpenFund(true);
    if (label === "Withdraw") setOpenWithdraw(true);
  };

  return (
    <div className="w-full mt-5">
      <div className="px-2 mb-3 text-green-500 font-semibold text-sm">
        Quick Actions
      </div>

      <div className=" px-2 mt-4">
        <div className="grid grid-cols-2 gap-4 pb-2">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <div
                key={action.label}
                onClick={() => handleClick(action.label)}
                className={cn(
                  " flex-shrink-0",
                  "rounded-xl border border-white/10",
                  "bg-white/5 backdrop-blur-md",
                  "lg:p-6 p-4 cursor-pointer",
                  "transition-all duration-200",
                  "hover:scale-[1.03] hover:bg-green-600/10 hover:border-green-500/30",
                  "active:scale-[0.98]"
                )}
              >
                <div className="flex flex-col items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/10">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>

                  <div>
                    <p className="text-sm text-white/90 font-medium">
                      {action.label}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Quick access
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ScanModal open={openScan} onClose={() => setOpenScan(false)} />
      <FundWalletModal open={openFund} onClose={() => setOpenFund(false)} />
      <WithdrawModal open={openWithdraw} onClose={() => setOpenWithdraw(false)} />
    </div>
  );
}