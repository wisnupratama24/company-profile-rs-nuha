import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchDoctors,
  fetchDoctorById,
  bookAppointment,
  checkAvailability,
  FetchDoctorsParams,
  BookAppointmentRequest,
  AvailabilityCheckResponse,
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

/**
 * Hook to book an appointment
 */
export function useBookAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BookAppointmentRequest) => bookAppointment(data),
    onSuccess: () => {
      // Invalidate doctors queries to refetch updated availability
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor"] });
    },
  });
}

/**
 * Hook to check slot availability
 */
export function useCheckAvailability(
  doctorId: string | null,
  date: string | null,
  time: string | null
) {
  return useQuery<AvailabilityCheckResponse>({
    queryKey: ["availability", doctorId, date, time],
    queryFn: () => {
      if (!doctorId || !date || !time) {
        throw new Error("Doctor ID, date, and time are required");
      }
      return checkAvailability(doctorId, date, time);
    },
    enabled: !!(doctorId && date && time),
    staleTime: 30 * 1000, // 30 seconds
  });
}

