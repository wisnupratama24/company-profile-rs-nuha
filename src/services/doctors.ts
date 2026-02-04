import { nuhaApiClient } from "@/api/nuha-client";
import { nuhaProxyRequest } from "@/api/client";
import {
  DoctorScheduleData,
  DoctorScheduleApiResponse,
  DoctorScheduleApiItem,
  Spesialis,
} from "@/modules/doctors/utils/constants";
import { c } from "@/config";

/**
 * `services/doctors`
 *
 * Service layer untuk mengambil data dokter/jadwal dari backend berdasarkan environment:
 * - `BE_ENV = "nuha"`: akses ke Nuha Integration API. Untuk keamanan, **browser tidak boleh call Nuha
 *   langsung**, jadi request browser diproxy via `POST /api/nuha/proxy`.
 * - `BE_ENV = "local"`: akses ke gateway internal (endpoint berbeda), tetap memakai `nuhaApiClient`
 *   (yang pada mode ini akan memakai token statik `BASE_TOKEN`).
 *
 * Output fungsi-fungsi di file ini sudah disesuaikan ke format UI (`DoctorScheduleData`, `Poli`),
 * sehingga komponen tidak perlu memahami struktur response mentah dari API.
 */

// NOTE: We intentionally avoid sending a timezone offset (+07, etc) in the payload.
// The API behaves best when we send UTC ISO strings (...Z) derived from a local date.

// Cache nilai env sekali agar branching konsisten di satu module.
const be_env = c.CONFIG.BE_ENV;

// API Constants
const LAPORAN_VIEW_ID = 123;
const DOCTOR_PROFILE_VIEW_ID = 107;
const DEFAULT_LIMIT = 1000;

