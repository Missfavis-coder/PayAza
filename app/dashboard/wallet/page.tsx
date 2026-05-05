"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowRightLeft, X, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";

import { WalletCard } from "./_components/wallet-cards";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ActionRail } from "@/components/layouts/dashboard/action-buttons";

export default function Page() {
  const router = useRouter();

  const [wallet, setWallet] = useState({
    ngn: 50000,
    points: 20000,
  });

  const [pin, setPin] = useState("");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  // FUNDING
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fundingData, setFundingData] = useState<null | any>(null);

  // EXCHANGE
  const [exchangeModal, setExchangeModal] = useState<
    null | "buy" | "sell" | "withdraw"
  >(null);
  const [inputValue, setInputValue] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateTransfer = () => {
    console.log({ amount, recipient });
  };

  // ZOD SCHEMA
  const getSchema = (type: "buy" | "sell") =>
    z.object({
      amount: z
        .string()
        .regex(/^\d+$/, "Only numbers allowed")
        .refine(
          (val) => {
            const num = Number(val);
            return type === "buy" ? num >= 100 : num >= 1000;
          },
          {
            message:
              type === "buy"
                ? "Minimum amount is ₦100"
                : "Minimum is 1,000 points",
          },
        ),
    });

  // FUND WALLET
  const handleInitializeFunding = () => {
    setOpenModal(true);
    setLoading(true);
    setFundingData(null);

    setTimeout(() => {
      setFundingData({
        funding_id: `FUND_${Math.floor(Math.random() * 1000000)}`,
        payment_url: "https://mock-payments.kobocore.io/pay",
        bank_name: "KoboCore Bank",
        account_number: "0123456789",
        account_name: "Ojo Adeshola",
      });
      setLoading(false);
    }, 2000);
  };
  const handleTransfer = () => {
    setExchangeModal("buy");
    setInputValue("");
    setResult(null);
    setError(null);
  };

  const handleAction = () => {
    setError(null);
    const value = Number(inputValue);

    if (exchangeModal !== "withdraw") {
      const schema = getSchema(exchangeModal as "buy" | "sell");
      const parsed = schema.safeParse({ amount: inputValue });

      if (!parsed.success) {
        setError(parsed.error.issues[0].message);
        return;
      }
    }

    if (pin.length < 4) {
      setError("Enter your 4-digit transaction PIN");
      return;
    }

    setLoadingAction(true);

    setTimeout(() => {
      if (exchangeModal === "buy") {
        const points = value * 100;

        setWallet((prev) => ({
          ngn: prev.ngn - value,
          points: prev.points + points,
        }));

        setResult({
          title: "Points Purchased",
          desc: `₦${value.toLocaleString()} converted to ${points.toLocaleString()} points`,
        });

        toast.success("Points Purchased", {
          description: `${points.toLocaleString()} points added to your wallet`,
        });
      }

      if (exchangeModal === "sell") {
        setWallet((prev) => ({
          ngn: prev.ngn + value,
          points: prev.points - value,
        }));

        setResult({
          title: "Conversion Successful",
          desc: `${value.toLocaleString()} points converted to ₦${value.toLocaleString()}`,
        });

        toast.success("Conversion Successful", {
          description: `₦${value.toLocaleString()} credited to your wallet`,
        });
      }

      if (exchangeModal === "withdraw") {
        setResult({
          title: "Withdrawal Initiated",
          desc: "Your withdrawal request is being processed",
        });

        toast.success("Withdrawal Initiated", {
          description: "Funds will arrive in your bank shortly",
        });
      }

      setLoadingAction(false);
    }, 1500);
  };

  return (
    <div className="lg:p-6 py-4 px-3 lg:space-y-12 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Wallet & Funding</h1>
      </header>
      <ActionRail />
      <div className="grid gap-8">
        {/* LEFT */}
        <div className="flex flex-col sm:flex-row lg:gap-6 gap-3">
          <WalletCard
            icon={<Plus className="text-cyan-600" size={24} />}
            title="Fund Wallet"
            description="Add funds via bank transfer."
            hoverColor="hover:border-emerald-500"
            action={{
              label: "Initialize Funding",
              onClick: handleInitializeFunding,
            }}
          />

          <WalletCard
            icon={<ArrowRightLeft className="text-slate-500" size={24} />}
            title="Points Exchange"
            description="Convert between Naira and Points instantly."
            hoverColor="hover:border-blue-500"
            action={{
              label: "Transfer",
              onClick: handleInitializeFunding,
            }}
          />
        </div>
      </div>
    </div>
  );
}
