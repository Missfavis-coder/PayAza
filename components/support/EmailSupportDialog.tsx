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
import { useContactSupport } from "@/lib/hooks/use-support";

interface Props {
  trigger: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultSubject?: string;
}

export function EmailSupportDialog({
  trigger,
  open: controlledOpen,
  onOpenChange,
  defaultSubject = "Support Request",
}: Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const { mutateAsync, isPending } = useContactSupport();

  useEffect(() => {
    if (!open) {
      setSubject(defaultSubject);
      setMessage("");
    }
  }, [open, defaultSubject]);

  const submit = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    try {
      await mutateAsync({
        type: "email",
        subject: subject.trim() || defaultSubject,
        message: message.trim(),
      });
      toast.success("Email sent to support team");
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
          <DialogTitle>Email Support</DialogTitle>
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
            <label className="text-xs text-muted-foreground">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your issue…"
              rows={5}
              className="w-full rounded-sm border border-input ring-1 outline-none bg-transparent px-2.5 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            />
          </div>

          <Button
            onClick={submit}
            disabled={isPending}
            className="w-full mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Sending…
              </>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
