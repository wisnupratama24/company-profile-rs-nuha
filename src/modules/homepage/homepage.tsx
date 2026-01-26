"use client";

import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  ServicesSection,
} from "./components";

function Homepage() {
  return (
    <div className="max-w-7xl w-full">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ServicesSection />
    </div>
  );
}

export default Homepage;
