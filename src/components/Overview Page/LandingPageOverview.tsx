"use client";

import { HeroSection } from "@/components/Landing Page/HeroSection";
import { FeaturesSection } from "@/components/Landing Page/FeatureSection";
import { QuickLinksSection } from "@/components/Landing Page/QuickLinksSecion";
import { AboutSection } from "@/components/Landing Page/AboutSection";
import { TestimonialsSection } from "@/components/Landing Page/TestimonialSection";
import { CTASection } from "@/components/Landing Page/CTASection";

export function LandingPageOverview() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <QuickLinksSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
