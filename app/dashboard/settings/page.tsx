"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { LogOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/use-auth";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  const { logout, isLoggingOut, user } = useAuth();

  const handleLogout = () => {
    logout();
  };
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

              <ChangePasswordModal />
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

                  <Button onClick={handleLogout} variant="destructive" className="w-full">
                    <LogOut className=" h-4 w-4" />
                    Logout
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* NOTIFICATIONS */}
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
                  <Button variant="outline" className="w-full">
                    Download Statements
                  </Button>

                  <Button variant="outline" className="w-full">
                    Export Data
                  </Button>

                  <Button variant="outline" className="w-full">
                    Manage Limits
                  </Button>

                  <Button variant="destructive" className="w-full">
                    Close Account
                  </Button>
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
                  <ToggleRow label="Email Alerts" />
                  <ToggleRow label="SMS Alerts" />
                  <ToggleRow label="Transaction Alerts" defaultOn />
                  <ToggleRow label="Security Alerts" defaultOn />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
function EditProfileModal({ profile }: any) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phone: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Updated profile:", form);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* FIRST NAME */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">First Name</label>
            <Input
              value={form.firstName}
              placeholder={profile.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* LAST NAME */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Last Name</label>
            <Input
              value={form.lastName}
              placeholder={profile.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* USERNAME */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Username</label>
            <Input
              value={form.userName}
              placeholder={profile.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              className="mt-1"
            />
          </div>

          {/* SAVE */}
          <Button onClick={handleSave} className="w-full mt-2">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function ChangePasswordModal() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const toggle = (key: keyof typeof show) => {
    setShow((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setError(""); // clear error while typing
  };

  const validate = () => {
    const { currentPassword, newPassword, confirmPassword } = form;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 6 characters and include uppercase, lowercase, and a special character",
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    console.log("Password updated:", form);

    // later: API call here

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Change Password</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M10.29 3.86l-7.07 12.25A1 1 0 004.07 18h15.86a1 1 0 00.85-1.52L13.71 3.86a1 1 0 00-1.72 0z"
              />
            </svg>

            <p className="leading-tight">{error}</p>
          </div>
        )}
        <div className="space-y-3 mt-2">
          {/* CURRENT PASSWORD */}
          <div className="relative">
            <Input
              type={show.current ? "text" : "password"}
              placeholder="Current password"
              value={form.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
              className="pr-10 h-10"
            />
            <button
              type="button"
              onClick={() => toggle("current")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              {show.current ? "Hide" : "Show"}
            </button>
          </div>

          {/* NEW PASSWORD */}
          <div className="relative">
            <Input
              type={show.new ? "text" : "password"}
              placeholder="New password"
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
              className="pr-10 h-10"
            />
            <button
              type="button"
              onClick={() => toggle("new")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              {show.new ? "Hide" : "Show"}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <Input
              type={show.confirm ? "text" : "password"}
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              className="pr-10 h-10"
            />
            <button
              type="button"
              onClick={() => toggle("confirm")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
            >
              {show.confirm ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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

function StatusSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-neutral-800 rounded w-3/4" />
      <div className="h-4 bg-neutral-800 rounded w-1/2" />
      <div className="h-4 bg-neutral-800 rounded w-2/3" />
      <div className="h-4 bg-neutral-800 rounded w-1/3" />
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

function ToggleRow({
  label,
  defaultOn,
}: {
  label: string;
  defaultOn?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked={defaultOn} />
    </div>
  );
}

function StatusItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
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
