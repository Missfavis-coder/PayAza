import FAQPage from "@/components/landing/faq";
import { Features } from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import HowItWorksPage from "@/components/landing/how-it-works";
import Header from "@/components/landing/navbar";
import TestimonialsPage from "@/components/landing/testimonials";
import Trust from "@/components/landing/trust";

export default function Page() {
  return (
    <div className="">
      <Header />
      <Hero />
      <Trust />
      <Features />
      <HowItWorksPage />
      <TestimonialsPage />
      <FAQPage />
      <Footer />
      hello
    </div>
  );
}