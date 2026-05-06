"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function WithdrawModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-0 bg-black border-none">

        <div className="flex flex-col justify-between h-[600px] px-5 py-6 text-white">

          {/* TOP */}
          <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
             

              <DialogTitle className="text-lg font-semibold">
                Cashout to Bank
              </DialogTitle>
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Withdraw funds from your TapPay wallet to any external bank account.
            </p>

            {/* Amount */}
            <div className="space-y-2 mb-5">
              <label className="text-white/50 text-sm">
                Amount (₦)
              </label>

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

            {/* Bank */}
            <div className="space-y-2 mb-5">
              <label className="text-white/50 text-sm">
                Select Bank
              </label>

              <input
                type="text"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                placeholder="e.g. Zenith Bank"
                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Account Number */}
            <div className="space-y-2 mb-5">
              <label className="text-white/50 text-sm">
                Account Number
              </label>

              <input
                type="number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="10-digit number"
                className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* BOTTOM */}
          <div className="space-y-4">
            <Button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-4 rounded-xl text-base shadow-lg shadow-green-500/20">
              Withdraw Funds
            </Button>

            <p className="text-center text-white/40 text-xs">
              Settlement time: 1–5 minutes via Payaza Payouts
            </p>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}