"use client";
import React from "react";
import Link from "next/link";

export default function PayazaLanding() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-green-400">PayAza</h1>
        <nav className="space-x-6 hidden md:block">
          <a href="#features" className="hover:text-green-400">
            Features
          </a>
          <a href="#how" className="hover:text-green-400">
            How it Works
          </a>
          <a href="#security" className="hover:text-green-400">
            Security
          </a>
          <a href="#faq" className="hover:text-green-400">
            FAQ
          </a>
        </nav>
        <Link href={"/auth/login"}>
          <button className="bg-green-500 px-4 py-2 rounded-xl text-black font-semibold hover:bg-green-400">
            Get Started
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Smarter Payments with PayAza
          </h2>
          <p className="text-gray-400 mt-6 text-lg">
            PayAza gives you a powerful wallet system with real-time analytics,
            seamless TapPay integration, and secure global transactions.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href={"/auth/login"}>
              <button className="bg-green-500 border border-green-200/40 px-5 py-2 rounded-xl text-black font-semibold hover:bg-green-400">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="grid grid-cols-3 gap-4">
            {["Balance", "Incoming", "Spending"].map((item, i) => (
              <div
                key={i}
                className="bg-black p-4 rounded-xl border border-gray-800"
              >
                <p className="text-gray-400 text-sm">{item}</p>
                <p className="text-xl font-bold">₦0.00</p>
              </div>
            ))}
          </div>
          <div className="mt-6 h-40 bg-gradient-to-r from-green-900 to-green-500 rounded-xl opacity-70" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by growing businesses
          </h2>
          <p className="text-gray-400 mb-16">
            Reliable infrastructure powered by TapPay, built for scale and
            performance.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                num: "99.9%",
                label: "Uptime",
                sub: "Highly reliable infrastructure",
              },
              { num: "1M+", label: "Transactions", sub: "Processed securely" },
              { num: "500+", label: "Businesses", sub: "Trust PayAza daily" },
              { num: "24/7", label: "Support", sub: "Always available" },
            ].map((stat, i) => (
              <div
                key={i}
                className=" bg-gray-900/60 
  backdrop-blur 
  border border-gray-800 
  rounded-2xl 
  p-8 
  transition-all duration-300
  hover:border-green-500 
  hover:shadow-lg hover:shadow-green-500/10
  hover:-translate-y-1"
              >
                <h3 className="text-4xl font-bold text-green-400 mb-2">
                  {stat.num}
                </h3>
                <p className="text-white font-medium">{stat.label}</p>
                <p className="text-gray-500 text-sm mt-2">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
     <section id="features" className="px-8 py-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Powerful Features</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Everything you need to manage payments, scale your business, and deliver seamless financial experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Wallet Management",
                desc: "Manage balances, monitor transactions, and control your funds in real time with a powerful wallet system.",
                icon: "💳"
              },
              {
                title: "TapPay Integration",
                desc: "Seamlessly accept payments, process transactions, and handle payouts using TapPay’s secure infrastructure.",
                icon: "🌍"
              },
              {
                title: "Advanced Analytics",
                desc: "Gain deep insights into your financial data with visual dashboards and real-time reporting tools.",
                icon: "📊"
              },
              {
                title: "Instant Transfers",
                desc: "Send and receive money instantly with minimal latency and high reliability.",
                icon: "⚡"
              },
              {
                title: "Developer Friendly API",
                desc: "Integrate quickly using clean, well-documented APIs built for developers.",
                icon: "🧩"
              },
              {
                title: "Security & Compliance",
                desc: "Enterprise-grade security with encryption, fraud detection, and compliance standards.",
                icon: "🔒"
              }
            ].map((f, i) => (
              <div
                key={i}
                className="group p-8 bg-gray-900/60 backdrop-blur rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition">
                  {f.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
     
      {/* How it works */}
      <section id="how" className="px-8 py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Get started with PayAza in minutes and begin processing payments with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Create Your Account",
                desc: "Sign up in minutes and set up your PayAza wallet to start managing your finances.",
                icon: "👤"
              },
              {
                title: "Connect TapPay",
                desc: "Integrate TapPay بسهولة using our developer-friendly APIs and dashboard tools.",
                icon: "🔗"
              },
              {
                title: "Start Transacting",
                desc: "Send, receive, and track payments in real time with full visibility and control.",
                icon: "⚡"
              }
            ].map((step, i) => (
              <div
                key={i}
                className="relative p-8 bg-gray-900/60 backdrop-blur rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300"
              >
                {/* Step Number */}
                <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-green-500 text-black flex items-center justify-center font-bold shadow-lg">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className="text-3xl mb-4 mt-4">{step.icon}</div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
  <section id="security" className="px-8 py-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Security You Can Trust</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Built with enterprise-grade security to protect your funds, data, and transactions at every level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "End-to-End Encryption",
                desc: "All transactions and sensitive data are encrypted using industry-standard protocols to ensure maximum protection.",
                icon: "🔐"
              },
              {
                title: "Fraud Detection",
                desc: "Advanced monitoring systems detect and prevent suspicious activities in real time.",
                icon: "🛡️"
              },
              {
                title: "Secure APIs",
                desc: "Our APIs are built with strict authentication and authorization layers for safe integrations.",
                icon: "🔑"
              },
              {
                title: "Compliance Ready",
                desc: "Aligned with global financial regulations and best practices for secure payment processing.",
                icon: "📜"
              },
              {
                title: "Data Privacy",
                desc: "User data is handled with strict privacy controls and protection policies.",
                icon: "👁️"
              },
              {
                title: "24/7 Monitoring",
                desc: "Continuous system monitoring ensures uptime, security, and rapid incident response.",
                icon: "⏱️"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 bg-gray-900/60 backdrop-blur rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
     <section className="px-8 py-24 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Businesses and individuals trust PayAza to power their payments every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Modred O.",
                role: "Startup Founder",
                text: "PayAza made it incredibly easy for us to start accepting payments globally. The TapPay integration is seamless.",
                avatar: "https://i.pravatar.cc/100?img=1"
              },
              {
                name: "Sarah K.",
                role: "E-commerce Owner",
                text: "The dashboard is clean and the analytics are super helpful. I can track everything in real time.",
                avatar: "https://i.pravatar.cc/100?img=2"
              },
              {
                name: "Michael T.",
                role: "Product Manager",
                text: "Reliable, fast, and secure. Exactly what we needed for handling transactions at scale.",
                avatar: "https://i.pravatar.cc/100?img=3"
              }
            ].map((t, i) => (
              <div
                key={i}
                className="p-8 bg-black border border-gray-800 rounded-2xl hover:border-green-500 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full border border-gray-700"
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-gray-500 text-sm">{t.role}</p>
                  </div>
                </div>

                <p className="text-gray-400 leading-relaxed">“{t.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">FAQ</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is PayAza?",
              a: "PayAza is a modern payment platform that helps individuals and businesses manage wallets, track transactions, and process payments efficiently using TapPay infrastructure.",
            },
            {
              q: "How does TapPay integration work?",
              a: "PayAza connects directly to TapPay APIs, allowing you to accept payments, send payouts, and manage transactions securely from one dashboard.",
            },
            {
              q: "Is PayAza secure?",
              a: "Yes. PayAza uses encryption, secure APIs, and continuous monitoring to ensure all transactions and user data are protected.",
            },
            {
              q: "Who can use PayAza?",
              a: "PayAza is built for individuals, startups, and businesses that need a reliable way to manage and process payments.",
            },
            {
              q: "Can I track my transactions in real-time?",
              a: "Absolutely. PayAza provides real-time analytics and transaction tracking so you always know what’s happening with your money.",
            },
            {
              q: "How do I get started?",
              a: "Simply create an account, connect your TapPay integration, and start sending or receiving payments instantly.",
            },
          ].map((item, i) => {
            const [open, setOpen] = React.useState(false);
            return (
              <div
                key={i}
                className="border border-gray-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-gray-900"
                >
                  <span className="font-semibold">{item.q}</span>
                  <span className="text-green-400">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <div className="px-6 pb-4 text-gray-400 text-sm">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
         <section className="px-8 py-24 bg-gray-950 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Start using PayAza today
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Simple. Secure. Fast payments powered by TapPay.
          </p>

          <div className="mt-8 flex justify-center">
            <a href="/auth/login">
              <button className="bg-green-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-green-400 transition">
                Get Started
              </button>
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            No setup fees • No hidden charges
          </p>
        </div>
      </section>


      {/* Footer */}
     <footer className="px-8 py-16 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-sm">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">PayAza</h3>
            <p className="text-gray-500">
              Secure, fast, and reliable payments powered by TapPay. Built for modern businesses.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="/dashboard" className="hover:text-green-400">Dashboard</a></li>
              <li><a href="/dashboard/transactions" className="hover:text-green-400">Transactions</a></li>
              <li><a href="/dashboard/settings" className="hover:text-green-400">Settings</a></li>
              <li><a href="/dashboard/help" className="hover:text-green-400">Help Center</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#features" className="hover:text-green-400">Features</a></li>
              <li><a href="#security" className="hover:text-green-400">Security</a></li>
              <li><a href="#faq" className="hover:text-green-400">FAQ</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-green-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} PayAza. All rights reserved.
        </div>
      </footer>
 
    </div>
  );
}
