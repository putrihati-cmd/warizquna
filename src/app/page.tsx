import { JsonLd, faqLd } from "@/lib/schema";
import { LANDING_FAQS } from "@/data/faqs";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { FAQSection } from "@/components/landing/FAQSection";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(LANDING_FAQS)} />
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      <PricingSection />
      <FAQSection />
    </>
  );
}