export interface FetchDoctorScheduleParams {
  spesialis?: string;
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
 *
 * Kenapa begini:
 * - User memilih tanggal "local", tapi API cenderung stabil kalau menerima timestamp UTC (...Z).
 * - Kita buat "start of day" berdasarkan local time, lalu kirim representasi UTC-nya agar tidak
 *   terjadi pergeseran hari saat diproses server/API.
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

type DynamicViewReportBody = {
  id_laporan_view: number;
  pages: number;
  limit: number;
  filter_tanggal_awal: string;
  filter_tanggal_akhir: string;
  id_dokter: number | null;
  kode_spesialis: string | null;
};

function buildDynamicViewReportBody(args: {
  viewId: number;
  start: Date;
  end: Date;
  limit?: number;
  id_dokter?: number | null;
  kode_spesialis?: string | null;
}): DynamicViewReportBody {
  return {
    id_laporan_view: args.viewId,
    pages: 1,
    limit: args.limit ?? DEFAULT_LIMIT,
    filter_tanggal_awal: formatDateForApi(args.start),
    filter_tanggal_akhir: formatDateForApi(args.end),
    id_dokter: args.id_dokter ?? null,
    kode_spesialis: args.kode_spesialis ?? null,
  };
}

function buildLocalScheduleParams(args: {
  start: Date;
  end: Date;
  limit?: number;
  id_dokter?: number | null;
  kode_spesialis?: string | null;
}) {
  return {
    pages: 1,
    limit: args.limit ?? DEFAULT_LIMIT,
    tanggal_awal: formatDateForApi(args.start),
    tanggal_akhir: formatDateForApi(args.end),
    id_dokter: args.id_dokter ?? null,
    kode_spesialis: args.kode_spesialis ?? null,
  };
}

/**
 * Transform API response items to DoctorScheduleData format
 * Groups schedule items by doctor
 *
 * Input: `DoctorScheduleApiItem[]` biasanya berisi baris per slot jadwal.
 * Output: data digroup per dokter, lalu per tanggal, supaya mudah dirender di UI.
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
        spesialisCode: doctor.kode_spesialis,
      },
      schedule: scheduleDays,
    };
  });
}

/**
 * Extract unique polis from API response
 *
 * Dipakai untuk membangun filter poli di UI. Karena belum ada endpoint khusus poli,
 * kita ambil unik berdasarkan `kode_spesialis` dari list jadwal yang didapat.
 */
function extractSpesialis(items: DoctorScheduleApiItem[]): Spesialis[] {
  const spesialisMap = new Map<string, { name: string; doctorIds: Set<number> }>();

  items.forEach((item) => {
    if (!spesialisMap.has(item.kode_spesialis)) {
      spesialisMap.set(item.kode_spesialis, {
        name: item.nama_spesialis,
        doctorIds: new Set(),
      });
    }
    spesialisMap.get(item.kode_spesialis)!.doctorIds.add(item.id_dokter);
  });

  return Array.from(spesialisMap.entries()).map(([code, data]) => ({
    code,
    name: data.name,
    doctorCount: data.doctorIds.size,
  }));
}

/**
 * Fetch doctor schedules from Nuha API
 * Uses date range for filtering, defaults to today
 *
 * Alur berdasarkan env:
 * - `nuha`: POST ke dynamic view report (`/open-api/emr/dynamic-view-report`).
 *   - Browser runtime: lewat `/api/nuha/proxy` agar token tetap server-side.
 *   - Server runtime: boleh langsung via `nuhaApiClient`.
 * - `local`: GET ke gateway internal (`/dokter/jadwal-dokter`).
 */
export async function fetchDoctorSchedules(
  params?: FetchDoctorScheduleParams
): Promise<DoctorScheduleData[]> {
  try {
    let data: DoctorScheduleApiResponse;
    const startDate = params?.startDate || new Date();
    const endDate = params?.endDate || startDate;
    
    if (be_env === "nuha") {
      // Jika menggunakan gateway nuha
      // NOTE: Agar token tetap server-side, di browser kita proxy lewat Next route handler.
      const body = buildDynamicViewReportBody({
        viewId: LAPORAN_VIEW_ID,
        start: startDate,
        end: endDate,
        limit: DEFAULT_LIMIT,
        id_dokter: params?.id_dokter ?? null,
        kode_spesialis: params?.kode_spesialis ?? null,
      });

      if (typeof window !== "undefined") {
        data = await nuhaProxyRequest<DoctorScheduleApiResponse>({
          method: "POST",
          path: "/open-api/emr/dynamic-view-report",
          body,
        });
      } else {
        // Server runtime (SSR/route handler): langsung call Nuha via axios + interceptor token.
        data = (
          await nuhaApiClient.post<DoctorScheduleApiResponse>(
            "/open-api/emr/dynamic-view-report",
            body
          )
        ).data;
      }
    } else if (be_env === "local") {
      // Jika menggunakan gateway sendiri
      data = (
        await nuhaApiClient.get<DoctorScheduleApiResponse>(
        "/dokter/jadwal-dokter",
        {
          params: {
            ...buildLocalScheduleParams({
              start: startDate,
              end: endDate,
              limit: DEFAULT_LIMIT,
              id_dokter: params?.id_dokter ?? null,
              kode_spesialis: params?.kode_spesialis ?? null,
            }),
          },
        }
      )
      ).data;


    } else {
      // Kalau sampai sini, artinya BE_ENV tidak kebaca / tidak sesuai.
      // Ini biasanya terjadi kalau env-nya tidak diprefix NEXT_PUBLIC_ tapi dipakai di client.
      throw new Error(
        `Invalid BE_ENV: "${String(be_env)}". Expected "nuha" or "local".`
      );
    }
  
    // Nuha API (dan gateway) membungkus status di `meta_data`, bukan HTTP status.
    if (data.meta_data.status !== 200) {
      throw new Error(data.meta_data.message);
    }

    let doctors = transformApiResponse(data.data.list);

    // Client-side filter by spesialis name (if API doesn't support it directly)
    if (params?.spesialis) {
      doctors = doctors.filter(
        (d) => d.doctor.specialization.toLowerCase() === params.spesialis!.toLowerCase()
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
 *
 * Karena belum ada endpoint khusus list poli, kita ambil dari jadwal dokter pada range tanggal.
 * Hasilnya unik berdasarkan `kode_spesialis`.
 */
export async function fetchSpesialis(startDate?: Date, endDate?: Date): Promise<Spesialis[]> {
  try {
    let data: DoctorScheduleApiResponse;
    const start = startDate || new Date();
    const end = endDate || start;
    
    if (be_env === "nuha") {
      // Jika menggunakan gateway nuha
      const body = buildDynamicViewReportBody({
        viewId: LAPORAN_VIEW_ID,
        start,
        end,
        limit: DEFAULT_LIMIT,
        id_dokter: null,
        kode_spesialis: null,
      });

      if (typeof window !== "undefined") {
        data = await nuhaProxyRequest<DoctorScheduleApiResponse>({
          method: "POST",
          path: "/open-api/emr/dynamic-view-report",
          body,
        });
      } else {
        data = (
          await nuhaApiClient.post<DoctorScheduleApiResponse>(
            "/open-api/emr/dynamic-view-report",
            body
          )
        ).data;
      }
    } else if (be_env === "local") {
      // Jika menggunakan gateway sendiri
      data = (
        await nuhaApiClient.get<DoctorScheduleApiResponse>(
        "/dokter/jadwal-dokter",
        {
          params: {
            ...buildLocalScheduleParams({
              start,
              end,
              limit: DEFAULT_LIMIT,
              id_dokter: null,
              kode_spesialis: null,
            }),
          },
        }
      )
      ).data;
    } else {
      throw new Error(
        `Invalid BE_ENV: "${String(be_env)}". Expected "nuha" or "local".`
      );
    }

    if (data.meta_data.status !== 200) {
      throw new Error(data.meta_data.message);
    }

    return extractSpesialis(data.data.list);
  } catch (error) {
    console.error("Error fetching spesialis:", error);
    throw error;
  }
}

/**
 * Fetch a single doctor's schedule by ID
 *
 * Mirip `fetchDoctorSchedules`, tapi mengisi `id_dokter` untuk filter server-side,
 * lalu ambil hasil dokter yang sesuai.
 */
export async function fetchDoctorScheduleById(
  id: number,
  startDate?: Date,
  endDate?: Date
): Promise<DoctorScheduleData | null> {
  try {
    let data: DoctorScheduleApiResponse;
    const start = startDate || new Date();
    const end = endDate || start;
    
    if (be_env === "nuha") {
      // Jika menggunakan gateway nuha
      const body = buildDynamicViewReportBody({
        viewId: LAPORAN_VIEW_ID,
        start,
        end,
        limit: DEFAULT_LIMIT,
        id_dokter: id,
        kode_spesialis: null,
      });

      if (typeof window !== "undefined") {
        data = await nuhaProxyRequest<DoctorScheduleApiResponse>({
          method: "POST",
          path: "/open-api/emr/dynamic-view-report",
          body,
        });
      } else {
        data = (
          await nuhaApiClient.post<DoctorScheduleApiResponse>(
            "/open-api/emr/dynamic-view-report",
            body
          )
        ).data;
      }
    } else if (be_env === "local") {
      // Jika menggunakan gateway sendiri
      data = (
        await nuhaApiClient.get<DoctorScheduleApiResponse>(
        "/dokter/jadwal-dokter",
        {
          params: {
            ...buildLocalScheduleParams({
              start,
              end,
              limit: DEFAULT_LIMIT,
              id_dokter: id,
              kode_spesialis: null,
            }),
          },
        }
      )
      ).data;
    } else {
      throw new Error(
        `Invalid BE_ENV: "${String(be_env)}". Expected "nuha" or "local".`
      );
    }

    if (data.meta_data.status !== 200) {
      throw new Error(data.meta_data.message);
    }

    const doctors = transformApiResponse(data.data.list);
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
    let data: DoctorProfileApiResponse;
    const d = date || new Date();

    if (be_env === "nuha") {
      // Jika menggunakan gateway nuha
      const body = buildDynamicViewReportBody({
        viewId: DOCTOR_PROFILE_VIEW_ID,
        start: d,
        end: d,
        limit: 10,
        id_dokter,
        kode_spesialis: null,
      });

      if (typeof window !== "undefined") {
        data = await nuhaProxyRequest<DoctorProfileApiResponse>({
          method: "POST",
          path: "/open-api/emr/dynamic-view-report",
          body,
        });
      } else {
        data = (
          await nuhaApiClient.post<DoctorProfileApiResponse>(
            "/open-api/emr/dynamic-view-report",
            body
          )
        ).data;
      }
    } else if (be_env === "local") {
      // jika menggunakan gateway sendiri
      data = (
        await nuhaApiClient.get<DoctorProfileApiResponse>(
        "/dokter/detail-jadwal-dokter",
        {
          params: {
            ...buildLocalScheduleParams({
              start: d,
              end: d,
              limit: 10,
              id_dokter,
              kode_spesialis: null,
            }),
          },
        }
      )
      ).data;
    } else {
      throw new Error(
        `Invalid BE_ENV: "${String(be_env)}". Expected "nuha" or "local".`
      );
    }

    if (data.meta_data.status !== 200) {
      throw new Error(data.meta_data.message);
    }

    const item = data.data.list?.[0];
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
