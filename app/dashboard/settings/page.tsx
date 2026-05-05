"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const profile = {
    firstName: "Ojo",
    lastName: "Adeshola",
    userName: "ojo_adeshola",
    email: "adeshola@payaza.com",
    phone: "+234 801 234 5678",
  };

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

              <EditProfileModal profile={profile} />
            </CardHeader>

            <CardContent className="space-y-3">
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <div className="space-y-3 text-sm">
                  <Row label="First Name" value={profile.firstName} />
                  <Row label="Last Name" value={profile.lastName} />
                  <Row label="User Name" value={profile.userName} />
                  <Row label="Email" value={profile.email} />
                  <Row label="Phone" value={profile.phone} />
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

                  <Button variant="destructive" className="w-full">
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
            />
          </div>

          {/* LAST NAME */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Last Name</label>
            <Input
              value={form.lastName}
              placeholder={profile.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>

          {/* USERNAME */}
          <div className="space-y-1">
            <label className="text-xs text-muted-foreground">Username</label>
            <Input
              value={form.userName}
              placeholder={profile.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
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

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setError(""); // clear error while typing
  };

  const validate = () => {
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required");
      return false;
    }

    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return false;
    }

    if (form.newPassword !== form.confirmPassword) {
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

        <div className="space-y-3 mt-2">
          {/* CURRENT PASSWORD */}
          <Input
            type="password"
            placeholder="Current password"
            value={form.currentPassword}
            onChange={(e) => handleChange("currentPassword", e.target.value)}
          />

          {/* NEW PASSWORD */}
          <Input
            type="password"
            placeholder="New password"
            value={form.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
          />

          {/* CONFIRM PASSWORD */}
          <Input
            type="password"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />

          {/* ERROR DISPLAY */}
          {error && <p className="text-xs text-red-400">{error}</p>}

          <Button onClick={handleSubmit} className="w-full">
            Update Password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
function ProfileSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="h-10 bg-white/5 rounded" />
        <div className="h-10 bg-white/5 rounded" />
      </div>
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 w-40 bg-white/5 rounded" />
    </div>
  );
}

function SecuritySkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 bg-white/5 rounded" />
    </div>
  );
}

function NotificationSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-6 bg-white/5 rounded" />
      <div className="h-6 bg-white/5 rounded" />
      <div className="h-6 bg-white/5 rounded" />
      <div className="h-6 bg-white/5 rounded" />
    </div>
  );
}

function ActionSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 bg-white/5 rounded" />
    </div>
  );
}

function StatusSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-white/5 rounded w-3/4" />
      <div className="h-4 bg-white/5 rounded w-1/2" />
      <div className="h-4 bg-white/5 rounded w-2/3" />
      <div className="h-4 bg-white/5 rounded w-1/3" />
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
