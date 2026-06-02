import { JsonLd, faqLd } from "@/lib/schema";
import { LANDING_FAQS } from "@/data/faqs";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(LANDING_FAQS)} />
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
    </>
  );
}
