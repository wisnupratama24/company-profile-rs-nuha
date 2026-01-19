/**
 * Konstanta & tipe untuk modul Dashboard.
 *
 * Catatan:
 * - Saat ini belum ada sumber data "dokter libur" (HR/master jadwal).
 * - Dari API jadwal hari-ini saja, kita belum bisa membedakan:
 *   - dokter libur (memang tidak dijadwalkan), vs
 *   - dokter tidak muncul karena tidak ada record jadwal.
 */

export const DUMMY_TOTAL_DOCTOR_LIBUR = 12;

export interface BookingByDoctorRow {
  doctorId: string;
  doctorName: string;
  bookings: number;
}

export interface BookingBySpecializationRow {
  specialization: string;
  bookings: number;
}

export interface PracticingBySpecializationRow {
  specialization: string;
  doctors: number;
  doctorList: Array<{
    id: string;
    name: string;
  }>;
}

