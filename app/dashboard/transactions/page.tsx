"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, ArrowRight } from "lucide-react";
import React, { useState, useMemo, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
//import { PaymentSuccessModal } from "@/app/components/billing/PaymentSuccessModal";
//import { useQueryClient } from "@tanstack/react-query";
//import { queryKeys } from "@/lib/query/query-keys";
//import { toast } from "sonner";

interface Transaction {
  id: string;
  date: string;
  credits: string;
  amount: string;
  status: "Successful" | "Pending" | "Failed";
  invoiceUrl: string;
}

const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
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
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-widest",
          colors[status]
        )}
      >
        {status}
      </span>
    </div>
  );
};

const BillingContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadingInvoice, setDownloadingInvoice] = useState<string | null>(
    null
  );
  const itemsPerPage = 7;
  //const queryClient = useQueryClient();
  
  const searchParams = useSearchParams();
  const router = useRouter();

  const isSuccess =
    searchParams.get("payment") === "success" &&
    searchParams.get("status") === "succeeded";
  const paymentId = searchParams.get("payment_id");

  const [showSuccessModal, setShowSuccessModal] = useState(isSuccess);

//  useEffect(() => {
   // if (isSuccess) {
   //   queryClient.invalidateQueries({
       // queryKey: queryKeys.dashboard.billing.overview(),
    //  });
    //  queryClient.invalidateQueries({
    //    queryKey: queryKeys.dashboard.billing.transactions(),
    //  });
    //  queryClient.invalidateQueries({
     //   queryKey: queryKeys.dashboard.overview(),
    //  });
   // }
 // }, [isSuccess, queryClient]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("payment");
    params.delete("payment_id");
    params.delete("status");
    router.replace(
      `/dashboard/billing${params.toString() ? `?${params.toString()}` : ""}`
    );
  };

  const handleDownloadInvoice = async (transactionId: string) => {
    try {
      setDownloadingInvoice(transactionId);
      const response = await fetch(`/api/invoice/${transactionId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to download invoice");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${transactionId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
     // toast.error(
    //    error instanceof Error ? error.message : "Failed to download invoice"
     // );
    } finally {
      setDownloadingInvoice(null);
    }
  };

 // const billingInfo = data?.credits;
 // const creditAvailable = billingInfo?.available ?? 0;
 // const usedThisMonth = billingInfo?.usedThisMonth ?? 0e,

 // const transactions = useMemo(
 //   () => transactionsResponse?.data ?? [],
 //   [transactionsResponse]
//  );

//  const totalPages = Math.ceil(transactions?.length / itemsPerPage);
 // const currentItems = transactions.slice(
 //   (currentPage - 1) * itemsPerPage,
 //   currentPage * itemsPerPage
//  );

  return (
    <div className="p-6 lg:p-10 md:space-y-12 space-y-10 w-full pb-8 md:pb-12">


      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base md:text-xl font-bold text-foreground">
            Transaction History
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground text-[9px] md:text-[10px] font-bold uppercase tracking-widest shrink-0 hover:bg-transparent hover:text-muted-foreground cursor-pointeclie"
          >
            Filter
          </Button>
        </div>

        <Card
          className="border-border bg-background overflow-hidden"
          
        >
          <Table className="[&_tr:nth-child(even)]:bg-transparent [&_tr:nth-child(odd)]:bg-transparent whitespace-nowrap">
            <TableHeader className="bg-muted/30">
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                  Date
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                  Amount of Credit
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                  Amount (USD)
                </TableHead>
                <TableHead className="text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                  Status
                </TableHead>
                <TableHead className="text-right text-muted-foreground font-semibold text-xs uppercase tracking-wider">
                  Invoice
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-20 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <p>No transactions found</p>
                    </div>
                  </TableCell>
                </TableRow>
{/** 
              {currentItems.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="border-border bg-transparent hover:bg-white/[0.01] transition-colors"
                >
                  <TableCell className="text-muted-foreground font-medium text-xs md:text-sm">
                    {transaction.date}
                  </TableCell>
                  <TableCell>
                    <span className="font-bold text-foreground text-xs md:text-sm">
                      {formatCredits(transaction.credits)}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium text-muted-foreground text-xs md:text-sm">
                    {transaction.amount}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={transaction.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                      onClick={() => handleDownloadInvoice(transaction.id)}
                      disabled={downloadingInvoice === transaction.id}
                    >
                      {downloadingInvoice === transaction.id ? (
                        <div className="h-4 w-4 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <FiDownload className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}  */}
            </TableBody>
          </Table>

          <div className="p-4 border-t border-border md:flex items-center justify-between bg-white/[0.01] gap-4 md:space-y-0 space-y-2">
            <p className="text-[9px] md:text-[11px] font-bold text-muted-foreground uppercase tracking-widest">

            </p>
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="text-muted-foreground hover:text-foreground text-[9px] md:text-[10px] uppercase font-bold tracking-widest"
              >
                Prev
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground text-[9px] md:text-[10px] uppercase font-bold tracking-widest"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>

    {/**  <PaymentSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        paymentId={paymentId}
      />  */}
    </div>
  );
};

const BillingPage = () => {
  return (
    <Suspense
      fallback={
        <div className="p-10 space-y-8 animate-pulse">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-40 bg-muted rounded-2xl" />
            <div className="h-40 bg-muted rounded-2xl" />
          </div>
          <div className="h-64 bg-muted rounded-2xl" />
        </div>
      }
    >
      <BillingContent />
    </Suspense>
  );
};

export default BillingPage;
