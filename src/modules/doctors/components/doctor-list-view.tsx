"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";
import { DateRange } from "react-day-picker";
import { DoctorScheduleData } from "../utils/constants";
import { DoctorScheduleView } from "./doctor-schedule-view";
import { PoliCard } from "./poli-card";
import { formatDateRangeLabel, formatPoliLabel, hasActiveFilters } from "../utils/helpers";
import { useDoctorAvatars } from "../hooks/use-doctor-avatars";

interface PoliStat {
  name: string;
  doctors: number;
  availableSlots: number;
}

/**
 * Props untuk `DoctorListView`.
 *
 * Kegunaan:
 * - Menentukan filter aktif (poli, nama, rentang tanggal).
 * - Menentukan data yang ditampilkan:
 *   - `filteredDoctors`: daftar dokter hasil filter (untuk mode "Hasil Pencarian")
 *   - `poliStats`: ringkasan poli (untuk mode "Semua Poli")
 */
interface DoctorListViewProps {
  /** Nama poli yang sedang dipilih (kalau ada). */
  selectedPoli: string | null;
  /** Kata kunci pencarian nama dokter. */
  searchDoctor: string;
  /** Rentang tanggal pencarian (from/to). */
  dateRange: DateRange | undefined;
  /** Flag untuk memaksa tampilkan daftar dokter walau tidak ada filter. */
  showAllDoctors: boolean;
  /** Data dokter hasil filter (sudah siap untuk UI). */
  filteredDoctors: DoctorScheduleData[];
  /** Ringkasan poli (jumlah dokter + total slot tersedia). */
  poliStats: PoliStat[];
  /** Handler saat user memilih kartu poli. */
  onPoliSelect: (poli: string) => void;
}

/**
 * Menampilkan konten utama untuk modul Jadwal Dokter (bagian kanan):
 * - Jika ada filter aktif / mode tampil semua dokter: tampilkan daftar kartu dokter + jadwal.
 * - Jika tidak ada filter: tampilkan grid kartu poli sebagai pintu masuk pemilihan poli.
 */
export function DoctorListView({
  selectedPoli,
  searchDoctor,
  dateRange,
  showAllDoctors,
  filteredDoctors,
  poliStats,
  onPoliSelect,
}: DoctorListViewProps) {
  // Menentukan apakah ada filter yang aktif (dipakai untuk mengubah mode tampilan).
  const hasFilters = hasActiveFilters(selectedPoli, searchDoctor, dateRange);
  // Mode tampilan: list dokter jika ada filter aktif atau user menekan "Semua Dokter".
  const showDoctorsList = hasFilters || showAllDoctors;
  
  // Menyimpan pilihan hari (tab) per dokter, supaya setiap kartu dokter bisa memilih hari sendiri.
  const [selectedDays, setSelectedDays] = useState<Record<string, number>>({});
  
  // Update pilihan hari untuk dokter tertentu.
  const handleDaySelect = (doctorId: string, dayIndex: number) => {
    setSelectedDays((prev) => ({
      ...prev,
      [doctorId]: dayIndex,
    }));
  };

  // Prefetch/batch fetch avatar untuk semua dokter yang sedang ditampilkan (jalan paralel).
  const { avatarSrcByDoctorId, isLoadingByDoctorId } = useDoctorAvatars(
    showDoctorsList ? filteredDoctors : [],
    selectedDays
  );

  return (
    <motion.div
      key="doctor-list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col"
    >
      <div className="space-y-6 pb-6">
        {/* Bagian header: menampilkan chip filter yang aktif + judul & ringkasan jumlah data */}
        <div className="space-y-4">
          <div>
            {selectedPoli && (
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                  {formatPoliLabel(selectedPoli)}
                </span>
              </div>
            )}
            {(searchDoctor || dateRange?.from) && (
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {searchDoctor && (
                  <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                    Nama: {searchDoctor}
                  </span>
                )}
                {dateRange?.from && (
                  <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                    Tanggal: {formatDateRangeLabel(dateRange)}
                  </span>
                )}
              </div>
            )}
            <h1 className="text-3xl font-bold leading-tight mb-3">
              {showDoctorsList ? "Hasil Pencarian" : "Semua Spesialis"}
            </h1>
            <p className="text-base text-muted-foreground">
              {showDoctorsList
                ? `${filteredDoctors.length} dokter ditemukan${
                    selectedPoli && !searchDoctor && !dateRange?.from
                      ? " di spesialis ini"
                      : ""
                  }${(searchDoctor || dateRange?.from) ? " sesuai pencarian Anda" : ""}`
                : `${poliStats.length} spesialis tersedia`}
            </p>
          </div>
          <Separator />
        </div>

        {/* Konten utama:
            - Kalau ada filter / mode tampil semua dokter: tampilkan list kartu dokter + jadwal
            - Kalau tidak: tampilkan grid kartu poli */}
        {showDoctorsList ? (
          <div className="space-y-4">
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Tidak ada dokter ditemukan sesuai kriteria pencarian Anda.
                </p>
              </div>
            ) : (
              filteredDoctors.map((doctor, index) => (
                <DoctorScheduleView
                  key={doctor.doctor.id}
                  doctor={doctor}
                  selectedDay={selectedDays[doctor.doctor.id] ?? 0}
                  onDaySelect={(dayIndex) => handleDaySelect(doctor.doctor.id, dayIndex)}
                  avatarSrc={avatarSrcByDoctorId[doctor.doctor.id] ?? null}
                  isLoadingAvatar={isLoadingByDoctorId[doctor.doctor.id] ?? false}
                  disableAvatarFetch
                />
              ))
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {poliStats.map((poli, index) => (
              <PoliCard
                key={poli.name}
                name={poli.name}
                doctors={poli.doctors}
                availableSlots={poli.availableSlots}
                index={index}
                onClick={() => onPoliSelect(poli.name)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
