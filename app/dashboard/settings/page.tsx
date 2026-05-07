"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { ChangePasswordDialog } from "@/components/settings/ChangePasswordDialog";
import { CloseAccountDialog } from "@/components/settings/CloseAccountDialog";
import { ManageLimitsDialog } from "@/components/settings/ManageLimitsDialog";
import { StatementExportDialog } from "@/components/settings/StatementExportDialog";

import { useAuth } from "@/lib/hooks/use-auth";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const { logout, user } = useAuth();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-background px-4 md:px-6 py-6 gap-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your identity, security and account preferences
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* PROFILE CARD */}
          <Card className="relative">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <div className="space-y-3 text-sm">
                  <Row label="Full Name" value={user?.name || "—"} />
                  <Row label="Role" value={user?.role || "—"} />
                  <Row label="Email" value={user?.email || "—"} />
                  <Row label="Phone" value={user?.phone || "—"} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* SECURITY */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Security & Access</CardTitle>

              <ChangePasswordDialog
                trigger={
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                }
              />
            </CardHeader>

            <CardContent className="space-y-4">
              {loading ? (
                <SecuritySkeleton />
              ) : (
                <>
                  <SecurityRow label="Two-Factor Authentication (2FA)" />
                  <SecurityRow label="Login Alerts" toggle />
                  <SecurityRow label="Device Management" />

                  <Separator />

                  <Button
                    onClick={() => logout()}
                    variant="destructive"
                    className="w-full"
                  >
                    <LogOut className=" h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Control</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {loading ? (
                <ActionSkeleton />
              ) : (
                <>
                  <StatementExportDialog
                    title="Download Statement"
                    defaultFormat="pdf"
                    defaultType="all"
                    defaultRange="last-30-days"
                    trigger={
                      <Button variant="outline" className="w-full">
                        Download Statements
                      </Button>
                    }
                  />

                  <StatementExportDialog
                    title="Export Data"
                    defaultFormat="csv"
                    defaultType="all"
                    defaultRange="current-month"
                    trigger={
                      <Button variant="outline" className="w-full">
                        Export Data
                      </Button>
                    }
                  />

                  <ManageLimitsDialog
                    trigger={
                      <Button variant="outline" className="w-full">
                        Manage Limits
                      </Button>
                    }
                  />

                  <CloseAccountDialog
                    trigger={
                      <Button variant="destructive" className="w-full">
                        Close Account
                      </Button>
                    }
                  />
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {loading ? (
                <NotificationSkeleton />
              ) : (
                <>
                  <PreferenceRow label="Email Alerts" />
                  <PreferenceRow label="SMS Alerts" />
                  <PreferenceRow label="Transaction Alerts" defaultOn />
                  <PreferenceRow label="Security Alerts" defaultOn />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="h-10 bg-neutral-800 rounded" />
        <div className="h-10 bg-neutral-800 rounded" />
      </div>
      <div className="h-10 bg-neutral-800 rounded" />
      <div className="h-10 bg-neutral-800 rounded" />
      <div className="h-10 w-40 bg-neutral-800 rounded" />
    </div>
  );
}

function SecuritySkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 bg-neutral-800 rounded" />
      <div className="h-10 bg-neutral-800 rounded" />
      <div className="h-10 bg-neutral-800 rounded" />
      <div className="h-10 bg-neutral-800 rounded" />
    </div>
  );
}

function NotificationSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-neutral-800 rounded" />
      <div className="h-6 bg-neutral-800 rounded" />
      <div className="h-6 bg-neutral-800 rounded" />
      <div className="h-6 bg-neutral-800 rounded" />
    </div>
  );
}

function ActionSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 bg-neutral-800 rounded" />
      <div className="h-10 bg-neutral-800 rounded" />
      <div className="h-10 bg-neutral-800 rounded" />
      <div className="h-10 bg-neutral-800 rounded" />
    </div>
  );
}

function SecurityRow({
  label,
  toggle = false,
}: {
  label: string;
  toggle?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      {toggle ? (
        <Switch />
      ) : (
        <Button size="sm" variant="outline">
          Open
        </Button>
      )}
    </div>
  );
}

function PreferenceRow({
  label,
  defaultOn,
}: {
  label: string;
  defaultOn?: boolean;
}) {
  const [enabled, setEnabled] = useState(Boolean(defaultOn));
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch
        checked={enabled}
        onCheckedChange={(next) => {
          setEnabled(next);
          toast.success("Preferences saved");
        }}
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-white/90">{value}</span>
    </div>
  );
}
