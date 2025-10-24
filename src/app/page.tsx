import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OneStopShop from "@/components/OneStopShop";
import VisaPrograms from "@/components/VisaPrograms";
import NursesSection from "@/components/NursesSection";
import CaseStudies from "@/components/CaseStudies";
import Team from "@/components/Team";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <OneStopShop />
      <VisaPrograms />
      <NursesSection />
      <CaseStudies />
      <Team />
      <ContactForm />
      <Footer />
    </div>
  );
}
