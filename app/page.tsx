"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

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
                : "text-white/60",
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
                : "text-white/60",
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
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-white">Welcome Back</h2>

      <p className="text-xs text-muted-foreground">
        Login to your PayAza account
      </p>

      <Input placeholder="john@payaza.com" label="Email address" />
      <Input type="password" placeholder="Password" label="Enter Password" />

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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>(
    {},
  );

const validatePassword = () => {
  const newErrors: typeof errors = {};

  if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(password)) {
    newErrors.password = "Include at least one uppercase letter";
  } else if (!/[0-9]/.test(password)) {
    newErrors.password = "Include at least one number";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    newErrors.password = "Include at least one special character";
  }

  if (confirmPassword !== password) {
    newErrors.confirm = "Passwords do not match";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

const getStrength = () => {
  if (password.length < 6) return "Weak";

  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (hasUpper && hasNumber && hasSpecial) return "Strong";
  if ((hasUpper && hasNumber) || (hasUpper && hasSpecial) || (hasNumber && hasSpecial)) return "Medium";

  return "Weak";
};
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-white">Create Account</h2>

      <p className="text-xs text-muted-foreground">
        Start using PayAza in seconds
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Input placeholder="John" label="First name" />
        <Input placeholder="Doe" label="Surname" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input placeholder="johndoe" label="Username" />
        <Input label="Phone number" placeholder="08123456789" />{" "}
      </div>
      <Input placeholder="john@payaza.com" label="Email address" />

      <div className="grid grid-cols-2 pb-3 gap-3">
        <PasswordInput
          label="Password"
          value={password}
          setValue={setPassword}
          error={errors.password}
        />

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
          error={errors.confirm}
        />
      </div>

      {password.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Strength: {getStrength()}
        </p>
      )}
      <button className="w-full h-11 rounded-lg bg-green-500 hover:bg-green-600 transition font-medium text-black">
        Create Account
      </button>
    </div>
  );
}
function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>
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
      />{" "}
    </div>
  );
}
function PasswordInput({
  label,
  value,
  setValue,
  error,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  error?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1">
      <label className="text-xs text-muted-foreground">{label}</label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`
            w-full h-11 px-4 pr-10 rounded-lg
            bg-white/5 border
            ${error ? "border-red-500" : "border-white/10"}
            text-sm text-white placeholder:text-white/30
            outline-none focus:ring-2 focus:ring-green-500
          `}
          placeholder="Enter password"
        />

        {/* TOGGLE */}
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
