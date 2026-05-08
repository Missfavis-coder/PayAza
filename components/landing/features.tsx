"use client";

import Link from "next/link";
import {
  Smartphone,
  Zap,
  WifiOff,
} from "lucide-react";

/* ---------------- CORE FEATURES (UPDATED) ---------------- */
const coreFeatures = [
  {
    title: "Multi-Mode Payments",
    desc: "Pay your way — NFC tap, QR codes, @handles, or phone numbers. TapPay adapts to any device or situation.",
    icon: Smartphone,
  },
  {
    title: "Tap-to-Pay (Instant NFC)",
    desc: "Turn any NFC-enabled device into a payment terminal. Fast, seamless, and built for real-world interactions.",
    icon: Zap,
  },
  {
    title: "Offline-Ready Transactions",
    desc: "Initiate payments even without internet. Transactions sync automatically when connectivity is restored.",
    icon: WifiOff,
  },
];

export function Features() {
  return (
    <div id="features" className="bg-black text-white">
      {/* HERO */}
      <section className="md:px-8 px-4 pt-24 pb-10 text-center">
        <h1 className="lg:text-5xl text-3xl font-bold">
          Built for{" "}
          <span className="text-[#00CF7B]">Real-World Payments</span>
        </h1>

        <p className="text-neutral-300 mt-6 max-w-2xl mx-auto lg:text-[15px] text-sm">
          TapPay combines speed, flexibility, and reliability to power seamless
          transactions anywhere — online or offline.
        </p>
      </section>

      {/* CORE FEATURES */}
      <section className="md:px-8 px-4 lg:py-12 md:py-6 py-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {coreFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 transition"
              >
                <div className="bg-[#00CF7B]/10 w-fit p-3 rounded-lg mb-4">
                  <Icon className="w-7 h-7 text-[#00CF7B]" />
                </div>

                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-neutral-300 md:text-sm text-[13px] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center bg-slate-950/40">
        <h2 className="md:text-3xl text-2xl font-bold">
          Ready to experience better payments?
        </h2>

        <p className="text-neutral-300 mt-4 text-sm">
          Start using TapPay today and take control of your finances.
        </p>

        <div className="mt-8">
          <Link href="/auth/login">
            <button className="bg-[#00CF7B] text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-400 text-sm transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}