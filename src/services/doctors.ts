import { apiClient } from "@/api/client";
import { DoctorScheduleData } from "@/modules/doctors/utils/constants";

export interface FetchDoctorsParams {
  department?: string;
  search?: string;
  date?: string;
}

export interface BookAppointmentRequest {
  doctorId: string;
  date: string; // Format: yyyy-MM-dd
  time: string; // Format: HH:mm
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  notes?: string;
}

export interface BookAppointmentResponse {
  id: string;
  status: string;
  message: string;
  appointment?: {
    id: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    patientName: string;
    patientEmail: string;
    patientPhone: string;
    createdAt: string;
  };
}

export interface AvailabilityCheckResponse {
  available: boolean;
  slotId?: string;
  doctorId: string;
  date: string;
  time: string;
}

/**
 * Fetch all doctors with their schedules
 * Supports filtering by department, search, and date
 */
export async function fetchDoctors(
  params?: FetchDoctorsParams
): Promise<DoctorScheduleData[]> {
  const response = await apiClient.get<DoctorScheduleData[]>("/doctors", {
    params,
  });
  return response.data;
}

/**
 * Fetch a single doctor by ID
 */
export async function fetchDoctorById(
  id: string
): Promise<DoctorScheduleData> {
  const response = await apiClient.get<DoctorScheduleData>(`/doctors/${id}`);
  return response.data;
}

/**
 * Book an appointment
 */
export async function bookAppointment(
  data: BookAppointmentRequest
): Promise<BookAppointmentResponse> {
  const response = await apiClient.post<BookAppointmentResponse>(
    "/appointments",
    data
  );
  return response.data;
}

/**
 * Check if a time slot is available
 */
export async function checkAvailability(
  doctorId: string,
  date: string,
  time: string
): Promise<AvailabilityCheckResponse> {
  const response = await apiClient.get<AvailabilityCheckResponse>(
    "/appointments/availability",
    {
      params: { doctorId, date, time },
    }
  );
  return response.data;
}

