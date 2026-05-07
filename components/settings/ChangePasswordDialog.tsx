"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useChangePassword } from "@/lib/hooks/use-account";

interface Props {
  trigger: ReactNode;
}

export function ChangePasswordDialog({ trigger }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [error, setError] = useState("");

  const { mutateAsync, isPending } = useChangePassword();

  useEffect(() => {
    if (!open) {
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShow({ current: false, next: false, confirm: false });
      setError("");
    }
  }, [open]);

  const change = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const validate = () => {
    const { currentPassword, newPassword, confirmPassword } = form;
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;
    try {
      await mutateAsync({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setOpen(false);
    } catch {
      // toast already shown by hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        {error ? (
          <div
            role="alert"
            className="rounded-md border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-300"
          >
            {error}
          </div>
        ) : null}

        <div className="space-y-3 mt-2">
          <PasswordField
            placeholder="Current password"
            value={form.currentPassword}
            onChange={(v) => change("currentPassword", v)}
            visible={show.current}
            onToggle={() => setShow((s) => ({ ...s, current: !s.current }))}
          />
          <PasswordField
            placeholder="New password (min 8 characters)"
            value={form.newPassword}
            onChange={(v) => change("newPassword", v)}
            visible={show.next}
            onToggle={() => setShow((s) => ({ ...s, next: !s.next }))}
          />
          <PasswordField
            placeholder="Confirm new password"
            value={form.confirmPassword}
            onChange={(v) => change("confirmPassword", v)}
            visible={show.confirm}
            onToggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
          />

          <Button
            onClick={submit}
            disabled={isPending}
            className="w-full mt-2"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Updating…
              </>
            ) : (
              "Update Password"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PasswordField({
  placeholder,
  value,
  onChange,
  visible,
  onToggle,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  visible: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-9 h-10"
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
      >
        {visible ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  );
}
