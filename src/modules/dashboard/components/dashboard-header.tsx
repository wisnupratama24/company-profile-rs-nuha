import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, CheckCircle, Loader2, RefreshCcw } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useSyncDashboardData } from "../hooks/use-dashboard-summary";

export function DashboardHeader({
  selectedDate,
  onDateChange,
  todayLabel,
  lastUpdatedLabel,
}: {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  todayLabel: string;
  lastUpdatedLabel: string | null;
}) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const {
    mutate: syncDashboardData,
    isPending: isSyncingDashboardData,
    isSuccess: isSyncedDashboardData,
  } = useSyncDashboardData();

  const syncButtonState = (() => {
    if (isSyncingDashboardData) {
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />,
        label: "Sedang Sinkronisasi Data...",
      };
    }

    if (isSyncedDashboardData) {
      return {
        icon: <CheckCircle className="h-4 w-4 text-emerald-50" />,
        label: "Data berhasil disinkronisasi",
      };
    }

    return {
      icon: <RefreshCcw className="h-4 w-4 text-primary-foreground" />,
      label: "Sinkronisasi Data",
    };
  })();

  const handleSyncDashboardData = () => {
    syncDashboardData();
  };

  return (
    <div className="mb-6 flex flex-col gap-2">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <CalendarDays className="h-4 w-4" />
        <span className="whitespace-nowrap">Tanggal:</span>
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 px-2">
              {todayLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (!date) return;
                onDateChange(date);
                setIsDatePickerOpen(false);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {lastUpdatedLabel ? (
          <>
            <span className="mx-1">•</span>
            <span>Update: {lastUpdatedLabel}</span>
          </>
        ) : null}
      </motion.div>
      <div className="flex justify-between gap-2">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold leading-tight"
        >
          Dashboard Monitoring
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center"
        >
          <Button
            variant="default"
            size="sm"
            onClick={handleSyncDashboardData}
            disabled={isSyncingDashboardData}
            aria-busy={isSyncingDashboardData}
            title={syncButtonState.label}
            className={cn(
              "h-9 rounded-full px-4 shadow-sm transition-all active:scale-[0.98]",
              "hover:shadow-md",
              isSyncingDashboardData && "cursor-wait",
              isSyncedDashboardData &&
                "bg-emerald-600 text-emerald-50 hover:bg-emerald-600"
            )}
          >
            {syncButtonState.icon}
            <span className="max-w-[260px] truncate">{syncButtonState.label}</span>
          </Button>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground"
      >
        Ringkasan dokter praktek {todayLabel} dan metrik booking.
      </motion.p>
    </div>
  );
}

