"use client";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartData = [
  { date: "2026-01-01", income: 25000, expense: 12000 },
  { date: "2026-01-03", income: 0, expense: 8000 },
  { date: "2026-01-05", income: 12000, expense: 6000 },
  { date: "2026-01-07", income: 0, expense: 4500 },
  { date: "2026-01-10", income: 30000, expense: 18000 },
  { date: "2026-01-12", income: 0, expense: 9000 },
  { date: "2026-01-15", income: 5000, expense: 3000 },
  { date: "2026-01-18", income: 0, expense: 7000 },
  { date: "2026-01-20", income: 15000, expense: 11000 },
  { date: "2026-01-22", income: 0, expense: 5000 },
  { date: "2026-01-25", income: 40000, expense: 25000 },

  { date: "2026-02-01", income: 0, expense: 10000 },
  { date: "2026-02-05", income: 20000, expense: 12000 },
  { date: "2026-02-10", income: 0, expense: 9000 },
  { date: "2026-02-15", income: 35000, expense: 21000 },
  { date: "2026-02-20", income: 0, expense: 14000 },
  { date: "2026-02-25", income: 18000, expense: 13000 },

  { date: "2026-03-01", income: 42000, expense: 26000 },
  { date: "2026-03-05", income: 0, expense: 9000 },
  { date: "2026-03-10", income: 30000, expense: 20000 },
  { date: "2026-03-15", income: 0, expense: 15000 },
  { date: "2026-03-20", income: 25000, expense: 18000 },
  { date: "2026-03-25", income: 50000, expense: 32000 },
  { date: "2026-03-29", income: 12000, expense: 40000 },
];

const formatKobo = (kobo: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(kobo / 100);
};

const chartConfig = {
  income_kobo: {
    label: "Income",
    color: "var(--color-income)",
  },
  expense_kobo: {
    label: "Expenses",
    color: "var(--color-expense)",
  },
} satisfies ChartConfig;

