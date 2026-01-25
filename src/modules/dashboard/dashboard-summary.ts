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


// import { apiClient } from "@/api/client";
import nuhaApiClient from "@/api/nuha-client";

export async function fetchDashboardSummary(params?: { date?: Date }): Promise<DashboardSummaryResponse> {
  // const date = formatDateYYYYMMDDLocal(params?.date ?? new Date());
  const generatedAt = new Date().toISOString();

  // ---- dummy dataset (silakan ubah angka/isi seenaknya) ----
  const totals = {
    doctorsTotal: 120,
    doctorsPracticing: 35,
    doctorsNotPracticing: 70,
    doctorsOnLeave: 15,
  };

  const bookingByDoctor: BookingByDoctorRow[] = [
    { doctorId: "101", doctorName: "dr. Andi", bookings: 18 },
    { doctorId: "102", doctorName: "dr. Budi", bookings: 12 },
    { doctorId: "103", doctorName: "dr. Citra", bookings: 9 },
    { doctorId: "104", doctorName: "dr. Dimas", bookings: 7 },
    { doctorId: "105", doctorName: "dr. Eka", bookings: 6 },
    { doctorId: "106", doctorName: "dr. Farah", bookings: 5 },
    { doctorId: "107", doctorName: "dr. Gilang", bookings: 4 },
    { doctorId: "108", doctorName: "dr. Hana", bookings: 4 },
    { doctorId: "109", doctorName: "dr. Indra", bookings: 3 },
    { doctorId: "110", doctorName: "dr. Jihan", bookings: 3 },
    { doctorId: "111", doctorName: "dr. Kurnia", bookings: 2 },
    { doctorId: "112", doctorName: "dr. Lala", bookings: 2 },
    { doctorId: "113", doctorName: "dr. Mahesa", bookings: 1 },
    { doctorId: "114", doctorName: "dr. Nabila", bookings: 1 },
    { doctorId: "115", doctorName: "dr. Oka", bookings: 0 },
  ];

  const bookingBySpecialization: BookingBySpecializationRow[] = [
    { specialization: "Sp. Anak", bookings: 22 },
    { specialization: "Sp. Penyakit Dalam", bookings: 19 },
    { specialization: "Sp. Bedah", bookings: 11 },
    { specialization: "Sp. THT", bookings: 9 },
    { specialization: "Sp. Saraf", bookings: 7 },
    { specialization: "Sp. Jantung", bookings: 6 },
    { specialization: "Sp. Mata", bookings: 5 },
    { specialization: "Sp. Kulit & Kelamin", bookings: 4 },
    { specialization: "Sp. Ortopedi", bookings: 3 },
    { specialization: "Sp. Paru", bookings: 2 },
  ];

  const practicingBySpecialization: PracticingBySpecializationRow[] = [
    {
      specialization: "Sp. Anak",
      doctors: 4,
      doctorList: [
        { id: "101", name: "dr. Andi" },
        { id: "103", name: "dr. Citra" },
        { id: "108", name: "dr. Hana" },
        { id: "114", name: "dr. Nabila" },
      ],
    },
    {
      specialization: "Sp. Penyakit Dalam",
      doctors: 3,
      doctorList: [
        { id: "102", name: "dr. Budi" },
        { id: "109", name: "dr. Indra" },
        { id: "110", name: "dr. Jihan" },
      ],
    },
    {
      specialization: "Sp. Bedah",
      doctors: 2,
      doctorList: [
        { id: "104", name: "dr. Dimas" },
        { id: "111", name: "dr. Kurnia" },
      ],
    },
    {
      specialization: "Sp. THT",
      doctors: 1,
      doctorList: [{ id: "105", name: "dr. Eka" }],
    },
  ];

  const date = formatDateYYYYMMDDLocal(params?.date ?? new Date());
  // const res = await apiClient.get<DashboardSummaryResponse>("/dashboard/stats", { params: { date } });
  // return res.data;

  const response = await nuhaApiClient.get<DashboardSummaryResponse>(
    "/dashboard/stats", {
      params: { date }
    }
  );

  console.log({response})

  return {
    date,
    generatedAt,
    totals,
    bookingByDoctor,
    bookingBySpecialization,
    practicingBySpecialization,
  };
}

