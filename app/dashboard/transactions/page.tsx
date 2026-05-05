"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import React, { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ---------------- BACKEND TYPES ---------------- */

type TransactionType = "SUCCESS" | "PENDING" | "FAILED";

interface Transaction {
  id: string;
  description: string | null;
  amount: number; // NAIRA
  walletId: string;
  reference: string | null;
  createdAt: string;
  updatedAt: string;
  type: TransactionType;
}

/* ---------------- UI TYPE ---------------- */

interface TransactionUI {
  id: string;
  date: string;
  amount: string; // ₦ formatted
  wallet: string;
  reference: string;
  status: "Successful" | "Pending" | "Failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "TXN-10001",
    description: "Wallet funding",
    amount: 1500,
    walletId: "WALLET-1",
    reference: "REF-001",
    createdAt: "2026-05-01T10:15:00Z",
    updatedAt: "2026-05-01T10:15:00Z",
    type: "SUCCESS",
  },
  {
    id: "TXN-10002",
    description: "Bank transfer",
    amount: 3000,
    walletId: "WALLET-1",
    reference: null,
    createdAt: "2026-05-02T11:20:00Z",
    updatedAt: "2026-05-02T11:20:00Z",
    type: "PENDING",
  },
  {
    id: "TXN-10003",
    description: "Electricity bill",
    amount: 800,
    walletId: "WALLET-2",
    reference: "REF-003",
    createdAt: "2026-05-02T14:05:00Z",
    updatedAt: "2026-05-02T14:05:00Z",
    type: "FAILED",
  },
  {
    id: "TXN-10004",
    description: "Airtime purchase",
    amount: 500,
    walletId: "WALLET-2",
    reference: "REF-004",
    createdAt: "2026-05-03T09:10:00Z",
    updatedAt: "2026-05-03T09:10:00Z",
    type: "SUCCESS",
  },
  {
    id: "TXN-10005",
    description: "Data subscription",
    amount: 2000,
    walletId: "WALLET-1",
    reference: null,
    createdAt: "2026-05-03T12:40:00Z",
    updatedAt: "2026-05-03T12:40:00Z",
    type: "SUCCESS",
  },
  {
    id: "TXN-10006",
    description: "Wallet topup",
    amount: 10000,
    walletId: "WALLET-3",
    reference: "REF-006",
    createdAt: "2026-05-04T08:25:00Z",
    updatedAt: "2026-05-04T08:25:00Z",
    type: "SUCCESS",
  },
  {
    id: "TXN-10007",
    description: "Transfer to merchant",
    amount: 4500,
    walletId: "WALLET-1",
    reference: "REF-007",
    createdAt: "2026-05-04T15:30:00Z",
    updatedAt: "2026-05-04T15:30:00Z",
    type: "FAILED",
  },
  {
    id: "TXN-10008",
    description: "POS payment",
    amount: 1200,
    walletId: "WALLET-2",
    reference: null,
    createdAt: "2026-05-05T10:00:00Z",
    updatedAt: "2026-05-05T10:00:00Z",
    type: "SUCCESS",
  },
  {
    id: "TXN-10009",
    description: "Subscription fee",
    amount: 2500,
    walletId: "WALLET-3",
    reference: "REF-009",
    createdAt: "2026-05-05T13:45:00Z",
    updatedAt: "2026-05-05T13:45:00Z",
    type: "PENDING",
  },
  {
    id: "TXN-10010",
    description: "Wallet funding",
    amount: 7000,
    walletId: "WALLET-1",
    reference: "REF-010",
    createdAt: "2026-05-05T18:10:00Z",
    updatedAt: "2026-05-05T18:10:00Z",
    type: "SUCCESS",
  },
];
/* ---------------- MAPPER ---------------- */

const mapTx = (tx: Transaction): TransactionUI => {
  const statusMap: Record<TransactionType, TransactionUI["status"]> = {
    SUCCESS: "Successful",
    PENDING: "Pending",
    FAILED: "Failed",
  };

  return {
    id: tx.id,
    date: new Date(tx.createdAt).toLocaleDateString(),
    amount: `₦${tx.amount.toLocaleString()}`,
    wallet: tx.walletId,
    reference: tx.reference ?? "—",
    status: statusMap[tx.type],
  };
};

/* ---------------- STATUS BADGE ---------------- */

const StatusBadge = ({ status }: { status: TransactionUI["status"] }) => {
  const colors = {
    Successful: "text-emerald-500",
    Pending: "text-amber-500",
    Failed: "text-red-500",
  };

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={cn(
          "h-1 w-1 rounded-full",
          status === "Successful"
            ? "bg-emerald-500"
            : status === "Pending"
            ? "bg-amber-500"
            : "bg-red-500"
        )}
      />
      <span className={cn("text-[10px] font-bold uppercase tracking-widest", colors[status])}>
        {status}
      </span>
    </div>
  );
};

/* ---------------- COMPONENT ---------------- */

const BillingContent = () => {
  const [transactions, setTransactions] = useState<TransactionUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "Successful" | "Pending" | "Failed">("all");
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null);

  const router = useRouter();

  /* LOAD MOCK */
  useEffect(() => {
    const t = setTimeout(() => {
      setTransactions(mockTransactions.map(mapTx));
      setLoading(false);
    }, 800);

    return () => clearTimeout(t);
  }, []);

  /* FILTER */
  const filtered = transactions.filter((tx) =>
    filter === "all" ? true : tx.status === filter
  );

  /* DOWNLOAD INVOICE (MOCK BUT REALISTIC) */
  const handleDownload = (tx: TransactionUI) => {
    setDownloadingInvoice(tx.id);

    setTimeout(() => {
      const blob = new Blob(
        [
          `PAYMENT INVOICE\n\n
Transaction ID: ${tx.id}
Amount: ${tx.amount}
Wallet: ${tx.wallet}
Reference: ${tx.reference}
Status: ${tx.status}
Date: ${tx.date}
          `,
        ],
        { type: "text/plain" }
      );

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${tx.id}.txt`;
      a.click();
      URL.revokeObjectURL(url);

      setDownloadingInvoice(null);
    }, 600);
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Transaction History</h2>

        {/* FILTER */}
        <div className="flex gap-2">
          {["all", "Successful", "Pending", "Failed"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "ghost"}
              onClick={() => setFilter(f as any)}
              className="text-xs uppercase"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Wallet</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            ) : filtered.length > 0 ? (
              filtered.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.wallet}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>{tx.reference}</TableCell>
                  <TableCell>
                    <StatusBadge status={tx.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(tx)}
                      disabled={downloadingInvoice === tx.id}
                    >
                      {downloadingInvoice === tx.id ? "..." : <Download size={16} />}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

/* ---------------- PAGE WRAPPER ---------------- */

const BillingPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingContent />
    </Suspense>
  );
};

export default BillingPage;