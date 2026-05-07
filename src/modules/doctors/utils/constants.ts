// ============ Tipe Data dari API ============

/**
 * Item jadwal tunggal yang dikembalikan oleh API.
 * Dipakai sebagai tipe mentah (raw) sebelum data ditransform supaya enak dipakai UI.
 */
export interface DoctorScheduleApiItem {
  tanggal_char: string;
  kode_spesialis: string;
  nama_spesialis: string;
  id_dokter: number;
  nama_dokter: string;
  day_name: string;
  time_start: string;
  time_finish: string;
  status_praktik: "Praktik" | "Tidak Praktik";
}

/**
 * Bentuk response utama dari API jadwal dokter.
 * Dipakai untuk typing hasil fetch (biar aman saat akses `data.list`, `data.parameters`, dll).
 */
export interface DoctorScheduleApiResponse {
  data: {
    list: DoctorScheduleApiItem[];
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

// ============ Tipe Hasil Transform untuk UI ============

/**
 * Model dokter yang sudah diseragamkan untuk kebutuhan UI.
 * Dipakai di komponen (list dokter, filter Spesialis, dll) supaya field-nya konsisten.
 */
export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  spesialisCode: string;
}

/**
 * Slot waktu praktik (hasil transform dari data API).
 * Dipakai untuk menampilkan jam mulai-selesai dan status ketersediaan.
 */
export interface TimeSlot {
  id: string;
  timeStart: string;
  timeFinish: string;
  available: boolean;
}

/**
 * Jadwal per-hari untuk 1 dokter.
 * Dipakai untuk grouping slot berdasarkan tanggal/hari (mis. Senin, Selasa).
 */
export interface ScheduleDay {
  date: string;
  day: string;
  slots: TimeSlot[];
}

/**
 * Data utama yang dikonsumsi UI untuk modul jadwal dokter.
 * Dipakai sebagai output akhir setelah data API dibentuk jadi struktur yang mudah dirender.
 */
export interface DoctorScheduleData {
  doctor: Doctor;
  schedule: ScheduleDay[];
}

// ============ Tipe Spesialis ============

/**
 * Ringkasan spesialis untuk kebutuhan UI filter (dan statistik sederhana).
 * `doctorCount` biasanya hasil agregasi dari daftar dokter yang ada.
 */
export interface Spesialis {
  code: string;
  name: string;
  doctorCount: number;
}

// ============ Konstanta UI ============

/**
 * Batas maksimal rentang tanggal yang boleh dipilih user pada filter.
 * Dipakai untuk membatasi query dan menjaga UI tetap ringan.
 */
export const MAX_DATE_RANGE_DAYS = 5;
