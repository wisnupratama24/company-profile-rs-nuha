import { useQuery } from "@tanstack/react-query";
import {
  fetchDoctorSchedules,
  fetchDoctorScheduleById,
  fetchSpesialis,
  FetchDoctorScheduleParams,
} from "@/services/doctors";
import { DoctorScheduleData, Spesialis } from "../utils/constants";

/**
 * Hook to fetch doctor schedules with optional filters
 */
export function useDoctorSchedules(params?: FetchDoctorScheduleParams) {
  return useQuery<DoctorScheduleData[]>({
    queryKey: ["doctor-schedules", params],
    queryFn: () => fetchDoctorSchedules(params),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to fetch a single doctor's schedule by ID
 */
export function useDoctorSchedule(id: number | null, startDate?: Date, endDate?: Date) {
  return useQuery<DoctorScheduleData | null>({
    queryKey: ["doctor-schedule", id, startDate?.toISOString(), endDate?.toISOString()],
    queryFn: () => {
      if (!id) return null;
      return fetchDoctorScheduleById(id, startDate, endDate);
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

/**
 * Hook to fetch all spesialis
 * TODO: Replace with dedicated spesialis API when available
 */
export function useSpesialis(startDate?: Date, endDate?: Date) {
  return useQuery<Spesialis[]>({
    queryKey: ["Spesialis", startDate?.toISOString(), endDate?.toISOString()],
    queryFn: () => fetchSpesialis(startDate, endDate),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// ============ Legacy exports for backward compatibility ============

export const useDoctors = useDoctorSchedules;
export const useDoctor = (id: string | null) => {
  return useDoctorSchedule(id ? Number(id) : null);
};
