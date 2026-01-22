import { nuhaApiClient } from "@/api/nuha-client";
import {
  DoctorScheduleData,
  DoctorScheduleApiResponse,
  DoctorScheduleApiItem,
  Poli,
} from "@/modules/doctors/utils/constants";
// NOTE: We intentionally avoid sending a timezone offset (+07, etc) in the payload.
// The API behaves best when we send UTC ISO strings (...Z) derived from a local date.

// API Constants
const LAPORAN_VIEW_ID = 123;
const DOCTOR_PROFILE_VIEW_ID = 107;
const DEFAULT_LIMIT = 1000;

export interface FetchDoctorScheduleParams {
  poli?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  id_dokter?: number;
  kode_spesialis?: string;
}

export interface DoctorProfileApiItem {
  id_dokter: number;
  image?: string | null;
}

export interface DoctorProfileApiResponse {
  data: {
    list: DoctorProfileApiItem[];
    headers: { label: string; value: string }[];
    parameters: {
      id_dokter: number | null;
      kode_spesialis: string | null;
      filter_tanggal_awal: string;
      filter_tanggal_akhir: string;
    };
    meta_data: {
      count: number;
      pages: number;
      limit: number;
    };
  };
  meta_data: {
    status: number;
    message: string;
  };
}

/**
 * Format date to ISO string for API
 * Mimics:
 * - startOfDay: dayjs(`${dayjs(str).format('YYYY-MM-DD')}T00:00:00`).utc().format()
 *
 * Output format: 2026-01-14T17:00:00Z (no milliseconds)
 */
function formatDateForApi(date: Date): string {
  const y = date.getFullYear();
  const m = date.getMonth(); // 0-based
  const d = date.getDate();

  // Create a Date representing *local* start of the selected day,
  // then convert that instant to a UTC ISO string (...Z).
  const local = new Date(y, m, d, 0, 0, 0);

  // dayjs().utc().format() typically omits milliseconds; do the same here.
  return local.toISOString().replace(".000Z", "Z");
}

/**
 * Transform API response items to DoctorScheduleData format
 * Groups schedule items by doctor
 */
function transformApiResponse(items: DoctorScheduleApiItem[]): DoctorScheduleData[] {
  // Group items by doctor
  const doctorMap = new Map<number, {
    doctor: DoctorScheduleApiItem;
    schedules: DoctorScheduleApiItem[];
  }>();

  items.forEach((item) => {
    if (!doctorMap.has(item.id_dokter)) {
      doctorMap.set(item.id_dokter, {
        doctor: item,
        schedules: [],
      });
    }
    doctorMap.get(item.id_dokter)!.schedules.push(item);
  });

  // Transform to DoctorScheduleData format
  return Array.from(doctorMap.values()).map(({ doctor, schedules }) => {
    // Group schedules by date
    const dateMap = new Map<string, DoctorScheduleApiItem[]>();
    schedules.forEach((schedule) => {
      // Normalize date to YYYY-MM-DD to avoid timezone/day shifting in the UI
      const dateKey = schedule.tanggal_char.slice(0, 10);
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, []);
      }
      dateMap.get(dateKey)!.push(schedule);
    });

    // Convert to ScheduleDay format
    const scheduleDays = Array.from(dateMap.entries()).map(([date, slots]) => ({
      date,
      day: slots[0].day_name,
      slots: slots.map((slot, index) => ({
        id: `${doctor.id_dokter}-${date}-${index}`,
        timeStart: slot.time_start,
        timeFinish: slot.time_finish,
        available: slot.status_praktik === "Praktik",
      })),
    }));

    return {
      doctor: {
        id: String(doctor.id_dokter),
        name: doctor.nama_dokter,
        specialization: doctor.nama_spesialis,
        poliCode: doctor.kode_spesialis,
      },
      schedule: scheduleDays,
    };
  });
}

/**
 * Extract unique polis from API response
 */
function extractPolis(items: DoctorScheduleApiItem[]): Poli[] {
  const poliMap = new Map<string, { name: string; doctorIds: Set<number> }>();

  items.forEach((item) => {
    if (!poliMap.has(item.kode_spesialis)) {
      poliMap.set(item.kode_spesialis, {
        name: item.nama_spesialis,
        doctorIds: new Set(),
      });
    }
    poliMap.get(item.kode_spesialis)!.doctorIds.add(item.id_dokter);
  });

  return Array.from(poliMap.entries()).map(([code, data]) => ({
    code,
    name: data.name,
    doctorCount: data.doctorIds.size,
  }));
}

/**
 * Fetch doctor schedules from Nuha API
 * Uses date range for filtering, defaults to today
 */