export default function TapPayLanding() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  React.useEffect(() => {
    if (isMobile) setTimeRange("90d");
  }, [isMobile]);
  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();

    let days = 90;
    if (timeRange === "30d") days = 30;
    if (timeRange === "7d") days = 7;

    const start = new Date(referenceDate);
    start.setDate(start.getDate() - days);

    return date >= start;
  });
  return (
    <div className="bg-black dark text-white min-h-screen font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-8 py-5 border-b border-gray-800 bg-black/80 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-green-400">TapPay</h1>

        <nav className="space-x-6 hidden md:block">
          <a href="#features" className="hover:text-green-400 transition">
            Features
          </a>

          <a href="#how" className="hover:text-green-400 transition">
            How it Works
          </a>

          <a href="#security" className="hover:text-green-400 transition">
            Security
          </a>

          <a href="/dashboard" className="hover:text-green-400 transition">
            Dashboard
          </a>
        </nav>

        <Link href={"/auth/login"}>
          <button className="group relative overflow-hidden bg-green-500 px-4 py-2 rounded-lg text-sm text-black font-semibold transition-all duration-300 hover:bg-green-400 shadow-md shadow-green-500/10">
            <span className="relative z-10 flex items-center gap-1">
              Get Started
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </span>

            <span className="absolute inset-0 -translate-x-full bg-white/10 skew-x-12 group-hover:translate-x-full transition-transform duration-700"></span>
          </button>
        </Link>
      </header>
      {/* Hero Section */}
      <section className="px-8 py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-5xl font-bold leading-tight">
            Smarter Payments with TapPay
          </h2>
          <p className="text-gray-400 mt-6 text-lg">
            TapPay gives you a powerful wallet system with real-time analytics,
            seamless PayAza integration, and secure global transactions.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href={"/auth/login"}>
              <button className="bg-green-500 border border-green-200/40 px-5 py-2 rounded-xl text-black font-semibold hover:bg-green-400">
                Get Started
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-900 rounded-3xl p-4 sm:p-5 border border-gray-800 shadow-xl">
          {" "}
          {/* Cards */}{" "}
          <div className="grid xs:grid-cols-2  sm:grid-cols-3 md:grid-cols-2  lg:grid-cols-3 gap-3">
            {" "}
            {[
              { label: "Balance", value: "₦120,000.00" },
              { label: "Incoming", value: "₦45,000.00" },
              { label: "Spending", value: "₦12,900.75" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-black border border-gray-800 rounded-xl p-3"
              >
                {" "}
                <p className="text-gray-500 text-[10px] sm:text-xs">
                  {" "}
                  {item.label}{" "}
                </p>{" "}
                <p className="text-sm sm:text-lg font-bold mt-1">
                  {" "}
                  {item.value}{" "}
                </p>{" "}
              </div>
            ))}{" "}
          </div>{" "}
          {/* Mini Chart */}{" "}
         <div className="mt-4 w-full max-w-full overflow-hidden">
  <Card className="bg-gray-900 border border-gray-800 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">
    
    <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4">
      <div className="flex items-start justify-between gap-2">
        
        <div className="min-w-0">
          <CardTitle className="text-sm font-semibold text-white truncate">
            Wallet Activity
          </CardTitle>

          <CardDescription className="text-[11px] sm:text-xs text-gray-400">
            Income vs Expenses
          </CardDescription>
        </div>

        {/* Small Responsive Buttons */}
        <div className="flex items-center gap-1 bg-black border border-gray-800 rounded-lg p-1 shrink-0">
          <button className="px-1.5 sm:px-2 py-1 text-[9px] sm:text-[10px] rounded bg-gray-800 text-white">
            3M
          </button>

          <button className="px-1.5 sm:px-2 py-1 text-[9px] sm:text-[10px] text-gray-400">
            30D
          </button>

          <button className="px-1.5 sm:px-2 py-1 text-[9px] sm:text-[10px] text-gray-400">
            7D
          </button>
        </div>
      </div>
    </CardHeader>

    <CardContent className="px-1 sm:px-2 pb-2">
      <ChartContainer
        config={chartConfig}
        className="h-[100px] sm:h-[180px] w-full"
      >
        <AreaChart data={filteredData}>
          
          <defs>
            <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="#00CF7B"
                stopOpacity={0.5}
              />
              <stop
                offset="95%"
                stopColor="#00CF7B"
                stopOpacity={0.02}
              />
            </linearGradient>

            <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="#0F9D58"
                stopOpacity={0.35}
              />
              <stop
                offset="95%"
                stopColor="#0F9D58"
                stopOpacity={0.01}
              />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            opacity={0.1}
          />

          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={6}
            minTickGap={20}
            tick={{ fontSize: 9, fill: "#737373" }}
            tickFormatter={(val) =>
              new Date(val).toLocaleDateString("en-NG", {
                month: "short",
              })
            }
          />

          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => formatKobo(Number(value))}
                indicator="dot"
              />
            }
          />

          <Area
            dataKey="income"
            type="natural"
            fill="url(#incomeFill)"
            stroke="#00CF7B"
            strokeWidth={2}
          />

          <Area
            dataKey="expense"
            type="natural"
            fill="url(#expenseFill)"
            stroke="#0F9D58"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-8 py-24 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by growing businesses
          </h2>
          <p className="text-gray-400 mb-16">
            Reliable infrastructure powered by PayAza, built for scale and
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
              { num: "500+", label: "Businesses", sub: "Trust TapPay daily" },
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
            <h2 className="text-3xl md:text-4xl font-bold">
              Powerful Features
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Everything you need to manage payments, scale your business, and
              deliver seamless financial experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Wallet Management",
                desc: "Manage balances, monitor transactions, and control your funds in real time with a powerful wallet system.",
                icon: "💳",
              },
              {
                title: "PayAza Integration",
                desc: "Seamlessly accept payments, process transactions, and handle payouts using PayAza’s secure infrastructure.",
                icon: "🌍",
              },
              {
                title: "Advanced Analytics",
                desc: "Gain deep insights into your financial data with visual dashboards and real-time reporting tools.",
                icon: "📊",
              },
              {
                title: "Instant Transfers",
                desc: "Send and receive money instantly with minimal latency and high reliability.",
                icon: "⚡",
              },
              {
                title: "Developer Friendly API",
                desc: "Integrate quickly using clean, well-documented APIs built for developers.",
                icon: "🧩",
              },
              {
                title: "Security & Compliance",
                desc: "Enterprise-grade security with encryption, fraud detection, and compliance standards.",
                icon: "🔒",
              },
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
              Get started with TapPay in minutes and begin processing payments
              with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Create Your Account",
                desc: "Sign up in minutes and set up your TapPay wallet to start managing your finances.",
                icon: "👤",
              },
              {
                title: "Connect PayAza",
                desc: "Integrate PayAza using our developer-friendly APIs and dashboard tools.",
                icon: "🔗",
              },
              {
                title: "Start Transacting",
                desc: "Send, receive, and track payments in real time with full visibility and control.",
                icon: "⚡",
              },
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
            <h2 className="text-3xl md:text-4xl font-bold">
              Security You Can Trust
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Built with enterprise-grade security to protect your funds, data,
              and transactions at every level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "End-to-End Encryption",
                desc: "All transactions and sensitive data are encrypted using industry-standard protocols to ensure maximum protection.",
                icon: "🔐",
              },
              {
                title: "Fraud Detection",
                desc: "Advanced monitoring systems detect and prevent suspicious activities in real time.",
                icon: "🛡️",
              },
              {
                title: "Secure APIs",
                desc: "Our APIs are built with strict authentication and authorization layers for safe integrations.",
                icon: "🔑",
              },
              {
                title: "Compliance Ready",
                desc: "Aligned with global financial regulations and best practices for secure payment processing.",
                icon: "📜",
              },
              {
                title: "Data Privacy",
                desc: "User data is handled with strict privacy controls and protection policies.",
                icon: "👁️",
              },
              {
                title: "24/7 Monitoring",
                desc: "Continuous system monitoring ensures uptime, security, and rapid incident response.",
                icon: "⏱️",
              },
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
            <h2 className="text-3xl md:text-4xl font-bold">
              What Our Users Say
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Businesses and individuals trust TapPay to power their payments
              every day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Modred O.",
                role: "Startup Founder",
                text: "TapPay made it incredibly easy for us to start accepting payments globally. The PayAza integration is seamless.",
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
        <h2 className="text-3xl font-bold text-center mb-12">
          {" "}
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              q: "What is TapPay?",
              a: "TapPay is a modern payment platform that helps individuals and businesses manage wallets, track transactions, and process payments efficiently using PayAza infrastructure.",
            },
            {
              q: "How does PayAza integration work?",
              a: "TapPay connects directly to PayAza APIs, allowing you to accept payments, send payouts, and manage transactions securely from one dashboard.",
            },
            {
              q: "Is TapPay secure?",
              a: "Yes. TapPay uses encryption, secure APIs, and continuous monitoring to ensure all transactions and user data are protected.",
            },
            {
              q: "Who can use TapPay?",
              a: "TapPay is built for individuals, startups, and businesses that need a reliable way to manage and process payments.",
            },
            {
              q: "Can I track my transactions in real-time?",
              a: "Absolutely. TapPay provides real-time analytics and transaction tracking so you always know what’s happening with your money.",
            },
            {
              q: "How do I get started?",
              a: "Simply create an account, connect your PayAza integration, and start sending or receiving payments instantly.",
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
            Start using TapPay today
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Simple. Secure. Fast payments powered by PayAza.
          </p>

          <div className="mt-8 flex justify-center">
            <a href="/auth/login">
              <button
                className="
    relative px-6 py-2 font-semibold text-black
    bg-green-600
    border border-white/30
    rounded-xl

    shadow-[0_6px_18px_rgba(34,197,94,0.18)]
    transition-all duration-300 ease-out

    hover:-translate-y-0.5
    hover:shadow-[0_10px_22px_rgba(34,197,94,0.22)]
    hover:bg-green-500

    active:scale-[0.98]
    focus:outline-none focus:ring-2 focus:ring-green-400/30
  "
              >
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
            <h3 className="text-white text-lg font-bold mb-4">TapPay</h3>
            <p className="text-gray-500">
              Secure, fast, and reliable payments powered by PayAza. Built for
              modern businesses.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="/dashboard" className="hover:text-green-400">
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/transactions"
                  className="hover:text-green-400"
                >
                  Transactions
                </a>
              </li>
              <li>
                <a href="/dashboard/settings" className="hover:text-green-400">
                  Settings
                </a>
              </li>
              <li>
                <a href="/dashboard/help" className="hover:text-green-400">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#features" className="hover:text-green-400">
                  Features
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-green-400">
                  Security
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-green-400">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <a href="#" className="hover:text-green-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-600 text-xs">
          © {new Date().getFullYear()} TapPay. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
