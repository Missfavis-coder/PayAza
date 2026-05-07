"use client";
import React from "react";
import Link from "next/link";
import Header from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import HowItWorksPage from "@/components/landing/how-it-works";
import TestimonialsPage from "@/components/landing/testimonials";
import FAQPage from "@/components/landing/faq";
import Footer from "@/components/landing/footer";

export default function PayazaLanding() {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
       <Header/>
       <Hero/>
       <Features/>
       <HowItWorksPage/>
       <TestimonialsPage/>
       <FAQPage/>
       <Footer/>
 
    </div>
  );
}