export async function fetchDoctorSchedules(
  params?: FetchDoctorScheduleParams
): Promise<DoctorScheduleData[]> {
  try {
    const startDate = params?.startDate || new Date();
    const endDate = params?.endDate || startDate;
    
    const response = await nuhaApiClient.post<DoctorScheduleApiResponse>(
      "/open-api/emr/dynamic-view-report",
      {
        id_laporan_view: LAPORAN_VIEW_ID,
        pages: 1,
        limit: DEFAULT_LIMIT,
        filter_tanggal_awal: formatDateForApi(startDate),
        filter_tanggal_akhir: formatDateForApi(endDate),
        id_dokter: params?.id_dokter || null,
        kode_spesialis: params?.kode_spesialis || null,
      }
    );

    if (response.data.meta_data.status !== 200) {
      throw new Error(response.data.meta_data.message);
    }

    let doctors = transformApiResponse(response.data.data.list);

    // Client-side filter by poli name (if API doesn't support it directly)
    if (params?.poli) {
      doctors = doctors.filter(
        (d) => d.doctor.specialization.toLowerCase() === params.poli!.toLowerCase()
      );
    }

    // Client-side filter by search (doctor name)
    if (params?.search) {
      const searchLower = params.search.toLowerCase();
      doctors = doctors.filter((d) =>
        d.doctor.name.toLowerCase().includes(searchLower)
      );
    }

    return doctors;
  } catch (error) {
    console.error("Error fetching doctor schedules:", error);
    throw error;
  }
}

/**
 * Fetch polis from doctor schedules
 * TODO: Replace with dedicated poli API when available
 */
export async function fetchPolis(startDate?: Date, endDate?: Date): Promise<Poli[]> {
  try {
    const start = startDate || new Date();
    const end = endDate || start;
    
    const response = await nuhaApiClient.post<DoctorScheduleApiResponse>(
      "/open-api/emr/dynamic-view-report",
      {
        id_laporan_view: LAPORAN_VIEW_ID,
        pages: 1,
        limit: DEFAULT_LIMIT,
        filter_tanggal_awal: formatDateForApi(start),
        filter_tanggal_akhir: formatDateForApi(end),
        id_dokter: null,
        kode_spesialis: null,
      }
    );

    if (response.data.meta_data.status !== 200) {
      throw new Error(response.data.meta_data.message);
    }

    return extractPolis(response.data.data.list);
  } catch (error) {
    console.error("Error fetching polis:", error);
    throw error;
  }
}

/**
 * Fetch a single doctor's schedule by ID
 */
export async function fetchDoctorScheduleById(
  id: number,
  startDate?: Date,
  endDate?: Date
): Promise<DoctorScheduleData | null> {
  try {
    const start = startDate || new Date();
    const end = endDate || start;
    
    const response = await nuhaApiClient.post<DoctorScheduleApiResponse>(
      "/open-api/emr/dynamic-view-report",
      {
        id_laporan_view: LAPORAN_VIEW_ID,
        pages: 1,
        limit: DEFAULT_LIMIT,
        filter_tanggal_awal: formatDateForApi(start),
        filter_tanggal_akhir: formatDateForApi(end),
        id_dokter: id,
        kode_spesialis: null,
      }
    );

    if (response.data.meta_data.status !== 200) {
      throw new Error(response.data.meta_data.message);
    }

    const doctors = transformApiResponse(response.data.data.list);
    return doctors.find((d) => d.doctor.id === String(id)) || null;
  } catch (error) {
    console.error("Error fetching doctor schedule by ID:", error);
    throw error;
  }
}

/**
 * Fetch a single doctor's avatar (base64 image string) by doctor ID.
 *
 * Notes:
 * - Uses a different `id_laporan_view` than schedules.
 * - The API requires date filters; we default to "today" when not provided.
 */
export async function fetchDoctorAvatarBase64(
  id_dokter: number,
  date?: Date
): Promise<string | null> {
  try {
    const d = date || new Date();

    const response = await nuhaApiClient.post<DoctorProfileApiResponse>(
      "/open-api/emr/dynamic-view-report",
      {
        id_laporan_view: DOCTOR_PROFILE_VIEW_ID,
        pages: 1,
        limit: 10,
        filter_tanggal_awal: formatDateForApi(d),
        filter_tanggal_akhir: formatDateForApi(d),
        id_dokter,
        kode_spesialis: null,
      }
    );

    if (response.data.meta_data.status !== 200) {
      throw new Error(response.data.meta_data.message);
    }

    const item = response.data.data.list?.[0];
    return item?.image ?? null;
  } catch (error) {
    console.error("Error fetching doctor avatar:", error);
    throw error;
  }
}

// ============ Legacy exports for backward compatibility ============

export type FetchDoctorsParams = FetchDoctorScheduleParams;
export const fetchDoctors = fetchDoctorSchedules;
export const fetchDoctorById = async (id: string): Promise<DoctorScheduleData> => {
  const result = await fetchDoctorScheduleById(Number(id));
  if (!result) {
    throw new Error(`Dokter dengan ID ${id} tidak ditemukan`);
  }
  return result;
};
