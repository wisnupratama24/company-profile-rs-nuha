import { useQuery } from "@tanstack/react-query";
import {
  fetchDoctors,
  fetchDoctorById,
  FetchDoctorsParams,
} from "@/services/doctors";
import { DoctorScheduleData } from "../utils/constants";

/**
 * Hook to fetch all doctors with optional filters
 */
export function useDoctors(params?: FetchDoctorsParams) {
  return useQuery<DoctorScheduleData[]>({
    queryKey: ["doctors", params],
    queryFn: () => fetchDoctors(params),
    staleTime: 60 * 1000, // 1 minute
  });
}

/**
 * Hook to fetch a single doctor by ID
 */
export function useDoctor(id: string | null) {
  return useQuery<DoctorScheduleData>({
    queryKey: ["doctor", id],
    queryFn: () => {
      if (!id) throw new Error("Doctor ID is required");
      return fetchDoctorById(id);
    },
    enabled: !!id,
    staleTime: 60 * 1000,
  });
}

