"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Clock, ArrowRight, Building2 } from "lucide-react";
import { MedicalServiceData, medicalServices } from "./utils/constants";
import { Markdown } from "@/components/ui/markdown";

function Service() {
  const [selectedService, setSelectedService] = useState<MedicalServiceData | null>(
    medicalServices[0]
  );

  return (
    <div className="max-w-7xl w-full">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight mb-2"
        >
          Layanan Medis
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          Jelajahi berbagai layanan medis komprehensif dan pilihan perawatan khusus kami
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6 min-h-[800px]">
        {/* Left Section - Services List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:sticky lg:top-24 lg:self-start"
        >
          <div className="flex flex-col border-2 rounded-lg overflow-hidden bg-white">
            <div className="px-4 py-3 border-b">
              <h2 className="text-sm font-semibold">Layanan</h2>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              <div className="p-2 space-y-1">
                {medicalServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.02 }}
                  >
                    <button
                      onClick={() => setSelectedService(service)}
                      className={cn(
                        "w-full text-left p-3 rounded-md transition-all duration-200",
                        selectedService?.id === service.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-foreground"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">
                          {service.title}
                        </span>
                        {selectedService?.id === service.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0"
                          >
                            <ArrowRight className="h-4 w-4" />
                          </motion.div>
                        )}
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Section - Service Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          <AnimatePresence mode="wait">
            {selectedService && (
              <motion.div
                key={selectedService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                <div className="space-y-6 pb-6">
                    {/* Service Header */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                            {selectedService.category}
                          </span>
                        </div>
                        <h1 className="text-3xl font-bold leading-tight mb-3">
                          {selectedService.title}
                        </h1>
                        <p className="text-base text-muted-foreground">
                          {selectedService.description}
                        </p>
                      </div>
                      <Separator />
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {selectedService.department}
                            </p>
                            <p className="text-xs">Departemen</p>
                          </div>
                        </div>
                        <Separator orientation="vertical" className="h-10" />
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{selectedService.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    {/* Service Content */}
                    <article>
                      <Markdown content={selectedService.content} />
                    </article>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default Service;
