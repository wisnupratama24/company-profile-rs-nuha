"use client";

import { motion } from "motion/react";
import { CalendarIcon, Clock, ArrowRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPoliLabel } from "../utils/helpers";

/**
 * Kartu ringkasan Poli.
 *
 * Kegunaan:
 * - Ditampilkan pada mode "Semua Poli" untuk memberi ringkasan cepat per poli:
 *   jumlah dokter dan total slot jadwal yang tersedia.
 * - Saat diklik, biasanya akan memicu pemilihan poli (untuk memfilter daftar dokter).
 */
interface PoliCardProps {
  /** Nama poli yang ditampilkan di judul kartu. */
  name: string;
  /** Jumlah dokter pada poli tersebut (untuk info ringkas). */
  doctors: number;
  /** Total slot yang tersedia pada poli tersebut (hasil agregasi dari jadwal dokter). */
  availableSlots: number;
  /** Index urutan kartu (dipakai untuk delay animasi agar muncul bertahap). */
  index: number;
  /** Handler saat kartu diklik (umumnya: set selected poli). */
  onClick: () => void;
}

export function PoliCard({
  name,
  doctors,
  availableSlots,
  index,
  onClick,
}: PoliCardProps) {
  return (
    <motion.div
      key={name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // Delay animasi berdasarkan index agar list kartu terlihat lebih halus (staggered).
      transition={{ delay: index * 0.08 }}
      className="border rounded-lg p-5 bg-white hover:border-primary/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{formatPoliLabel(name)}</h3>
          <p className="text-sm text-muted-foreground">
            {doctors} dokter tersedia
          </p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      </div>
      <Separator className="mb-3" />
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <CalendarIcon className="h-4 w-4" />
          <span>
            {doctors} dokter
          </span>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{availableSlots} slot tersedia</span>
        </div>
      </div>
    </motion.div>
  );
}
