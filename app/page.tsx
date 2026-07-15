import { SiteHeader } from "@/modules/landing/components/site-header";
import { SiteFooter } from "@/modules/landing/components/site-footer";
import { HeroSection } from "@/modules/landing/components/hero-section";
import { HowItWorks } from "@/modules/landing/components/how-it-works";
import { FeaturesBento } from "@/modules/landing/components/features-bento";
import { PricingSection } from "@/modules/landing/components/pricing-section";
import { FAQSection } from "@/modules/landing/components/faq-section";

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col selection:bg-primary/30'>
      <SiteHeader />

      <main className='flex-1'>
        <HeroSection />
        <HowItWorks />
        <FeaturesBento />
        <PricingSection />
        <FAQSection />
      </main>

      <SiteFooter />
    </div>
  );
}
