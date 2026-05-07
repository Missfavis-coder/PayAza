"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCloseAccount } from "@/lib/hooks/use-account";

interface Props {
  trigger: ReactNode;
}

export function CloseAccountDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const { mutateAsync, isPending } = useCloseAccount();

  useEffect(() => {
    if (!open) setPassword("");
  }, [open]);

  const submit = async () => {
    if (!password) return;
    try {
      await mutateAsync(password);
      setOpen(false);
    } catch {
      // hook shows the toast
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-rose-400 flex items-center gap-2">
            <AlertTriangle size={18} />
            Close Account
          </DialogTitle>
        </DialogHeader>

        <div className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300">
          This action is permanent and cannot be undone. All your data will be
          deleted.
        </div>

        <div className="space-y-2 mt-2">
          <label className="text-xs text-muted-foreground">
            Confirm with your password
          </label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />

          <Button
            variant="destructive"
            onClick={submit}
            disabled={isPending || !password}
            className="w-full mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Closing account…
              </>
            ) : (
              "I understand, close my account"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
