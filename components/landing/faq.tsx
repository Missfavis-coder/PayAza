"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What is TapPay?",
    a: "TapPay is a multimodal payment network that allows users and merchants to send and receive real naira using NFC tap, QR codes, usernames, and phone numbers.",
  },
  {
    q: "How do TapPay payments work?",
    a: "Users can complete transactions through multiple payment methods including NFC tap-to-pay, QR scanning, @handles, and verified phone numbers — depending on the device or environment.",
  },
  {
    q: "Does TapPay work without internet?",
    a: "Yes. TapPay supports low-connectivity and offline-ready transactions by securely storing signed transaction requests and syncing them automatically once internet access is restored.",
  },
  {
    q: "Is TapPay secure?",
    a: "Absolutely. TapPay uses biometric authentication, device binding, tokenized transactions, anti-replay protection, and encrypted infrastructure powered by Payaza.",
  },
  {
    q: "Can merchants accept payments with TapPay?",
    a: "Yes. Merchants can turn NFC-enabled Android devices into payment terminals, accept QR payments, and receive instant wallet settlements.",
  },
  {
    q: "How do I fund my TapPay wallet?",
    a: "Users receive virtual accounts powered by Payaza. Bank transfers are automatically credited to the wallet through secure webhook infrastructure.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="faq" className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="md:px-8 px-4 pt-24 pb-10 text-center">
        <h1 className="lg:text-5xl text-3xl font-bold">
          Frequently Asked{" "}
          <span className="text-[#00CF7B]">Questions</span>
        </h1>

        <p className="text-neutral-300 mt-6 max-w-2xl mx-auto md:text-base text-sm leading-relaxed">
          Everything you need to know about TapPay, how transactions work,
          supported payment methods, and platform security.
        </p>
      </section>

      {/* FAQ LIST */}
      <section className="md:px-8 px-4 lg:py-12 md:py-6 py-2">
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/30 backdrop-blur"
              >
                {/* QUESTION */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : i)
                  }
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-[#00CF7B]/5 transition"
                >
                  <span className="font-semibold text-sm md:text-base pr-4">
                    {item.q}
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-[#00CF7B] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-neutral-400 text-sm leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 py-24 text-center">
        <h2 className="md:text-3xl text-2xl font-bold">
          Still have questions?
        </h2>

        <p className="text-neutral-300 mt-4 max-w-xl text-sm tracking-wide mx-auto">
          Learn more about TapPay or create an account to start sending and
          receiving payments seamlessly.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link href="/auth/login">
            <button className="bg-[#00CF7B] px-8 py-3 rounded-xl font-semibold hover:bg-green-400 transition">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}