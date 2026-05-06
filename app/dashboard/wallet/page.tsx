"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowRightLeft, X, Loader2, CheckCircle2 } from "lucide-react";
import { z } from "zod";

import { WalletCard } from "./_components/wallet-cards";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ActionRail } from "./_components/action-buttons";

export default function Page() {
  const router = useRouter();


  return (
    <div className="lg:p-6 py-4 px-3 lg:space-y-12 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Wallet & Funding</h1>
      </header>
      <ActionRail/>
    </div>
  );
}
