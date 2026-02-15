import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import WhyUsSection from "@/components/landing/WhyUsSection";
import ProductsSection from "@/components/landing/ProductsSection";
import MaklonSection from "@/components/landing/MaklonSection";
import ProcessSection from "@/components/landing/ProcessSection";
import BuyersSection from "@/components/landing/BuyersSection";
import CertificationsSection from "@/components/landing/CertificationsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import LeadCapturePopup from "@/components/landing/LeadCapturePopup";

const Index = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <ProductsSection />
      <MaklonSection />
      <ProcessSection />
      <BuyersSection />
      <CertificationsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
      <LeadCapturePopup />
    </div>
  );
};

export default Index;
