import type { DoctorScheduleData } from "@/modules/doctors/utils/constants";
import type {
  BookingByDoctorRow,
  BookingBySpecializationRow,
  PracticingBySpecializationRow,
} from "./constants";

export function countPracticeSlots(d: DoctorScheduleData): number {
  return d.schedule.reduce((dayAcc, day) => {
    const activeSlots = day.slots.filter((s) => s.available).length;
    return dayAcc + activeSlots;
  }, 0);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("id-ID").format(n);
}

export function splitDoctorsByPractice(doctors: DoctorScheduleData[]) {
  const practicing: DoctorScheduleData[] = [];
  const notPracticing: DoctorScheduleData[] = [];

  doctors.forEach((d) => {
    const practiceSlots = countPracticeSlots(d);
    if (practiceSlots > 0) practicing.push(d);
    else notPracticing.push(d);
  });

  return { practicing, notPracticing };
}

export function getPracticingBySpecialization(
  practicingDoctors: DoctorScheduleData[]
): PracticingBySpecializationRow[] {
  const map = new Map<string, Map<string, string>>();

  practicingDoctors.forEach((d) => {
    const key = d.doctor.specialization || "Tidak diketahui";
    if (!map.has(key)) map.set(key, new Map());
    // Ensure uniqueness by id; keep latest name (should be stable anyway)
    map.get(key)!.set(d.doctor.id, d.doctor.name);
  });

  return Array.from(map.entries())
    .map(([specialization, doctorMap]) => {
      const doctorList = Array.from(doctorMap.entries())
        .map(([id, name]) => ({ id, name }))
        .sort((a, b) => a.name.localeCompare(b.name));

      return {
        specialization,
        doctors: doctorList.length,
        doctorList,
      };
    })
    .sort((a, b) => b.doctors - a.doctors || a.specialization.localeCompare(b.specialization));
}

/**
 * NOTE: Booking belum ada sumber data di codebase saat ini.
 * Struktur ini sengaja dibuat supaya nanti gampang disambungkan ke API booking/appointments.
 */
export function getBookingByDoctor(practicingDoctors: DoctorScheduleData[]): BookingByDoctorRow[] {
  return practicingDoctors
    .map((d) => ({
      doctorId: d.doctor.id,
      doctorName: d.doctor.name,
      bookings: 0,
    }))
    .sort((a, b) => b.bookings - a.bookings || a.doctorName.localeCompare(b.doctorName));
}

/**
 * NOTE: Booking belum ada sumber data di codebase saat ini.
 * Nilai tetap 0 per spesialis (placeholder), tapi struktur data sudah siap.
 */
export function getBookingBySpecialization(
  practicingDoctors: DoctorScheduleData[]
): BookingBySpecializationRow[] {
  const map = new Map<string, number>();

  practicingDoctors.forEach((d) => {
    const key = d.doctor.specialization || "Tidak diketahui";
    map.set(key, (map.get(key) || 0) + 0);
  });

  return Array.from(map.entries())
    .map(([specialization, bookings]) => ({ specialization, bookings }))
    .sort((a, b) => b.bookings - a.bookings || a.specialization.localeCompare(b.specialization));
}

