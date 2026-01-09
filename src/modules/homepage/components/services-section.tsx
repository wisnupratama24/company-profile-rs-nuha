"use client";

import { motion } from "motion/react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { SERVICES, SERVICES_SECTION } from "../utils/constants";

export function ServicesSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mb-16"
    >
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold tracking-tight mb-2"
        >
          {SERVICES_SECTION.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          {SERVICES_SECTION.description}
        </motion.p>
      </div>
      <HoverEffect items={SERVICES} />
    </motion.div>
  );
}

