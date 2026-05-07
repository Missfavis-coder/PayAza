"use client";

import { useState, type ReactNode } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/lib/hooks/use-auth";
import { useContactSupport } from "@/lib/hooks/use-support";

interface Message {
  id: string;
  role: "user" | "system";
  text: string;
}

interface Props {
  trigger: ReactNode;
}

export function LiveChatDialog({ trigger }: Props) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      text: "Hi 👋 — how can we help today? Send a message and a support agent will reply within 2 hours.",
    },
  ]);
  const { mutateAsync, isPending } = useContactSupport();

  const send = async () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = {
      id: `${Date.now()}`,
      role: "user",
      text,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      await mutateAsync({
        type: "live_chat",
        subject: "Live Chat",
        message: text,
      });
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-ack`,
          role: "system",
          text: "Message sent! We'll respond within 2 hours.",
        },
      ]);
    } catch {
      // toast already shown by hook
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Live Chat</DialogTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Signed in as{" "}
            <span className="text-white">{user?.name ?? "User"}</span>
            {user?.email ? ` · ${user.email}` : ""}
          </p>
        </DialogHeader>

        <div className="flex flex-col h-[280px] rounded-md border border-white/10 bg-black/30">
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[80%] rounded-lg rounded-br-sm bg-[#00CF7B] text-black px-3 py-2 text-xs"
                    : "mr-auto max-w-[80%] rounded-lg rounded-bl-sm bg-white/5 border border-white/10 text-neutral-200 px-3 py-2 text-xs"
                }
              >
                {m.text}
              </div>
            ))}
          </div>

          <form
            className="flex items-center gap-2 p-2 border-t border-white/10"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none px-2 h-8"
            />
            <Button
              type="submit"
              size="icon-sm"
              disabled={isPending || !input.trim()}
              aria-label="Send"
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Send size={14} />
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
