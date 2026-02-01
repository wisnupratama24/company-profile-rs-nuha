import { DoctorScheduleData, ScheduleDay } from "./constants";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";

/**
 * Mengubah text menjadi "Camel Case" versi UI (Title Case per kata).
 * Contoh: "gigi dan mulut" -> "Gigi Dan Mulut", "THT" -> "THT".
 */
export function toTitleCaseWords(input: string): string {
  const normalized = input
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) return "";

  return normalized
    .split(" ")
    .filter(Boolean)
    .map((token) => {
      // Pertahankan angka murni (mis. "24").
      if (/^\d+$/.test(token)) return token;

      // Pertahankan akronim pendek saja (mis. IGD, THT, ICU, RS).
      // Kata uppercase panjang (mis. "ANAK") tetap diubah menjadi Title Case.
      if (/^[A-Z]{2,3}$/.test(token)) return token;

      const lower = token.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

/**
 * Memformat nama spesialis untuk tampilan UI:
 * - Selalu diawali "spesialis"
 * - Nama diubah menjadi Camel/Title Case
 * - Jika input sudah diawali "spesialis", prefix tidak digandakan
 */
export function formatSpesialisLabel(spesialisName: string): string {
  const raw = (spesialisName ?? "").trim();
  if (!raw) return "Spesialis";

  // Hilangkan prefix "Spesialis" kalau sudah ada (case-insensitive) agar tidak dobel.
  const withoutPrefix = raw.replace(/^\s*poli\s+/i, "").trim();
  const formatted = toTitleCaseWords(withoutPrefix);

  return formatted ? `Spesialis ${formatted}` : "Spesialis";
}

/**
 * Menghitung total slot jadwal yang masih tersedia untuk 1 dokter.
 * Dipakai untuk menampilkan ringkasan ketersediaan (mis. "X slot tersedia").
 */
export function getAvailableSlotsCount(doctor: DoctorScheduleData): number {
  return doctor.schedule.reduce(
    (total, day) => total + day.slots.filter((slot) => slot.available).length,
    0
  );
}

/**
 * Menghitung jumlah slot yang tersedia pada 1 hari tertentu.
 * Dipakai untuk indikator ketersediaan per hari (mis. badge jumlah slot).
 */
export function getDayAvailableSlotsCount(day: ScheduleDay): number {
  return day.slots.filter((slot) => slot.available).length;
}

/**
 * Mengubah string tanggal (YYYY-MM-DD atau format ISO) menjadi `Date` lokal pada jam 00:00.
 * Ini buat mencegah pergeseran hari karena timezone saat API mengirim "date-only" (tanpa jam).
 */
export function parseDateOnlyLocal(dateString: string): Date {
  const dateOnly = dateString.slice(0, 10);
  const [y, m, d] = dateOnly.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/**
 * Mengubah `Date` menjadi key `YYYY-MM-DD` menggunakan komponen tanggal lokal.
 * Dipakai buat mencocokkan/lookup jadwal berdasarkan hari tanpa efek timezone.
 */
export function getDateOnlyKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Memformat rentang tanggal untuk tampilan chip/label (bahasa Indonesia).
 * Dipakai di UI filter tanggal supaya ringkas (1 hari vs rentang).
 */
export function formatDateRangeLabel(dateRange: DateRange | undefined): string | null {
  if (!dateRange?.from) return null;
  if (!dateRange.to || dateRange.from.toDateString() === dateRange.to.toDateString()) {
    return format(dateRange.from, "d MMM yyyy", { locale: idLocale });
  }
  return `${format(dateRange.from, "d MMM", { locale: idLocale })} - ${format(dateRange.to, "d MMM yyyy", { locale: idLocale })}`;
}

/**
 * Mengecek apakah ada filter yang sedang aktif.
 * Dipakai untuk menampilkan tombol "Reset/Clear filter" atau indikator filter aktif.
 */
export function hasActiveFilters(
  selectedSpesialis: string | null,
  searchDoctor: string,
  dateRange: DateRange | undefined
): boolean {
  return !!(selectedSpesialis || searchDoctor.trim() || dateRange?.from);
}

