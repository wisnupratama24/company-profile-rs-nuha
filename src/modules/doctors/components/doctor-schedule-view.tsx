"use client";

import { motion } from "motion/react";
import { CalendarIcon, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DoctorScheduleData } from "../utils/constants";
import { formatSpesialisLabel, getDateOnlyKey, getDayAvailableSlotsCount, parseDateOnlyLocal } from "../utils/helpers";
import { useMemo } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDoctorAvatar } from "../hooks/use-doctor-avatar";
import { Spinner } from "@/components/ui/spinner";

/**
 * Props untuk `DoctorScheduleView`.
 *
 * Catatan:
 * - `selectedDay` dan `onDaySelect` dibuat opsional supaya komponen bisa dipakai di 2 mode:
 *   - Mode "detail" (punya kontrol pindah hari)
 *   - Mode "card/list" (tetap bisa render jadwal tanpa wajib ada handler)
 */
interface DoctorScheduleViewProps {
  /** Data dokter + jadwal yang sudah siap untuk UI. */
  doctor: DoctorScheduleData;
  /** Index hari yang sedang dipilih (mengacu ke `schedule` yang sudah diurutkan). */
  selectedDay?: number;
  /** Handler saat user memilih hari (tab). Jika tidak ada, tombol pilihan hari tidak ditampilkan. */
  onDaySelect?: (index: number) => void;
  /** Optional override: avatar src (data URL) dari parent supaya fetch bisa dibatch/paralel. */
  avatarSrc?: string | null;
  /** Optional override: loading state avatar dari parent. */
  isLoadingAvatar?: boolean;
  /** Jika true, komponen tidak akan melakukan fetch avatar sendiri. */
  disableAvatarFetch?: boolean;
}

/**
 * Kartu tampilan jadwal dokter.
 *
 * Kegunaan:
 * - Menampilkan identitas dokter (nama + poli/spesialis).
 * - Menampilkan range tanggal jadwal yang tersedia.
 * - Menampilkan pilihan hari (jika jadwal lebih dari 1 hari dan `onDaySelect` disediakan).
 * - Menampilkan slot waktu praktik dan statusnya (Praktik / Tidak Praktik).
 */
