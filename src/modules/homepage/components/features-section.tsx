"use client";

import { motion } from "motion/react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FEATURES, FEATURES_SECTION } from "../utils/constants";

export function FeaturesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mb-16"
    >
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight mb-2"
        >
          {FEATURES_SECTION.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          {FEATURES_SECTION.description}
        </motion.p>
      </div>
      <BentoGrid className="max-w-7xl mx-auto">
        {FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <BentoGridItem
              key={feature.title}
              title={feature.title}
              description={feature.description}
              header={
                <div className={`flex items-center justify-center h-32 ${feature.gradientClass} rounded-lg`}>
                  <Icon className="h-12 w-12 text-primary" />
                </div>
              }
              icon={<Icon className="h-4 w-4" />}
              className={feature.className}
            />
          );
        })}
      </BentoGrid>
    </motion.div>
  );
}

