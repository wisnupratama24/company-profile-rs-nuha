import { CalendarDays } from "lucide-react";
import { motion } from "motion/react";

export function DashboardHeader({
  todayLabel,
  lastUpdatedLabel,
}: {
  todayLabel: string;
  lastUpdatedLabel: string | null;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-sm text-muted-foreground"
      >
        <CalendarDays className="h-4 w-4" />
        <span>Hari ini: {todayLabel}</span>
        {lastUpdatedLabel ? (
          <>
            <span className="mx-1">•</span>
            <span>Update: {lastUpdatedLabel}</span>
          </>
        ) : null}
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold leading-tight"
      >
        Dashboard Monitoring
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-muted-foreground"
      >
        Ringkasan dokter praktek hari ini dan metrik booking.
      </motion.p>
    </div>
  );
}

