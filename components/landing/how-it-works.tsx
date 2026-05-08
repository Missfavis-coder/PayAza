"use client";

import Link from "next/link";
import {
  UserPlus,
  Smartphone,
  CheckCircle2,
  Wallet,
} from "lucide-react";

const steps = [
  {
    title: "Create & Fund Your Wallet",
    desc: "Sign up in minutes, verify your identity, and fund your TapPay wallet through bank transfer or virtual accounts powered by Payaza.",
    icon: UserPlus,
  },
  {
    title: "Choose Any Payment Method",
    desc: "Pay instantly using NFC tap, QR codes, @handles, or phone numbers — TapPay adapts to your device and environment.",
    icon: Wallet,
  },
  {
    title: "Complete Transactions Instantly",
    desc: "Send and receive real naira securely with instant confirmations, live transaction tracking, and automatic syncing even in low-network conditions.",
    icon: CheckCircle2,
  },
];

export default function HowItWorksPage() {
  return (
    <div id="how-it-works" className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="md:px-8 px-4 pt-24 pb-14 text-center">
        <h1 className="lg:text-5xl text-3xl font-bold">
          How <span className="text-[#00CF7B]">TapPay</span> Works
        </h1>

        <p className="text-neutral-300 mt-6 max-w-2xl mx-auto lg:text-[15px] text-sm leading-relaxed">
          TapPay makes sending and receiving money seamless through fast,
          flexible, and reliable payment experiences built for everyday use.
        </p>
      </section>

      {/* STEPS */}
      <section className="md:px-8 px-4 lg:py-8 md:py-6 py-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={i}
                className="relative p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:-translate-y-1"
              >
                {/* STEP NUMBER */}
                <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#00CF7B] text-black flex items-center justify-center font-bold shadow-lg">
                  {i + 1}
                </div>

                {/* ICON */}
                <div className="bg-[#00CF7B]/10 w-fit p-3 rounded-xl mt-6 mb-5">
                  <Icon className="w-7 h-7 text-[#00CF7B]" />
                </div>

                {/* CONTENT */}
                <h3 className="text-xl font-semibold mb-3">
                  {step.title}
                </h3>

                <p className="text-neutral-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* EXTRA INFO */}
      <section className="px-4 md:px-8 py-24 text-center bg-slate-950/40">
        <h2 className="md:text-3xl text-2xl tracking-wide font-bold">
          Built for Real-World Transactions
        </h2>

        <p className="text-neutral-400 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
          Whether online, offline, in-store, or peer-to-peer, TapPay combines
          NFC technology, QR payments, and secure wallet infrastructure to make
          modern payments faster and more accessible.
        </p>

        <div className="mt-8">
          <Link href="/auth/login">
            <button className="bg-[#00CF7B] text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-400 transition cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}