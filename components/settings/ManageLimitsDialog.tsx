"use client";

import { useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmailSupportDialog } from "@/components/support/EmailSupportDialog";
import { formatNaira } from "@/lib/utils";

interface Props {
  trigger: ReactNode;
}

const LIMITS = [
  { label: "Daily transfer limit", value: 500_000 },
  { label: "Single transfer limit", value: 100_000 },
  { label: "Top-up limit", value: 1_000_000 },
];

export function ManageLimitsDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Account Limits</DialogTitle>
          </DialogHeader>

          <div className="mt-2 space-y-2">
            {LIMITS.map((l) => (
              <div
                key={l.label}
                className="flex items-center justify-between p-3 rounded-md border border-white/10 bg-white/[0.02]"
              >
                <span className="text-sm text-neutral-300">{l.label}</span>
                <span className="text-sm font-semibold text-white">
                  {formatNaira(l.value)}
                </span>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setEmailOpen(true);
              }}
              className="block w-full text-left text-xs text-[#00CF7B] underline-offset-4 hover:underline pt-1"
            >
              Contact Support to increase limits →
            </button>

            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <EmailSupportDialog
        open={emailOpen}
        onOpenChange={setEmailOpen}
        defaultSubject="Request to increase account limits"
        trigger={<span style={{ display: "none" }} />}
      />
    </>
  );
}
