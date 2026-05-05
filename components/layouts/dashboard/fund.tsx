"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function FundWalletModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-black border-none">
        <div className="flex flex-col justify-between h-[520px] px-5 py-6 text-white">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <DialogTitle className="text-lg font-semibold">
                Fund Wallet
              </DialogTitle>
            </div>

            <div className="space-y-2 mb-8">
              <p className="text-green-400 text-sm font-medium">
                Top up via Payaza
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Enter the amount you want to add to your TapPay wallet. We'll
                initiate a secure transaction instantly.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-white/50 text-sm">Amount (₦)</label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-lg">
                  ₦
                </span>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl py-4 pl-10 pr-4 text-lg text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5 flex-wrap">
              {[1000, 5000, 10000, 20000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(String(amt))}
                  className="px-4 py-2 tracking-wide rounded-lg bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition"
                >
                  ₦{amt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-4 rounded-xl text-base shadow-lg shadow-green-500/20">
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
