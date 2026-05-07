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
import { useReportFraud } from "@/lib/hooks/use-support";

interface Props {
  trigger: ReactNode;
  onSubmitted?: () => void;
}

export function ReportFraudDialog({ trigger, onSubmitted }: Props) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("Unauthorized Activity");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const { mutateAsync, isPending } = useReportFraud();

  useEffect(() => {
    if (!open) {
      setSubject("Unauthorized Activity");
      setReference("");
      setDescription("");
    }
  }, [open]);

  const submit = async () => {
    if (!description.trim()) {
      toast.error("Please describe the issue");
      return;
    }
    try {
      await mutateAsync({
        subject: subject.trim() || "Unauthorized Activity",
        description: description.trim(),
        transactionReference: reference.trim() || undefined,
      });
      toast.success(
        "Fraud report submitted. Our team will contact you within 24 hours.",
      );
      onSubmitted?.();
      setOpen(false);
    } catch {
      // toast already shown by hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-rose-400">Report Fraud</DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Use this only for unauthorized activity. Our team treats these as
            urgent.
          </p>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Subject</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">
              Transaction Reference{" "}
              <span className="text-neutral-600">(optional)</span>
            </label>
            <Input
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="e.g. TXN-1234"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">
              Description <span className="text-rose-400">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what happened, when, and any details that might help…"
              rows={5}
              className="w-full rounded-sm border border-input ring-1 outline-none bg-transparent px-2.5 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            />
          </div>

          <Button
            variant="destructive"
            onClick={submit}
            disabled={isPending}
            className="w-full mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
