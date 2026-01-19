import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BookingByDoctorRow } from "../utils/constants";
import { formatNumber } from "../utils/helpers";
import { EmptyState } from "./empty-state";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

export function BookingByDoctorCard({
  isLoading,
  rows,
  motionDelay,
}: {
  isLoading: boolean;
  rows: BookingByDoctorRow[];
  motionDelay?: number;
}) {
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => row.doctorName.toLowerCase().includes(q));
  }, [query, rows]);

  return (
    <motion.div
      className="lg:col-span-2"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionDelay !== undefined ? { delay: motionDelay } : undefined}
    >
      <Card className="h-full">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-3">
            <CardTitle className="leading-none">Detail Booking per Dokter</CardTitle>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari dokter..."
              className="h-9 w-[220px]"
            />
          </div>
          {/* <CardDescription>
            Membutuhkan sumber data booking/appointments. Saat ini belum tersedia di codebase, jadi nilai 0.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Memuat…</div>
          ) : rows.length === 0 ? (
            <EmptyState title="Tidak ada dokter praktek hari ini" />
          ) : filteredRows.length === 0 ? (
            <EmptyState title="Tidak ada hasil yang cocok" />
          ) : (
            <ScrollArea className="h-[260px] pr-3">
              <div className="space-y-2">
                {filteredRows.map((row) => (
                  <div key={row.doctorId} className="flex items-center justify-between rounded-lg border px-3 py-2">
                    <div className="min-w-0">
                      <div className="truncate font-medium">{row.doctorName}</div>
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

