"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "./empty-state";

import type { BookingByDoctorRow, BookingBySpecializationRow } from "../utils/constants";
import { formatNumber } from "../utils/helpers";

type BookingChartDatum = {
  name: string;
  bookings: number;
};

function truncateLabel(s: string, max = 18) {
  if (s.length <= max) return s;
  return `${s.slice(0, Math.max(0, max - 1))}…`;
}

function topNByBookings<T extends { bookings: number }>(rows: T[], n: number): T[] {
  return [...rows].sort((a, b) => b.bookings - a.bookings).slice(0, n);
}

function bottomNByBookings<T extends { bookings: number }>(rows: T[], n: number): T[] {
  return [...rows].sort((a, b) => a.bookings - b.bookings).slice(0, n);
}

function toChartData(rows: Array<{ name: string; bookings: number }>): BookingChartDatum[] {
  return rows.map((r) => ({ name: r.name, bookings: r.bookings }));
}

function BookingBarChart({
  chartId,
  config,
  data,
}: {
  chartId: string;
  config: ChartConfig;
  data: BookingChartDatum[];
}) {
  return (
    <ChartContainer id={chartId} config={config} className="min-h-[260px] w-full">
      <BarChart accessibilityLayer data={data} margin={{ left: -8, right: 16, top: 14 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          tickFormatter={(v) => truncateLabel(String(v), 13)}
        />
        <YAxis
          dataKey="bookings"
          type="number"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(v) => formatNumber(Number(v))}
        />
        {/* Tooltip: label default-nya otomatis pakai XAxis value (nama dokter/spesialis) */}
        <ChartTooltip cursor={false} content={<ChartTooltipContent nameKey="bookings" />} />
        <Bar dataKey="bookings" fill="var(--color-bookings)" radius={6}>
          <LabelList
            dataKey="bookings"
            position="top"
            formatter={(v: unknown) => formatNumber(Number(v))}
            className="fill-foreground"
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

export function BookingChartsSection({
  isLoading,
  bookingByDoctor,
  bookingBySpecialization,
}: {
  isLoading: boolean;
  bookingByDoctor: BookingByDoctorRow[];
  bookingBySpecialization: BookingBySpecializationRow[];
}) {
  
  const topDoctors = useMemo(() => {
    const rows = topNByBookings(
      bookingByDoctor.map((r) => ({ name: r.doctorName, bookings: r.bookings })),
      5
    );
    return toChartData(rows);
  }, [bookingByDoctor]);

  const leastDoctors = useMemo(() => {
    const rows = bottomNByBookings(
      bookingByDoctor.map((r) => ({ name: r.doctorName, bookings: r.bookings })),
      5
    );
    return toChartData(rows);
  }, [bookingByDoctor]);

  const topSpecializations = useMemo(() => {
    const rows = topNByBookings(
      bookingBySpecialization.map((r) => ({ name: r.specialization, bookings: r.bookings })),
      5
    );
    return toChartData(rows);
  }, [bookingBySpecialization]);

  const leastSpecializations = useMemo(() => {
    const rows = bottomNByBookings(
      bookingBySpecialization.map((r) => ({ name: r.specialization, bookings: r.bookings })),
      5
    );
    return toChartData(rows);
  }, [bookingBySpecialization]);

  const doctorChartConfig = {
    bookings: { label: "Booking", color: "var(--chart-1)" },
  } satisfies ChartConfig;

  const specializationChartConfig = {
    bookings: { label: "Booking", color: "var(--chart-2)" },
  } satisfies ChartConfig;

  return (
    <Tabs defaultValue="top" className="w-full">
      <div className="flex items-center justify-center gap-3 pb-2">
        <TabsList>
          <TabsTrigger value="top">Top 5</TabsTrigger>
          <TabsTrigger value="least">Least 5</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="top" className="mt-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="h-full">
            <CardHeader className="border-b">
              <CardTitle>Top 5 Booking per Dokter</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {isLoading ? (
                <div className="text-sm text-muted-foreground">Memuat…</div>
              ) : topDoctors.length === 0 ? (
                <EmptyState
                  title="Belum ada data booking"
                  description="Data akan muncul ketika endpoint booking sudah aktif."
                />
              ) : (
                <BookingBarChart chartId="top-booking-doctor" config={doctorChartConfig} data={topDoctors} />
              )}
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="border-b">
              <CardTitle>Top 5 Booking per Spesialis</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {isLoading ? (
                <div className="text-sm text-muted-foreground">Memuat…</div>
              ) : topSpecializations.length === 0 ? (
                <EmptyState
                  title="Belum ada data booking"
                  description="Data akan muncul ketika endpoint booking sudah aktif."
                />
              ) : (
                <BookingBarChart
                  chartId="top-booking-specialization"
                  config={specializationChartConfig}
                  data={topSpecializations}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="least" className="mt-0">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card className="h-full">
            <CardHeader className="border-b">
              <CardTitle>Least 5 Booking per Dokter</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {isLoading ? (
                <div className="text-sm text-muted-foreground">Memuat…</div>
              ) : leastDoctors.length === 0 ? (
                <EmptyState
                  title="Belum ada data booking"
                  description="Data akan muncul ketika endpoint booking sudah aktif."
                />
              ) : (
                <BookingBarChart chartId="least-booking-doctor" config={doctorChartConfig} data={leastDoctors} />
              )}
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="border-b">
              <CardTitle>Least 5 Booking per Spesialis</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {isLoading ? (
                <div className="text-sm text-muted-foreground">Memuat…</div>
              ) : leastSpecializations.length === 0 ? (
                <EmptyState
                  title="Belum ada data booking"
                  description="Data akan muncul ketika endpoint booking sudah aktif."
                />
              ) : (
                <BookingBarChart
                  chartId="least-booking-specialization"
                  config={specializationChartConfig}
                  data={leastSpecializations}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
}

