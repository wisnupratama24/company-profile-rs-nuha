"use client";

import { motion } from "motion/react";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { DoctorScheduleData } from "../utils/constants";
import { getDayAvailableSlotsCount } from "../utils/helpers";

interface DoctorScheduleViewProps {
  doctor: DoctorScheduleData;
  selectedDay: number;
  onDaySelect: (index: number) => void;
}

export function DoctorScheduleView({
  doctor,
  selectedDay,
  onDaySelect,
}: DoctorScheduleViewProps) {
  const selectedDayData = doctor.schedule[selectedDay];
  const availableSlotsCount = selectedDayData
    ? getDayAvailableSlotsCount(selectedDayData)
    : 0;

  return (
    <motion.div
      key={doctor.doctor.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg p-6 bg-white"
    >
      <div className="space-y-6">
        {/* Doctor Header */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                {doctor.doctor.specialization}
              </span>
            </div>
            <h2 className="text-2xl font-bold leading-tight mb-2">
              {doctor.doctor.name}
            </h2>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{doctor.doctor.location}</span>
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>{doctor.schedule.length} hari tersedia</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Schedule Days */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Pilih Hari</h3>
            <div className="flex gap-2 flex-wrap">
              {doctor.schedule.map((day, index) => (
                <motion.button
                  key={day.date}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onDaySelect(index)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all",
                    selectedDay === index
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {day.day}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">
                Slot Waktu Tersedia - {selectedDayData?.day}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {selectedDayData?.slots.map((slot) => (
                <motion.button
                  key={slot.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 hover:border-primary hover:bg-primary/5",
                    slot.available
                      ? "border-border bg-background text-foreground"
                      : "border-border/50 bg-muted text-muted-foreground opacity-70"
                  )}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{slot.time}</span>
                  </div>
                </motion.button>
              ))}
            </div>
            {availableSlotsCount === 0 && (
              <p className="text-sm text-muted-foreground mt-4">
                Tidak ada slot tersedia untuk hari ini. Silakan pilih hari lain.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

