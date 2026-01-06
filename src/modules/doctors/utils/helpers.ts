import { DoctorScheduleData, ScheduleDay } from "./constants";

/**
 * Calculate total available slots for a doctor
 */
export function getAvailableSlotsCount(doctor: DoctorScheduleData): number {
  return doctor.schedule.reduce(
    (total, day) => total + day.slots.filter((slot) => slot.available).length,
    0
  );
}

/**
 * Calculate total available slots for a day
 */
export function getDayAvailableSlotsCount(day: ScheduleDay): number {
  return day.slots.filter((slot) => slot.available).length;
}

/**
 * Check if any filters are active
 */
export function hasActiveFilters(
  selectedDepartment: string | null,
  searchDoctor: string,
  searchDate: Date | undefined
): boolean {
  return !!(selectedDepartment || searchDoctor.trim() || searchDate);
}

