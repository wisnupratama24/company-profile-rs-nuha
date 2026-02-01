"use client";

import { motion } from "motion/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Filter, ArrowRight } from "lucide-react";

/**
 * Item filter generik yang ditampilkan di sidebar (misalnya: spesialis atau dokter).
 * `subtitle` opsional untuk teks tambahan (misalnya spesialisasi dokter).
 */
interface FilterItem {
  id: string;
  label: string;
  subtitle?: string;
  // Boleh membawa properti tambahan (contoh: `doctorData`) untuk kebutuhan `renderItem` custom.
  [key: string]: unknown;
}

/**
 * Komponen panel filter yang bisa di-collapse.
 *
 * Kegunaan:
 * - Dipakai ulang untuk panel "Spesialis" dan "Dokter" di sidebar.
 * - Menampilkan tombol "Semua ..." (opsional), daftar item, state loading, dan highlight item terpilih.
 * - Mendukung render item custom via `renderItem` bila UI list perlu bentuk khusus.
 */
interface FilterSectionProps {
  /** Judul panel (mis. "Spesialis", "Dokter"). */
  title: string;
  /** Ikon opsional di header panel. Kalau tidak diisi, default pakai ikon Filter. */
  icon?: React.ReactNode;
  /** Daftar item filter yang akan ditampilkan. */
  items: FilterItem[];
  /** ID item yang sedang terpilih (atau `null` bila memilih "Semua"). */
  selectedId: string | null;
  /** Handler saat user memilih item / memilih "Semua" (kirim `null`). */
  onSelect: (id: string | null) => void;
  /** Label tombol "Semua" (mis. "Semua Spesialis", "Semua Dokter"). */
  allLabel: string;
  /** State buka/tutup panel. */
  isOpen: boolean;
  /** Handler untuk mengubah state buka/tutup panel. */
  onOpenChange: (open: boolean) => void;
  /** Angka count opsional yang ditampilkan di judul (mis. jumlah hasil). */
  count?: number;
  /** Subjudul opsional di bawah judul (mis. "Difilter berdasarkan pencarian"). */
  subtitle?: string;
  /** Tampilkan tombol "Semua ..." atau tidak. Default: true. */
  showAllButton?: boolean;
  /**
   * Menentukan apakah tombol "Semua" sedang aktif.
   * Dipakai jika kondisi "aktif" tidak bisa ditentukan hanya dari `selectedId === null`.
   */
  isAllActive?: boolean;
  /** Render item custom (jika ingin bentuk item berbeda dari default). */
  renderItem?: (item: FilterItem, isSelected: boolean) => React.ReactNode;
  /** Menampilkan skeleton/loading state di list. */
  isLoading?: boolean;
}

export function FilterSection({
  title,
  icon,
  items,
  selectedId,
  onSelect,
  allLabel,
  isOpen,
  onOpenChange,
  count,
  subtitle,
  showAllButton = true,
  isAllActive,
  renderItem,
  isLoading = false,
}: FilterSectionProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <div className="flex flex-col border-2 rounded-lg overflow-hidden bg-white">
        {/* Header panel: judul + count + subtitle + ikon expand/collapse */}
        <CollapsibleTrigger className="px-4 py-3 border-b hover:bg-accent/50 transition-colors">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                {icon || <Filter className="h-4 w-4" />}
                <h2 className="text-sm font-semibold">
                  {title} {count !== undefined && `(${count})`}
                </h2>
              </div>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
              )}
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-400px)]">
            {isLoading ? (
              // State loading: dipakai saat data item masih diambil dari API.
              <div className="p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-xs text-muted-foreground">Memuat...</p>
                </div>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {/* Tombol "Semua": mengirim `null` ke parent untuk reset pilihan */}
                {showAllButton && (
                  <button
                    onClick={() => onSelect(null)}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                      isAllActive !== undefined
                        ? isAllActive
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent text-foreground"
                        : selectedId === null
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent text-foreground"
                    )}
                  >
                    {allLabel}
                  </button>
                )}
                {items.length === 0 ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Tidak ada item ditemukan.
                  </div>
                ) : (
                  items.map((item, index) => {
                    const isSelected = selectedId === item.id;
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        // Animasi muncul bertahap (stagger) agar list terasa lebih halus.
                        transition={{ delay: 0.3 + index * 0.02 }}
                      >
                        {renderItem ? (
                          // Kalau ada `renderItem`, serahkan tampilan item ke parent.
                          renderItem(item, isSelected)
                        ) : (
                          // Tampilan default item: label + subtitle, dan ikon panah saat item terpilih.
                          <button
                            onClick={() => onSelect(item.id)}
                            className={cn(
                              "w-full text-left p-3 rounded-md transition-all duration-200",
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-accent text-foreground"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">
                                  {item.label}
                                </div>
                                {item.subtitle && (
                                  <div className="text-xs opacity-80 truncate">
                                    {item.subtitle}
                                  </div>
                                )}
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="flex-shrink-0"
                                >
                                  <ArrowRight className="h-4 w-4" />
                                </motion.div>
                              )}
                            </div>
                          </button>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

