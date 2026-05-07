"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  downloadInvoice,
  triggerBlobDownload,
} from "@/lib/services/invoices.service";
import type {
  StatementExportParams,
  StatementFormat,
  StatementType,
} from "@/lib/types/api";

interface Props {
  trigger: ReactNode;
  defaultFormat?: StatementFormat;
  defaultType?: StatementType;
  defaultRange?: "current-month" | "last-30-days";
  title?: string;
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

function defaultDates(range: Props["defaultRange"]) {
  const today = new Date();
  if (range === "current-month") {
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    return { startDate: isoDate(start), endDate: isoDate(today) };
  }
  const start = new Date(today);
  start.setDate(start.getDate() - 30);
  return { startDate: isoDate(start), endDate: isoDate(today) };
}

export function StatementExportDialog({
  trigger,
  defaultFormat = "pdf",
  defaultType = "all",
  defaultRange = "last-30-days",
  title = "Download Statement",
}: Props) {
  const [open, setOpen] = useState(false);
  const [format, setFormat] = useState<StatementFormat>(defaultFormat);
  const [type, setType] = useState<StatementType>(defaultType);
  const initial = defaultDates(defaultRange);
  const [startDate, setStartDate] = useState(initial.startDate);
  const [endDate, setEndDate] = useState(initial.endDate);
  const [downloading, setDownloading] = useState(false);

  // Reset on open so the user always sees the latest "today"
  useEffect(() => {
    if (!open) return;
    const next = defaultDates(defaultRange);
    setFormat(defaultFormat);
    setType(defaultType);
    setStartDate(next.startDate);
    setEndDate(next.endDate);
  }, [open, defaultFormat, defaultType, defaultRange]);

  const handleDownload = async () => {
    if (!startDate || !endDate) {
      toast.error("Pick a start and end date");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date must be before end date");
      return;
    }

    const params: StatementExportParams = { format, startDate, endDate, type };
    setDownloading(true);
    try {
      const { blob, filename } = await downloadInvoice(params);
      triggerBlobDownload(blob, filename);
      toast.success("Statement downloaded successfully");
      setOpen(false);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to download statement";
      toast.error(message);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Format</label>
            <Tabs
              value={format}
              onValueChange={(v) => setFormat(v as StatementFormat)}
              className="!flex-row"
            >
              <TabsList className="h-8">
                <TabsTrigger value="pdf" className="text-xs px-3">
                  PDF
                </TabsTrigger>
                <TabsTrigger value="csv" className="text-xs px-3">
                  CSV
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Type</label>
            <Tabs
              value={type}
              onValueChange={(v) => setType(v as StatementType)}
              className="!flex-row"
            >
              <TabsList className="h-8">
                <TabsTrigger value="all" className="text-xs px-3">
                  All
                </TabsTrigger>
                <TabsTrigger value="transfers" className="text-xs px-3">
                  Transfers
                </TabsTrigger>
                <TabsTrigger value="topups" className="text-xs px-3">
                  Top-Ups
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">
                Start date
              </label>
              <Input
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">End date</label>
              <Input
                type="date"
                value={endDate}
                min={startDate || undefined}
                max={isoDate(new Date())}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleDownload}
            disabled={downloading}
            className="w-full mt-2"
          >
            {downloading ? (
              <>
                <Loader2 className="animate-spin" />
                Downloading…
              </>
            ) : (
              "Download"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
