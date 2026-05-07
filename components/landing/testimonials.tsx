"use client";

import Link from "next/link";

const testimonials = [
  {
    name: "Modred O.",
    role: "Startup Founder",
    text: "TapPay made it incredibly easy for us to start accepting payments globally. The Payaza integration is seamless.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sarah K.",
    role: "E-commerce Owner",
    text: "The dashboard is clean and the analytics are super helpful. I can track everything in real time.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Michael T.",
    role: "Product Manager",
    text: "Reliable, fast, and secure. Exactly what we needed for handling transactions at scale.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Amina D.",
    role: "Freelancer",
    text: "I get paid instantly now. No delays, no stress. TapPay changed how I receive payments.",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
];

export default function TestimonialsPage() {
  return (
    <div id="testimonials" className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="md:px-8 px-4 pt-24 pb-10 text-center">
        <h1 className="lg:text-5xl text-3xl font-bold">
          What Our <span className="text-[#00CF7B]">Users Say</span>
        </h1>

        <p className="text-neutral-300 mt-6 max-w-2xl mx-auto md:text-lg text-sm leading-6 tracking-wide">
          Real feedback from individuals and businesses using TapPay every day
          to power their payments.
        </p>
      </section>

      {/* TESTIMONIALS GRID */}
      <section className="md:px-8 px-4 lg:py-12 md:py-6 py-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 bg-black border border-neutral-900 rounded-2xl  transition"
            >
              {/* USER */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full border border-gray-700"
                />

                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-neutral-300 text-sm">{t.role}</p>
                </div>
              </div>

              {/* TEXT */}
              <p className="text-neutral-400 leading-relaxed">
                “{t.text}”
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center bg-black">
        <h2 className="md:text-3xl text-2xl font-bold">
          Join thousands of happy users
        </h2>

        <p className="text-neutral-300 text-sm mt-4">
          Start using TapPay today and experience better payments.
        </p>

        <div className="mt-8">
          <Link href="/auth/login">
            <button className="bg-[#00CF7B] px-8 py-3 rounded-xl font-semibold hover:bg-green-400 transition cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}