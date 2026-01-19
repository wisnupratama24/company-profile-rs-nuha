"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Filter } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { DoctorScheduleData } from "./utils/constants";
import { FilterSection } from "./components/filter-section";
import { SearchSection } from "./components/search-section";
import { DoctorListView } from "./components/doctor-list-view";
import { DoctorScheduleView } from "./components/doctor-schedule-view";
import { formatPoliLabel, getAvailableSlotsCount } from "./utils/helpers";
import { useDoctors } from "./hooks/use-doctors";

/**
 * Halaman/modul "Jadwal Dokter".
 *
 * Kegunaan utama:
 * - Menyediakan filter poli, filter dokter, pencarian nama, dan filter rentang tanggal.
 * - Mengambil data dokter dari API via `useDoctors`, lalu menampilkan:
 *   - Ringkasan poli (kartu poli) atau
 *   - Daftar dokter (kartu dokter + jadwal), atau
 *   - Detail jadwal 1 dokter (kalau user memilih dokter di panel kiri).
 */
function DoctorSchedule() {
  const [selectedPoli, setSelectedPoli] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorScheduleData | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);

  // State buka/tutup panel filter (collapsible) di sidebar.
  const [isPoliOpen, setIsPoliOpen] = useState(true);
  const [isDoctorsOpen, setIsDoctorsOpen] = useState(true);

  // State input pencarian & rentang tanggal (dipakai sebagai parameter query API).
  const [searchDoctor, setSearchDoctor] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // Flag tampilan:
  // - `showAllDoctors`: paksa tampilkan daftar dokter (tanpa pilih dokter spesifik).
  const [showAllDoctors, setShowAllDoctors] = useState(false);

  // API: ambil semua dokter TANPA filter poli supaya bisa dapat daftar poli lengkap.
  const { data: allDoctors = [], isLoading: isLoadingAllDoctors } = useDoctors({
    search: searchDoctor.trim() || undefined,
    startDate: dateRange?.from,
    endDate: dateRange?.to || dateRange?.from,
  });

  // API: ambil dokter dengan filter aktif (poli/nama/tanggal).
  const { data: doctors = [], isLoading, error } = useDoctors({
    poli: selectedPoli || undefined,
    search: searchDoctor.trim() || undefined,
    startDate: dateRange?.from,
    endDate: dateRange?.to || dateRange?.from,
  });

  // Loading gabungan: konten dianggap loading kalau salah satu query masih loading.
  const isContentLoading = isLoading || isLoadingAllDoctors;

  // Ambil daftar poli unik dari SEMUA dokter (bukan yang sudah terfilter).
  const polis = useMemo(() => {
    const deptSet = new Set<string>();
    allDoctors.forEach((doctor) => {
      deptSet.add(doctor.doctor.specialization);
    });
    return Array.from(deptSet).sort();
  }, [allDoctors]);

  // Statistik poli untuk tampilan ringkas (jumlah dokter + total slot tersedia per poli).
  const poliStats = useMemo(() => {
    return polis.map((dept) => {
      const deptDoctors = doctors.filter(
        (doctor) => doctor.doctor.specialization === dept
      );
      const totalSlots = deptDoctors.reduce(
        (acc, doc) => acc + getAvailableSlotsCount(doc),
        0
      );
      return {
        name: dept,
        doctors: deptDoctors.length,
        availableSlots: totalSlots,
      };
    });
  }, [polis, doctors]);

  // Data `doctors` sudah dalam kondisi terfilter oleh API (poli/nama/tanggal).
  const filteredDoctors = doctors;

  // Siapkan data poli untuk komponen `FilterSection` (sidebar).
  const poliItems = useMemo(() => {
    return polis.map((dept) => ({
      id: dept,
      label: formatPoliLabel(dept),
    }));
  }, [polis]);

  // Siapkan data dokter untuk komponen `FilterSection` (sidebar).
  const doctorItems = useMemo(() => {
    return filteredDoctors.map((doctor) => ({
      id: doctor.doctor.id,
      label: doctor.doctor.name,
      subtitle: formatPoliLabel(doctor.doctor.specialization),
      doctorData: doctor, // Simpan referensi data lengkap (biar gampang dipakai kalau diperlukan).
    }));
  }, [filteredDoctors]);

  // Reset flag tampilan (dipanggil saat user mulai mengetik / ganti tanggal / ganti pilihan).
  const resetFilterStates = useCallback(() => {
    setShowAllDoctors(false);
  }, []);

  // Bersihkan semua filter dan kembalikan ke kondisi awal (default: tampilkan semua poli).
  const clearAllFilters = useCallback(() => {
    resetFilterStates();
    setSearchDoctor("");
    setDateRange(undefined);
    setSelectedPoli(null);
    setSelectedDoctor(null);
    setSelectedDay(0);
  }, [resetFilterStates]);

  // NOTE:
  // Sebelumnya ada `useEffect` yang melakukan `setState` ketika filter berubah.
  // Itu memicu rule `react-hooks/set-state-in-effect` dan juga rawan cascading renders.
  // Sekarang reset pilihan dokter dilakukan langsung di event handler saat filter diubah.

  return (
    <div className="max-w-7xl w-full">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight mb-2"
        >
          Jadwal Dokter
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-6"
        >
          Jadwal praktik dokter {dateRange?.from 
            ? dateRange.to && dateRange.from.toDateString() !== dateRange.to.toDateString()
              ? `${format(dateRange.from, "d MMMM", { locale: id })} - ${format(dateRange.to, "d MMMM yyyy", { locale: id })}`
              : format(dateRange.from, "EEEE, d MMMM yyyy", { locale: id })
            : "hari ini"}
        </motion.p>

        {/* Panel pencarian: input nama dokter + filter rentang tanggal + tombol reset */}
        <SearchSection
          searchDoctor={searchDoctor}
          dateRange={dateRange}
          onSearchDoctorChange={(value) => {
            resetFilterStates();
            setSelectedDoctor(null);
            setSelectedDay(0);
            setSearchDoctor(value);
          }}
          onDateRangeChange={(range) => {
            resetFilterStates();
            setSelectedDoctor(null);
            setSelectedDay(0);
            setDateRange(range);
          }}
          onClearAll={clearAllFilters}
        />
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-6 min-h-[800px]">
        {/* Sidebar kiri: filter poli + filter dokter */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:sticky lg:top-24 lg:self-start gap-4"
        >
          {/* Filter Poli (selalu ditampilkan) */}
          <FilterSection
            title="Spesialis"
            icon={<Filter className="h-4 w-4" />}
            items={poliItems}
            selectedId={selectedPoli}
            onSelect={(id) => {
              if (id === null) {
                setSelectedPoli(null);
                setSelectedDoctor(null);
                setSelectedDay(0);
                setShowAllDoctors(false);
              } else {
                setSelectedPoli(id);
                setSelectedDoctor(null);
                setSelectedDay(0);
                resetFilterStates();
              }
            }}
            allLabel="Semua Spesialis"
            isOpen={isPoliOpen}
            onOpenChange={setIsPoliOpen}
            showAllButton={true}
            isAllActive={
              !selectedPoli && !selectedDoctor && !showAllDoctors
            }
          />

          {/* Filter Dokter (selalu ditampilkan, loading-nya ditangani di dalam komponen) */}
          <FilterSection
            title="Dokter"
            items={doctorItems}
            selectedId={selectedDoctor?.doctor.id || null}
            onSelect={(id) => {
              if (id === null) {
                setSelectedPoli(null);
                setSelectedDoctor(null);
                setSelectedDay(0);
                setShowAllDoctors(true);
                setSearchDoctor("");
                setDateRange(undefined);
              } else {
                const doctor = filteredDoctors.find((d) => d.doctor.id === id);
                if (doctor) {
                  resetFilterStates();
                  setSelectedPoli(null);
                  setSelectedDoctor(doctor);
                  setSelectedDay(0);
                }
              }
            }}
            allLabel="Semua Dokter"
            isOpen={isDoctorsOpen}
            onOpenChange={setIsDoctorsOpen}
            count={
              selectedPoli || searchDoctor || dateRange?.from
                ? filteredDoctors.length
                : undefined
            }
            subtitle={
              searchDoctor || dateRange?.from ? "Difilter berdasarkan pencarian" : undefined
            }
            showAllButton={true}
            isAllActive={
              showAllDoctors &&
              !selectedDoctor &&
              !selectedPoli &&
              !searchDoctor &&
              !dateRange?.from
            }
            isLoading={isLoading}
          />
        </motion.div>

        {/* Konten kanan: menampilkan daftar dokter/poli ATAU detail jadwal dokter yang dipilih */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col"
        >
          {error ? (
            /* State error: ditampilkan di area konten kanan */
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="text-center">
                <p className="text-destructive mb-4">
                  {error instanceof Error ? error.message : "Gagal memuat dokter"}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          ) : isContentLoading ? (
            /* State loading: ditampilkan di area konten kanan */
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Memuat dokter...</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {!selectedDoctor ? (
                <DoctorListView
                  selectedPoli={selectedPoli}
                  searchDoctor={searchDoctor}
                  dateRange={dateRange}
                  showAllDoctors={showAllDoctors}
                  filteredDoctors={filteredDoctors}
                  poliStats={poliStats}
                  onPoliSelect={setSelectedPoli}
                />
              ) : (
                <DoctorScheduleView
                  doctor={selectedDoctor}
                  selectedDay={selectedDay}
                  onDaySelect={setSelectedDay}
                />
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default DoctorSchedule;
