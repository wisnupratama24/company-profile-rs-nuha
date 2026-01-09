"use client";

import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  ServicesSection,
  ContactSection,
} from "./components";

function Homepage() {
  return (
    <div className="max-w-7xl w-full">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
}

export default Homepage;
