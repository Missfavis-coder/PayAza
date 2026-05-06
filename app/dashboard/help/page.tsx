"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, ShieldAlert } from "lucide-react";

export default function HelpPage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const helpItems = [
    "Payment not received",
    "Failed transaction reversal",
    "Incorrect balance update",
    "Account verification problems",
    "How long do transfers take?",
    "How to secure my account?",
  ];
  const filteredItems = helpItems.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-background px-4 md:px-6 py-6 gap-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Help Center</h1>
        <p className="text-sm text-muted-foreground">
          Find answers or contact support for urgent issues
        </p>
      </div>

      {/* SEARCH (PRIMARY ENTRY POINT) */}
      <Card
        className="relative overflow-visible z-50"
        onMouseLeave={() => setFocused(false)}
       
      >
        <CardHeader>
          <CardTitle>Search for help</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="relative">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
               onMouseEnter={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Search payments, transfers, account issues..."
              className="outline-none border-neutral-800 border w-full rounded-md p-3 focus:ring-1 focus:ring-[#00CF7B]"
            />

            {/* DROPDOWN */}
            {focused && (
              <div className="absolute left-0 right-0 top-full mt-2 z-[9999] bg-black/95 border border-white/10 rounded-lg shadow-xl overflow-hidden">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, i) => (
                    <div
                      key={i}
                       onMouseDown={() => setQuery(item)}
                      className="px-3 py-2 text-sm text-muted-foreground hover:text-white hover:bg-white/5 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* MAIN SUPPORT ACTIONS */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <SupportAction
                icon={<MessageCircle size={18} />}
                title="Live Chat"
                desc="Get instant help from support"
                action="Start"
              />

              <SupportAction
                icon={<Mail size={18} />}
                title="Email Support"
                desc="support@payaza.com"
                action="Email"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <IssueItem text="Payment not received" />
              <IssueItem text="Failed transaction reversal" />
              <IssueItem text="Incorrect balance update" />
              <IssueItem text="Account verification problems" />
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE (CRITICAL ACTIONS ONLY) */}
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

              <Button variant="destructive" className="w-full">
                Report Fraud
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
function SupportAction({
  icon,
  title,
  desc,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  action: string;
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

      <Button size="sm" variant="outline">
        {action}
      </Button>
    </div>
  );
}
function IssueItem({ text }: { text: string }) {
  return (
    <div className="text-sm py-2 border-b border-white/10 last:border-0 text-muted-foreground hover:text-white transition">
      {text}
    </div>
  );
}
