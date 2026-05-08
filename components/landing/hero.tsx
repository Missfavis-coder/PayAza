"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="lg:px-8 px-6 md:pt-30 pt-28 pb-20 max-w-6xl mx-auto mt-15 text-center space-y-24">
      
      <div>
        <h2 className="lg:text-5xl md:text-4xl text-3xl font-bold tracking-wide leading-tight">
          Smarter Payments<br/> with {""}
          <span className="text-[#00CF7B]">TapPay</span>
        </h2>

        <p className="text-neutral-300 mt-6 md:text-[15px] text-[13px] max-w-md mx-auto tracking-wide">
          TapPay gives you a powerful wallet system with real-time analytics,
          seamless Payaza integration, and secure global transactions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 ">

          <Link href="/auth/login">
            <button className="bg-[#00CF7B] border border-green-200/40 px-5 py-2 rounded-xl w-full text-white font-semibold hover:bg-green-500 transition cursor-pointer">
              Get Started
            </button>
          </Link>

          <button className="border border-neutral-800 px-5 py-2 rounded-xl hover:border-[#00CF7B] transition cursor-pointer">
            Learn More
          </button>
        </div>

      </div>
      <p className="mt-6 lg-[12px] text-xs md:text-sm text-neutral-500">
            Built for individuals, merchants, startups, and modern businesses.
        </p>
    </section>
  );
}