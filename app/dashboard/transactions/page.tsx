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
import React, { useState } from "react";
import { StatusBadge } from "./_components/status-badge";
import { useTransactions } from "@/lib/hooks/use-dashboard";


type TransactionType = "CREDIT" | "DEBIT";

export interface TransactionUI {
  id: string;
  date: string;
  amount: string;
  wallet: string;
  reference: string;
  description: string | null ;
  status: "Successful" | "Pending" | "Failed";
}


const mapTx = (tx: any): TransactionUI => {
  const status =
    tx.type === "CREDIT"
      ? "Successful"
      : tx.type === "DEBIT"
      ? "Failed"
      : "Pending";

  return {
    id: tx?.id ?? "",
    date: tx?.createdAt
      ? new Date(tx.createdAt).toLocaleDateString()
      : "—",
    amount: `₦${Number(tx?.amount ?? 0).toLocaleString()}`,
    description: tx?.description,
    wallet: tx?.walletId ?? "—",
    reference: tx?.reference ?? "—",
    status,
  };
};




const TableSkeleton = () => {
  return Array.from({ length: 6 }).map((_, i) => (
    <TableRow key={i} className="animate-pulse">
      <TableCell><div className="h-3 w-20 bg-neutral-800 rounded" /></TableCell>
      <TableCell><div className="h-3 w-16 bg-neutral-800 rounded" /></TableCell>
      <TableCell><div className="h-3 w-12 bg-neutral-800 rounded" /></TableCell>
      <TableCell><div className="h-3 w-24 bg-neutral-800 rounded" /></TableCell>
      <TableCell><div className="h-3 w-14 bg-neutral-800 rounded" /></TableCell>
      <TableCell className="text-right">
        <div className="h-6 w-10 bg-neutral-800 rounded ml-auto" />
      </TableCell>
    </TableRow>
  ));
};

/* ---------------- COMPONENT ---------------- */

const TransactionContent = () => {
  const [filter, setFilter] = useState<
    "all" | "Successful" | "Pending" | "Failed"
  >("all");

  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(null);

  const { data, isLoading } = useTransactions();

  const rawTransactions = data?.data?.transactions ?? [];

  const transactions: TransactionUI[] = React.useMemo(() => {
    return rawTransactions.map(mapTx);
  }, [rawTransactions]);

  const filtered = transactions.filter((tx) =>
    filter === "all" ? true : tx.status === filter
  );

  const handleDownload = (tx: TransactionUI) => {
    setDownloadingInvoice(tx.id);

    setTimeout(() => {
      const blob = new Blob(
        [
          `PAYMENT INVOICE\n\nTransaction ID: ${tx.id}\nAmount: ${tx.amount}\nWallet: ${tx.wallet}\nReference: ${tx.reference}\nStatus: ${tx.status}\nDate: ${tx.date}`,
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

        <div className="flex gap-2">
          {["all", "Successful", "Pending", "Failed"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "ghost"}
              onClick={() => setFilter(f as any)}
              className="text-xs uppercase cursor-pointer"
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
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableSkeleton />
            ) : filtered.length > 0 ? (
              filtered.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell className="cursor-pointer select-none hover:text-[#00CF7B] transition"
                    onClick={() => {
                      if (tx.wallet) {
                        navigator.clipboard.writeText(tx.wallet);
                      }
                    }}
                    title="Click to copy full description"
                  >
                    {tx.wallet ? tx.wallet.length > 16 ? `${tx.wallet.slice(0, 16)}...` : tx.wallet : "_"}
                  </TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                    {tx.description}
                  </TableCell>
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



const TransactionPage = () => {
  return <TransactionContent />;
};

export default TransactionPage;