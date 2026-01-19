import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BookingBySpecializationRow } from "../utils/constants";
import { formatNumber } from "../utils/helpers";
import { EmptyState } from "./empty-state";
import { motion } from "motion/react";

export function BookingBySpecializationCard({
  isLoading,
  rows,
  motionDelay,
}: {
  isLoading: boolean;
  rows: BookingBySpecializationRow[];
  motionDelay?: number;
}) {
  return (
    <motion.div
      className="lg:col-span-1"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionDelay !== undefined ? { delay: motionDelay } : undefined}
    >
      <Card className="h-full">
        <CardHeader className="border-b">
          <CardTitle className="pt-2 pb-3">Detail Booking per Spesialis</CardTitle>
          {/* <CardDescription>
            Membutuhkan sumber data booking/appointments. Saat ini belum tersedia di codebase, jadi nilai 0.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Memuat…</div>
          ) : rows.length === 0 ? (
            <EmptyState title="Tidak ada spesialis terdata" />
          ) : (
            <ScrollArea className="h-[260px] pr-3">
              <div className="space-y-2">
                {rows.map((row) => (
                  <div key={row.specialization} className="flex items-center justify-between rounded-lg border px-3 py-2">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{row.specialization}</div>
                      <div className="text-xs text-muted-foreground">Booking (hari ini)</div>
                    </div>
                    <div className="shrink-0 text-lg font-semibold">{formatNumber(row.bookings)}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

