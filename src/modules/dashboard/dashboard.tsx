 "use client";

 import { useMemo } from "react";
 import { format } from "date-fns";
 import { id } from "date-fns/locale";
import { Stethoscope } from "lucide-react";
 
 import { useDoctors } from "@/modules/doctors/hooks/use-doctors";
 import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "./components/dashboard-header";
import { ErrorBanner } from "./components/error-banner";
import { MetricCard } from "./components/metric-card";
import { BookingByDoctorCard } from "./components/booking-by-doctor-card";
import { BookingBySpecializationCard } from "./components/booking-by-specialization-card";
import { PracticingBySpecializationCard } from "./components/practicing-by-specialization-card";
import { DUMMY_TOTAL_DOCTOR_LIBUR } from "./utils/constants";
import {
  formatNumber,
  getBookingByDoctor,
  getBookingBySpecialization,
  getPracticingBySpecialization,
  splitDoctorsByPractice,
} from "./utils/helpers";
 
 export default function Dashboard() {
   const today = useMemo(() => new Date(), []);
 
   const {
     data: doctors = [],
     isLoading,
     error,
     dataUpdatedAt,
     refetch,
   } = useDoctors({
     startDate: today,
     endDate: today,
   });
 
  const derived = useMemo(() => {
    const { practicing, notPracticing } = splitDoctorsByPractice(doctors);
    return {
      practicing,
      notPracticing,
      practicingBySpecialization: getPracticingBySpecialization(practicing),
      bookingByDoctor: getBookingByDoctor(practicing),
      bookingBySpecialization: getBookingBySpecialization(practicing),
    };
  }, [doctors]);

  const totalDoctorsPracticingToday = derived.practicing.length;
  const totalDoctorsNotPracticingToday = derived.notPracticing.length;
  const totalDoctorsOnLeaveToday = DUMMY_TOTAL_DOCTOR_LIBUR;
 
   const todayLabel = useMemo(() => format(today, "EEEE, dd MMM yyyy", { locale: id }), [today]);
   const lastUpdatedLabel = useMemo(() => {
     if (!dataUpdatedAt) return null;
     return format(new Date(dataUpdatedAt), "HH:mm:ss", { locale: id });
   }, [dataUpdatedAt]);
 
   return (
     <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
      <DashboardHeader todayLabel={todayLabel} lastUpdatedLabel={lastUpdatedLabel} />
 
      {error ? (
        <ErrorBanner
          message={error instanceof Error ? error.message : "Terjadi kesalahan saat memanggil API."}
          onRetry={() => refetch()}
          motionDelay={0.05}
        />
      ) : null}
 
       <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
         {/* Total dokter praktek hari ini */}
        <MetricCard
          className="lg:col-span-1"
          title="Dokter Praktek Hari Ini"
          icon={<Stethoscope className="h-5 w-5" />}
          description="Total dokter yang memiliki slot berstatus “Praktik” hari ini."
          isLoading={isLoading}
          motionDelay={0.05}
          value={
            <div>
              <div className="text-4xl font-bold">{formatNumber(totalDoctorsPracticingToday)}</div>
              <div className="text-sm text-muted-foreground">
                dari {formatNumber(doctors.length)} dokter terdata di tanggal ini
              </div>
            </div>
          }
        />
 
         {/* Total dokter tidak praktek */}
        <MetricCard
          className="lg:col-span-1"
          title="Total Dokter Tidak Praktek"
          description="Dihitung dari data jadwal hari ini: dokter tanpa slot “Praktik” (semua slot “Tidak Praktik”)."
          isLoading={isLoading}
          motionDelay={0.1}
          value={
            <div>
              <div className="text-4xl font-bold">{formatNumber(totalDoctorsNotPracticingToday)}</div>
              <div className="text-sm text-muted-foreground">berdasarkan data jadwal yang masuk hari ini</div>
            </div>
          }
        />

         {/* Total dokter libur (dummy) */}
        <MetricCard
          className="lg:col-span-1"
          title="Total Dokter Libur"
          description="Dummy sementara (menunggu sumber data libur/HR)."
          isLoading={isLoading}
          motionDelay={0.15}
          value={
            <div>
              <div className="text-4xl font-bold">{formatNumber(totalDoctorsOnLeaveToday)}</div>
              <div className="text-sm text-muted-foreground">dummy value</div>
            </div>
          }
        />

        <BookingByDoctorCard isLoading={isLoading} rows={derived.bookingByDoctor} motionDelay={0.2} />
 
        <BookingBySpecializationCard
          isLoading={isLoading}
          rows={derived.bookingBySpecialization}
          motionDelay={0.25}
        />

        <PracticingBySpecializationCard
          isLoading={isLoading}
          rows={derived.practicingBySpecialization}
          motionDelay={0.3}
        />
       </div>
 
       <Separator className="my-6" />
 
      <div className="text-xs text-muted-foreground">
         Catatan: “Dokter Praktek Hari Ini” dihitung dari slot jadwal dengan status <span className="font-medium">Praktik</span> pada tanggal hari ini.
      </div>
     </div>
   );
 }