export function DoctorScheduleView({
  doctor,
  selectedDay = 0,
  onDaySelect,
  avatarSrc: avatarSrcProp,
  isLoadingAvatar: isLoadingAvatarProp,
  disableAvatarFetch,
}: DoctorScheduleViewProps) {
  // Urutkan jadwal berdasarkan tanggal (pakai parse lokal untuk menghindari efek timezone pada date-only string).
  const sortedSchedule = useMemo(() => {
    return [...doctor.schedule].sort(
      (a, b) => +parseDateOnlyLocal(a.date) - +parseDateOnlyLocal(b.date)
    );
  }, [doctor.schedule]);

  const selectedDayData = sortedSchedule[selectedDay];
  const availableSlotsCount = selectedDayData
    ? getDayAvailableSlotsCount(selectedDayData)
    : 0;
  const hasMultipleDays = sortedSchedule.length > 1;

  const doctorIdNumber = Number(doctor.doctor.id);
  const avatarDate = selectedDayData ? parseDateOnlyLocal(selectedDayData.date) : new Date();

  const shouldFetchAvatar = !disableAvatarFetch && avatarSrcProp === undefined;
  const { data: avatarSrcFromQuery, isLoading: isLoadingAvatarFromQuery } = useDoctorAvatar(
    shouldFetchAvatar && Number.isFinite(doctorIdNumber) ? doctorIdNumber : null,
    avatarDate
  );

  const avatarSrc = avatarSrcProp ?? avatarSrcFromQuery ?? null;
  const isLoadingAvatar = isLoadingAvatarProp ?? isLoadingAvatarFromQuery;

  // Membuat teks ringkasan tanggal (1 hari vs rentang hari) untuk header kartu.
  const getDateRangeDisplay = () => {
    if (sortedSchedule.length === 0) return "";
    
    const firstDay = sortedSchedule[0];
    const lastDay = sortedSchedule[sortedSchedule.length - 1];
    
    const firstDate = parseDateOnlyLocal(firstDay.date);
    const lastDate = parseDateOnlyLocal(lastDay.date);
    
    if (firstDay.date.slice(0, 10) === lastDay.date.slice(0, 10)) {
      // Hanya 1 hari jadwal.
      return `${firstDay.day}, ${format(firstDate, "d MMMM yyyy", { locale: id })}`;
    }
    
    // Rentang beberapa hari.
    return `${format(firstDate, "d MMM", { locale: id })} - ${format(lastDate, "d MMM yyyy", { locale: id })}`;
  };

  return (
    <motion.div
      key={doctor.doctor.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg p-6 bg-white"
    >
      <div className="space-y-6">
        {/* Header kartu: spesialis + nama dokter + ringkasan tanggal & jumlah jadwal praktik */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center gap-2">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                    {formatSpesialisLabel(doctor.doctor.specialization)}
                  </span>
                </div>
                <h2 className="text-2xl font-bold leading-tight mb-2">
                  {doctor.doctor.name}
                </h2>
              
            {doctor.schedule.length > 0 && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{getDateRangeDisplay()}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{availableSlotsCount} jadwal praktik</span>
                </div>
              </div>
            )}
            </div>
            <div className="flex items-center mr-8">
                <Avatar className="size-23 rounded-lg">
                  <AvatarImage src={avatarSrc ?? undefined} />
                  <AvatarFallback className="rounded-lg">
                    {isLoadingAvatar ? <Spinner /> : doctor.doctor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Pilihan hari: hanya muncul jika jadwal > 1 hari DAN parent menyediakan `onDaySelect` */}
        {hasMultipleDays && onDaySelect && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pilih Hari</h3>
            <div className="flex gap-2 flex-wrap">
              {sortedSchedule.map((day, index) => {
                const dateObj = parseDateOnlyLocal(day.date);
                const formattedDate = format(dateObj, "d MMM", { locale: id });
                
                return (
                  <motion.button
                    key={day.date}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onDaySelect(index)}
                    className={cn(
                      "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                      selectedDay === index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <span>{day.day}</span>
                    <span className={cn(
                      "text-xs",
                      selectedDay === index
                        ? "text-primary-foreground/80"
                        : "text-muted-foreground/70"
                    )}>
                      {formattedDate}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Slot waktu: menampilkan jadwal untuk hari yang sedang dipilih */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">
              {(() => {
                const todayKey = getDateOnlyKey(new Date());
                const selectedKey = selectedDayData?.date?.slice(0, 10);

                // Jika jadwal lebih dari 1 hari, selalu tampilkan nama hari yang sedang dipilih.
                if (hasMultipleDays) return `Jadwal Praktik - ${selectedDayData?.day ?? ""}`;

                // Jika hanya 1 hari jadwal:
                // - Kalau tanggalnya hari ini, gunakan "Hari Ini"
                // - Kalau bukan, tampilkan nama hari (penting saat hasil filter rentang tanggal hanya mengembalikan 1 hari)
                if (selectedKey && selectedKey === todayKey) return "Jadwal Praktik Hari Ini";
                return `Jadwal Praktik - ${selectedDayData?.day ?? ""}`;
              })()}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {selectedDayData?.slots.map((slot) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200",
                  slot.available
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-700"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{slot.timeStart} - {slot.timeFinish}</span>
                  </div>
                  <span className={cn(
                    "px-2 py-0.5 rounded text-xs",
                    slot.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  )}>
                    {slot.available ? "Praktik" : "Tidak Praktik"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          {(!selectedDayData || selectedDayData.slots.length === 0) && (
            <p className="text-sm text-muted-foreground mt-4">
              Tidak ada jadwal tersedia untuk hari ini.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

