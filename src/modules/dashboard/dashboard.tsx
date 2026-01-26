 "use client";

 import { useMemo, useState } from "react";
 import { format } from "date-fns";
 import { id } from "date-fns/locale";
import { Stethoscope } from "lucide-react";
 
 import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "./components/dashboard-header";
import { BookingChartsSection } from "./components/booking-charts";
import { ErrorBanner } from "./components/error-banner";
import { MetricCard } from "./components/metric-card";
import { BookingByDoctorCard } from "./components/booking-by-doctor-card";
import { BookingBySpecializationCard } from "./components/booking-by-specialization-card";
import { PracticingBySpecializationCard } from "./components/practicing-by-specialization-card";
import { useDashboardSummary } from "./hooks/use-dashboard-summary";
import { formatNumber } from "./utils/helpers";
 
 export default function Dashboard() {
   const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
 
  const { data, isLoading, error, dataUpdatedAt, refetch } = useDashboardSummary(selectedDate);

  const totals = data?.totals;
  const totalDoctorsPracticingToday = totals?.doctorsPracticing ?? 0;
  const totalDoctorsNotPracticingToday = totals?.doctorsNotPracticing ?? 0;
  const totalDoctorsOnLeaveToday = totals?.doctorsOnLeave ?? 0;
  const totalDoctorsOnDate = totals?.doctorsTotal ?? 0;
 
   const todayLabel = useMemo(
     () => format(selectedDate, "EEEE, dd MMM yyyy", { locale: id }),
     [selectedDate]
   );
   const lastUpdatedLabel = useMemo(() => {
     if (!dataUpdatedAt) return null;
     return format(new Date(dataUpdatedAt), "HH:mm:ss", { locale: id });
   }, [dataUpdatedAt]);
 
   return (
    <div className="max-w-7xl w-full">
      <DashboardHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        todayLabel={todayLabel}
        lastUpdatedLabel={lastUpdatedLabel}
      />
 
      {error ? (
        <ErrorBanner
          message={error instanceof Error ? error.message : "Terjadi kesalahan saat memanggil API."}
          onRetry={() => refetch()}
          motionDelay={0.05}
        />
      ) : null}
 
      {/* Charts (Top 5 booking) */}
      <div className="mb-4">
        <BookingChartsSection
          isLoading={isLoading}
          bookingByDoctor={data?.bookingByDoctor ?? []}
          bookingBySpecialization={data?.bookingBySpecialization ?? []}
        />
      </div>

       <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
         {/* Total dokter praktek hari ini */}
        <MetricCard
          className="lg:col-span-1"
          title="Dokter Praktek Hari Ini"
          icon={<Stethoscope className="h-5 w-5" />}
          description="Total dokter yang praktek hari ini."
          isLoading={isLoading}
          motionDelay={0.05}
          value={
            <div>
              <div className="text-4xl font-bold">{formatNumber(totalDoctorsPracticingToday)}</div>
              <div className="text-sm text-muted-foreground">
                dari {formatNumber(totalDoctorsOnDate)} dokter terdata di tanggal ini
              </div>
            </div>
          }
        />
 
         {/* Total dokter tidak praktek */}
        <MetricCard
          className="lg:col-span-1"
          title="Total Dokter Tidak Praktek"
          description="Total dokter yang tidak praktek hari ini."
          isLoading={isLoading}
          motionDelay={0.1}
          value={
            <div>
              <div className="text-4xl font-bold">{formatNumber(totalDoctorsNotPracticingToday)}</div>
              <div className="text-sm text-muted-foreground">berdasarkan data dashboard hari ini</div>
            </div>
          }
        />

        {/* Total dokter libur */}
        <MetricCard
          className="lg:col-span-1"
          title="Total Dokter Libur"
          description="Total dokter yang libur hari ini."
          isLoading={isLoading}
          motionDelay={0.15}
          value={
            <div>
              <div className="text-4xl font-bold">{formatNumber(totalDoctorsOnLeaveToday)}</div>
              <div className="text-sm text-muted-foreground">berdasarkan data dashboard hari ini</div>
            </div>
          }
        />

        <BookingByDoctorCard isLoading={isLoading} rows={data?.bookingByDoctor ?? []} motionDelay={0.2} />
 
        <BookingBySpecializationCard
          isLoading={isLoading}
          rows={data?.bookingBySpecialization ?? []}
          motionDelay={0.25}
        />

        <PracticingBySpecializationCard
          isLoading={isLoading}
          rows={data?.practicingBySpecialization ?? []}
          motionDelay={0.3}
        />
       </div>
 
       <Separator className="my-6" />
 
      <div className="text-xs text-muted-foreground">
         Catatan: angka di dashboard berasal dari summary endpoint (sementara dummy).
      </div>
     </div>
   );
 }
