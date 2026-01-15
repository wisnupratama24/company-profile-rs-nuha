"use client";

import { motion } from "motion/react";
import { Search, X, CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { id } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { MAX_DATE_RANGE_DAYS } from "../utils/constants";

interface SearchSectionProps {
  searchDoctor: string;
  dateRange: DateRange | undefined;
  onSearchDoctorChange: (value: string) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onClearAll: () => void;
}

/**
 * Panel pencarian untuk modul Jadwal Dokter.
 *
 * Kegunaan:
 * - Input pencarian nama dokter.
 * - Pemilihan rentang tanggal (awal-akhir) dengan batas maksimal \(MAX_DATE_RANGE_DAYS\) hari.
 * - Tombol "hapus" untuk mereset filter pencarian & tanggal.
 */
export function SearchSection({
  searchDoctor,
  dateRange,
  onSearchDoctorChange,
  onDateRangeChange,
  onClearAll,
}: SearchSectionProps) {
  const hasActiveSearch = !!(searchDoctor || dateRange?.from);

  // Menghitung batas maksimal tanggal akhir (maks. \(MAX_DATE_RANGE_DAYS\) hari dari tanggal awal).
  const maxEndDate = dateRange?.from 
    ? addDays(dateRange.from, MAX_DATE_RANGE_DAYS - 1) 
    : undefined;

  const handleStartDateChange = (date: Date | undefined) => {
    if (!date) {
      onDateRangeChange(undefined);
      return;
    }
    
    // Set tanggal awal. Tanggal akhir dipertahankan kalau masih valid; kalau tidak, disamakan ke tanggal awal.
    const currentEnd = dateRange?.to;
    let newEnd = date; // Default end to start date
    
    if (currentEnd && currentEnd >= date) {
      const maxAllowed = addDays(date, MAX_DATE_RANGE_DAYS - 1);
      newEnd = currentEnd > maxAllowed ? maxAllowed : currentEnd;
    }
    
    onDateRangeChange({ from: date, to: newEnd });
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (!dateRange?.from) return;
    
    if (!date) {
      // Kalau tanggal akhir dihapus, default-nya diset sama dengan tanggal awal.
      onDateRangeChange({ from: dateRange.from, to: dateRange.from });
      return;
    }
    
    // Validasi tanggal akhir agar tetap berada di rentang yang diizinkan.
    const maxAllowed = addDays(dateRange.from, MAX_DATE_RANGE_DAYS - 1);
    const validDate = date > maxAllowed ? maxAllowed : date;
    
    onDateRangeChange({ from: dateRange.from, to: validDate });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="border-2 rounded-lg p-4 bg-white"
    >
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold">Cari</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pencarian berdasarkan nama dokter */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Nama Dokter
          </label>
          <div className="relative">
            <Input
              type="text"
              placeholder="contoh: dr. Ari Mulyani"
              value={searchDoctor}
              onChange={(e) => onSearchDoctorChange(e.target.value)}
              className="pr-8"
            />
            {searchDoctor && (
              <button
                onClick={() => onSearchDoctorChange("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tanggal awal (wajib dipilih dulu sebelum tanggal akhir bisa dipilih) */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Tanggal Awal
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  <span>{format(dateRange.from, "d MMM yyyy", { locale: id })}</span>
                ) : (
                  <span>Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange?.from}
                onSelect={handleStartDateChange}
                locale={id}
                initialFocus
              />
              {dateRange?.from && (
                <div className="p-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDateRangeChange(undefined)}
                    className="w-full text-xs"
                  >
                    <X className="mr-2 h-3 w-3" />
                    Hapus tanggal
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>

        {/* Tanggal akhir (dibatasi maks. \(MAX_DATE_RANGE_DAYS\) hari dari tanggal awal) */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Tanggal Akhir {dateRange?.from && <span className="text-muted-foreground/60">(maks. {MAX_DATE_RANGE_DAYS} hari)</span>}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange?.from && "text-muted-foreground cursor-not-allowed opacity-50"
                )}
                disabled={!dateRange?.from}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.to ? (
                  <span>{format(dateRange.to, "d MMM yyyy", { locale: id })}</span>
                ) : dateRange?.from ? (
                  <span>{format(dateRange.from, "d MMM yyyy", { locale: id })}</span>
                ) : (
                  <span>Pilih tanggal awal dulu</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange?.to || dateRange?.from}
                onSelect={handleEndDateChange}
                locale={id}
                disabled={(date) => {
                  if (!dateRange?.from) return true;
                  if (date < dateRange.from) return true;
                  if (maxEndDate && date > maxEndDate) return true;
                  return false;
                }}
                initialFocus
              />
              {dateRange?.from && (
                <div className="p-3 border-t">
                  <p className="text-xs text-muted-foreground text-center mb-2">
                    Rentang: {format(dateRange.from, "d MMM", { locale: id })} - {maxEndDate ? format(maxEndDate, "d MMM yyyy", { locale: id }) : ""}
                  </p>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Tombol reset: hapus semua input pencarian & tanggal */}
      {hasActiveSearch && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClearAll}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Hapus semua pencarian
          </button>
        </div>
      )}
    </motion.div>
  );
}
