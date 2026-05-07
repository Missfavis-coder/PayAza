"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black text-neutral-300">
      {/* TOP SECTION */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="md:flex justify-between md:space-y-2 space-y-8 gap-4">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#00CF7B]/15 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-[#00CF7B]" />
              </div>

              <div>
                <h3 className="text-white text-2xl font-bold">
                  TapPay
                </h3>
                <p className="text-xs text-neutral-500">
                  Modern Payment Infrastructure
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-neutral-300 max-w-sm">
              TapPay enables seamless real-time payments through NFC,
              QR codes, usernames, and phone numbers — designed for
              fast, secure, and reliable financial experiences.
            </p>

            {/* FEATURE TAGS */}
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="flex items-center gap-2 text-xs border border-neutral-800 rounded-full px-3 py-2">
                <Smartphone className="w-3.5 h-3.5 text-[#00CF7B]" />
                NFC Payments
              </div>

              <div className="flex items-center gap-2 text-xs border border-neutral-800 rounded-full px-3 py-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00CF7B]" />
                Secure Transfers
              </div>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h4 className="text-white font-semibold mb-5">
              Platform
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-[#00CF7B] transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/transactions"
                  className="hover:text-[#00CF7B] transition"
                >
                  Transactions
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/settings"
                  className="hover:text-[#00CF7B] transition"
                >
                  Settings
                </Link>
              </li>

              <li>
                <Link
                  href="/auth/login"
                  className="hover:text-[#00CF7B] transition"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-white font-semibold mb-5">
              Company
            </h4>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/features"
                  className="hover:text-[#00CF7B] transition"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-[#00CF7B] transition"
                >
                  How It Works
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="hover:text-[#00CF7B] transition"
                >
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/security"
                  className="hover:text-[#00CF7B] transition"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-6 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>
            © {new Date().getFullYear()} TapPay. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}