"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  ShieldAlert,
} from "lucide-react";

import { LiveChatDialog } from "@/components/support/LiveChatDialog";
import { EmailSupportDialog } from "@/components/support/EmailSupportDialog";
import { ReportFraudDialog } from "@/components/support/ReportFraudDialog";
import { cn } from "@/lib/utils";

const COMMON_ISSUES: { question: string; answer: string }[] = [
  {
    question: "Payment not received",
    answer:
      "Payments typically reflect within 5 minutes. If not received after 30 minutes, contact support.",
  },
  {
    question: "Failed transaction reversal",
    answer: "Failed transactions are automatically reversed within 24 hours.",
  },
  {
    question: "Incorrect balance update",
    answer:
      "Pull down to refresh your balance. If the issue persists, contact support.",
  },
  {
    question: "Account verification problems",
    answer:
      "Ensure your details match your BVN. Contact support if the issue continues.",
  },
];

export default function HelpPage() {
  const [reportSubmitted, setReportSubmitted] = useState(false);

  return (
    <div className="flex flex-col flex-1 bg-background px-4 md:px-6 py-6 gap-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Help Center</h1>
        <p className="text-sm text-muted-foreground">
          Find answers or contact support for urgent issues
        </p>
      </div>

      {reportSubmitted ? (
        <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 px-4 py-3 text-sm text-rose-200">
          Your fraud report has been received. Our team will contact you within
          24 hours.
        </div>
      ) : null}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <SupportRow
                icon={<MessageCircle size={18} />}
                title="Live Chat"
                desc="Get instant help from support"
              >
                <LiveChatDialog
                  trigger={
                    <Button size="sm" variant="outline">
                      Start
                    </Button>
                  }
                />
              </SupportRow>

              <SupportRow
                icon={<Mail size={18} />}
                title="Email Support"
                desc="support@tappay.com"
              >
                <EmailSupportDialog
                  trigger={
                    <Button size="sm" variant="outline">
                      Email
                    </Button>
                  }
                />
              </SupportRow>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
            </CardHeader>

            <CardContent className="space-y-1">
              {COMMON_ISSUES.map((item, i) => (
                <IssueItem key={i} {...item} />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <ShieldAlert size={18} />
                Emergency Support
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Use this if you suspect unauthorized activity on your account.
              </p>

              <ReportFraudDialog
                onSubmitted={() => setReportSubmitted(true)}
                trigger={
                  <Button variant="destructive" className="w-full">
                    Report Fraud
                  </Button>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SupportRow({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-white/10">
      <div className="flex items-center gap-3">
        <div className="text-white/70">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function IssueItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "w-full text-left text-sm py-2 border-b border-white/10 last:border-0 transition",
        "hover:text-white",
        open ? "text-white" : "text-muted-foreground",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span>{question}</span>
        {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </div>
      {open ? (
        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
          {answer}
        </p>
      ) : null}
    </button>
  );
}
