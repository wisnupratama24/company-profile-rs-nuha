"use client";

import { motion } from "motion/react";
import { CalendarIcon, Clock, MapPin, User, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { DoctorScheduleData } from "../utils/constants";
import { getAvailableSlotsCount } from "../utils/helpers";

interface DoctorCardProps {
  doctor: DoctorScheduleData;
  index: number;
  onClick: () => void;
}

export function DoctorCard({ doctor, index, onClick }: DoctorCardProps) {
  const availableSlots = getAvailableSlotsCount(doctor);

  return (
    <motion.div
      key={doctor.doctor.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border rounded-lg p-6 bg-card hover:border-primary/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Doctor Info */}
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold mb-1">{doctor.doctor.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {doctor.doctor.specialization}
            </p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {doctor.doctor.location}
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
        </div>

        <Separator />

        {/* Schedule Summary */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            <span>{doctor.schedule.length} days available</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{availableSlots} available slots</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

