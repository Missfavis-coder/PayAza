"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/use-auth";
import { X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navigationLink = [
    { name: "Features", link: "#features" },
    { name: "How it Works", link: "#how-it-works" },
    { name: "FAQ", link: "#faq" },
    { name: "Testimonials", link: "#testimonials" },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between rounded-full border border-neutral-800 bg-black/70 backdrop-blur-lg">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center  gap-1 font-bold text-lg text-white"
        >
          <img
            src="/logo-nobg.png"
            alt="TapPay Logo"
            className="w-7 object-contain"
          />
          <p>
            Tap<span className="text-green-400">Pay</span>
          </p>{" "}
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center space-x-8 text-sm text-neutral-300">
          {navigationLink.map(({ name, link }, index) => {
            const isActive = pathname === link;

            return (
              <Link
                key={index}
                href={link}
                className={`capitalize transition hover:text-[#00CF7B] ${
                  isActive ? "text-[#00CF7B] font-semibold" : ""
                }`}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              router.push(isAuthenticated ? "/dashboard" : "auth/login");
              toggleMenu();
            }}
            className="px-5 py-2 text-sm cursor-pointer bg-[#00CF7B] text-white rounded-full font-semibold hover:bg-[#00CF7B] transition"
          >
            {isAuthenticated ? "Dashboard" : "Sign In"}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={toggleMenu}
          className="md:hidden cursor-pointer text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={toggleMenu}
        >
          <div
            className="absolute top-0 left-0 right-0 bg-black border border-neutral-800  p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                onClick={toggleMenu}
                className="text-neutral-300 hover:text-[#00CF7B] transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* LINKS */}
            <nav className="flex flex-col space-y-4 text-neutral-300">
              {navigationLink.map(({ name, link }, index) => {
                const isActive = pathname === link;

                return (
                  <Link
                    key={index}
                    href={link}
                    onClick={toggleMenu}
                    className={`capitalize ${
                      isActive ? "text-[#00CF7B] te font-semibold" : ""
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}
            </nav>

            {/* ACTIONS */}
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <button
                onClick={() => {
                  router.push(isAuthenticated ? "/dashboard" : "/auth/login");
                  toggleMenu();
                }}
                className="w-full py-3 cursor-pointer bg-[#00CF7B] text-white rounded-xl font-semibold hover:bg-green-400 transition"
              >
                {isAuthenticated ? "Dashboard" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
