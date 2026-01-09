"use client";

import { motion } from "motion/react";
import { Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HERO_CONFIG } from "../utils/constants";

export function HeroSection() {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
        >
          {HERO_CONFIG.title}{" "}
          <span className="text-primary">{HERO_CONFIG.titleHighlight}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          {HERO_CONFIG.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="text-base">
            <Link href={HERO_CONFIG.buttons.primary.href}>
              <Calendar className="mr-2 h-5 w-5" />
              {HERO_CONFIG.buttons.primary.text}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href={HERO_CONFIG.buttons.secondary.href}>
              <Sparkles className="mr-2 h-5 w-5" />
              {HERO_CONFIG.buttons.secondary.text}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

