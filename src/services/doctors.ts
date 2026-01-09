import { apiClient } from "@/api/client";
import { DoctorScheduleData, doctors as dummyDoctors } from "@/modules/doctors/utils/constants";
import { format, addDays, startOfDay } from "date-fns";

export interface FetchDoctorsParams {
  department?: string;
  search?: string;
  date?: string;
}

/**
 * Generate dynamic dates for the next 5 days
 */
function generateDynamicDates(): { date: string; day: string }[] {
  const today = startOfDay(new Date());
  const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  
  return Array.from({ length: 5 }, (_, i) => {
    const date = addDays(today, i);
    const dayName = daysOfWeek[date.getDay()];
    return {
      date: format(date, "yyyy-MM-dd"),
      day: dayName,
    };
  });
}

/**
 * Transform dummy data with dynamic dates
 */
function transformDummyDataWithDynamicDates(): DoctorScheduleData[] {
  const dynamicDates = generateDynamicDates();
  
  return dummyDoctors.map((doctorData) => {
    // Get the original schedule structure (slots)
    const originalSchedule = doctorData.schedule;
    
    // Map to new dates while preserving slot structure
    const newSchedule = dynamicDates.map((dateInfo, index) => {
      const originalDay = originalSchedule[index % originalSchedule.length];
      return {
        date: dateInfo.date,
        day: dateInfo.day,
        slots: originalDay.slots.map((slot, slotIndex) => ({
          ...slot,
          id: `${doctorData.doctor.id}-${dateInfo.date}-${slotIndex}`,
        })),
      };
    });
    
    return {
      ...doctorData,
      schedule: newSchedule,
    };
  });
}

/**
 * Filter doctors based on params
 */
function filterDoctors(
  doctors: DoctorScheduleData[],
  params?: FetchDoctorsParams
): DoctorScheduleData[] {
  let filtered = [...doctors];

  // Filter by department
  if (params?.department) {
    filtered = filtered.filter(
      (d) => d.doctor.specialization.toLowerCase() === params.department!.toLowerCase()
    );
  }

  // Filter by search (name)
  if (params?.search) {
    const searchLower = params.search.toLowerCase();
    filtered = filtered.filter((d) =>
      d.doctor.name.toLowerCase().includes(searchLower)
    );
  }

  // Filter by date
  if (params?.date) {
    filtered = filtered.map((doctor) => {
      const matchingSchedule = doctor.schedule.find(
        (day) => day.date === params.date
      );
      if (matchingSchedule) {
        return {
          ...doctor,
          schedule: [matchingSchedule],
        };
      }
      return {
        ...doctor,
        schedule: [],
      };
    }).filter((doctor) => doctor.schedule.length > 0);
  }

  return filtered;
}

/**
 * Fetch all doctors with their schedules
 * Supports filtering by department, search, and date
 * Using dummy data until API is ready
 */
export async function fetchDoctors(
  params?: FetchDoctorsParams
): Promise<DoctorScheduleData[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  const doctors = transformDummyDataWithDynamicDates();
  return filterDoctors(doctors, params);
}

/**
 * Fetch a single doctor by ID
 * Using dummy data until API is ready
 */
export async function fetchDoctorById(
  id: string
): Promise<DoctorScheduleData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 200));

  const doctors = transformDummyDataWithDynamicDates();
  const doctor = doctors.find((d) => d.doctor.id === id);
  
  if (!doctor) {
    throw new Error(`Dokter dengan ID ${id} tidak ditemukan`);
  }
  
  return doctor;
}

