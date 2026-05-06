"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">

      {/* CARD */}
      <div className="w-full max-w-md rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl p-6 shadow-2xl">

        {/* TOGGLE */}
        <div className="flex bg-white/5 rounded-lg p-1 mb-6">
          <button
            onClick={() => setMode("signin")}
            className={cn(
              "flex-1 py-2 text-sm rounded-md transition",
              mode === "signin"
                ? "bg-white text-black font-medium"
                : "text-white/60"
            )}
          >
            Sign In
          </button>

          <button
            onClick={() => setMode("signup")}
            className={cn(
              "flex-1 py-2 text-sm rounded-md transition",
              mode === "signup"
                ? "bg-white text-black font-medium"
                : "text-white/60"
            )}
          >
            Sign Up
          </button>
        </div>

        {/* FORMS */}
        <AnimatePresence mode="wait">
          {mode === "signin" ? (
            <motion.div
              key="signin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <SignInForm />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SignUpForm />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
function SignInForm() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold text-white">
        Welcome Back
      </h2>

      <p className="text-xs text-muted-foreground">
        Login to your PayAza account
      </p>

      <Input placeholder="Email address" />
      <Input type="password" placeholder="Password" />

      <button className="w-full h-11 rounded-lg bg-green-500 hover:bg-green-600 transition font-medium text-black">
        Sign In
      </button>

      <p className="text-xs text-center text-muted-foreground">
        Forgot password?
      </p>
    </div>
  );
}
function SignUpForm() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold text-white">
        Create Account
      </h2>

      <p className="text-xs text-muted-foreground">
        Start using PayAza in seconds
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Input placeholder="First name" />
        <Input placeholder="Surname" />
      </div>

      <Input placeholder="Username" />
      <Input placeholder="Email address" />
      <Input placeholder="Phone number" />

      <Input type="password" placeholder="Password" />
      <Input type="password" placeholder="Confirm password" />

      <button className="w-full h-11 rounded-lg bg-green-500 hover:bg-green-600 transition font-medium text-black">
        Create Account
      </button>
    </div>
  );
}
function Input({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full h-11 px-4 rounded-lg
        bg-white/5 border border-white/10
        text-sm text-white placeholder:text-white/30
        outline-none focus:ring-2 focus:ring-green-500
        transition
      "
    />
  );
}