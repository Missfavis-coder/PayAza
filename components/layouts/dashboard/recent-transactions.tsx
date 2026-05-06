"use client";

import { StatusBadge } from "@/app/dashboard/transactions/_components/status-badge";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTransactions } from "@/lib/hooks/use-dashboard";
import Link from "next/link";

import React from "react";

export interface TransactionUI {
  id: string;
  date: string;
  amount: string;
  wallet: string;
  description: string | null;
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
    id: tx.id,
    date: new Date(tx.createdAt).toLocaleDateString(),
    amount: `₦${Number(tx.amount).toLocaleString()}`,
    wallet: tx.walletId,
    description: tx.description,
    status,
  };
};



function TableSkeleton() {
  return Array.from({ length: 5 }).map((_, i) => (
    <TableRow key={i} className="animate-pulse">
      <TableCell>
        <div className="h-3 w-20 bg-neutral-800 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-16 bg-neutral-800 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-12 bg-neutral-800 rounded" />
      </TableCell>
      <TableCell>
        <div className="h-3 w-14 bg-neutral-800 rounded" />
      </TableCell>
    </TableRow>
  ));
}


const RecentTable = () => {
  const { data, isLoading } = useTransactions();

  const raw = data?.data?.transactions ?? [];

  const transactions: TransactionUI[] = React.useMemo(() => {
    return raw.map(mapTx).slice(0, 5);
  }, [raw]);

  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
        <Link href="/dashboard/transactions" className="underline cursor-pointer hover:text-[#00CF7B]">See more</Link>
      </CardHeader>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Wallet</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableSkeleton />
          ) : transactions.length > 0 ? (
            transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>

                {/* COPY WALLET */}
                <TableCell
                  className="cursor-pointer hover:text-[#00CF7B] transition"
                  onClick={() => navigator.clipboard.writeText(tx.wallet)}
                  title="Click to copy wallet"
                >
                  {tx.wallet.slice(0, 18)}...
                </TableCell>

                <TableCell>{tx.amount}</TableCell>

                <TableCell>
                  <StatusBadge status={tx.status} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No transactions yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RecentTable;