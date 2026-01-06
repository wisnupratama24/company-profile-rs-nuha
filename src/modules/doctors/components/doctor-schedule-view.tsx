"use client";

import { motion } from "motion/react";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DoctorScheduleData } from "../utils/constants";
import { getDayAvailableSlotsCount } from "../utils/helpers";

interface DoctorScheduleViewProps {
  doctor: DoctorScheduleData;
  selectedDay: number;
  onDaySelect: (index: number) => void;
  onSlotClick: (slotTime: string, day: string) => void;
}

export function DoctorScheduleView({
  doctor,
  selectedDay,
  onDaySelect,
  onSlotClick,
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
      className="flex flex-col"
    >
      <div className="space-y-6 pb-6">
        {/* Doctor Header */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                {doctor.doctor.specialization}
              </span>
            </div>
            <h1 className="text-3xl font-bold leading-tight mb-3">
              {doctor.doctor.name}
            </h1>
            <p className="text-base text-muted-foreground">
              Available appointments for the week
            </p>
          </div>
          <Separator />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {doctor.doctor.location}
                </p>
                <p className="text-xs">Location</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-10" />
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>{doctor.schedule.length} days available</span>
            </div>
          </div>
        </div>
        <Separator />

        {/* Schedule Days */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Select a Day</h3>
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
                Available Time Slots - {selectedDayData?.day}
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {selectedDayData?.slots.map((slot) => (
                <motion.button
                  key={slot.id}
                  whileHover={slot.available ? { scale: 1.05 } : {}}
                  whileTap={slot.available ? { scale: 0.95 } : {}}
                  onClick={() => {
                    if (slot.available) {
                      onSlotClick(slot.time, selectedDayData.day);
                    }
                  }}
                  disabled={!slot.available}
                  className={cn(
                    "px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200",
                    slot.available
                      ? "border-border bg-background text-foreground hover:border-primary hover:bg-primary/5 cursor-pointer"
                      : "border-border/50 bg-muted text-muted-foreground cursor-not-allowed opacity-50"
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
                No available slots for this day. Please select another day.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

