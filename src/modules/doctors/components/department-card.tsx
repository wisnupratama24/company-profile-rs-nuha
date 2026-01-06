"use client";

import { motion } from "motion/react";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface DepartmentCardProps {
  name: string;
  doctors: number;
  availableSlots: number;
  index: number;
  onClick: () => void;
}

export function DepartmentCard({
  name,
  doctors,
  availableSlots,
  index,
  onClick,
}: DepartmentCardProps) {
  return (
    <motion.div
      key={name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="border rounded-lg p-5 bg-card hover:border-primary/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {doctors} doctor{doctors !== 1 ? "s" : ""} available
          </p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      </div>
      <Separator className="mb-3" />
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          <span>
            {doctors} doctor{doctors !== 1 ? "s" : ""}
          </span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{availableSlots} available slots</span>
        </div>
      </div>
    </motion.div>
  );
}

