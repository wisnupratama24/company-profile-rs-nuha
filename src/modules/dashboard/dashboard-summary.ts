import type {
  BookingByDoctorRow,
  BookingBySpecializationRow,
  PracticingBySpecializationRow,
} from "@/modules/dashboard/utils/constants";

export interface DashboardSummaryResponse {
  date: string; // YYYY-MM-DD
  generatedAt: string; // ISO string
  totals: {
    doctorsTotal: number;
    doctorsPracticing: number;
    doctorsNotPracticing: number;
    doctorsOnLeave: number;
  };
  bookingByDoctor: BookingByDoctorRow[];
  bookingBySpecialization: BookingBySpecializationRow[];
  practicingBySpecialization: PracticingBySpecializationRow[];
}

function formatDateYYYYMMDDLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}


import nuhaApiClient from "@/api/nuha-client";
export async function fetchDashboardSummary(params?: { date?: Date }): Promise<DashboardSummaryResponse> {
  const date = formatDateYYYYMMDDLocal(params?.date ?? new Date());
  const response = await nuhaApiClient.get<DashboardSummaryResponse>(
    "/dashboard/stats", {
      params: { date }
    }
  );
  return response.data;
}

