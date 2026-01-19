import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PracticingBySpecializationRow } from "../utils/constants";
import { formatNumber } from "../utils/helpers";
import { EmptyState } from "./empty-state";
import { motion } from "motion/react";
import { useState } from "react";

export function PracticingBySpecializationCard({
  isLoading,
  rows,
  motionDelay,
}: {
  isLoading: boolean;
  rows: PracticingBySpecializationRow[];
  motionDelay?: number;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const MAX_DOCTORS_TO_RENDER = 30;
  const MAX_SCROLL_ITEMS = 10;

  return (
    <motion.div
      className="lg:col-span-3"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionDelay !== undefined ? { delay: motionDelay } : undefined}
    >
      <Card className="h-full">
        <CardHeader className="border-b">
          <CardTitle>Detail Dokter Praktek per Spesialis</CardTitle>
          {/* <CardDescription>Jumlah dokter praktek hari ini dikelompokkan per spesialis.</CardDescription> */}
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Memuat…</div>
          ) : rows.length === 0 ? (
            <EmptyState title="Tidak ada dokter praktek hari ini" />
          ) : (
            <ScrollArea className="h-[260px] pr-3">
              <div className="space-y-2">
                {rows.map((row) => (
                  (() => {
                    const visibleDoctors = row.doctorList.slice(0, MAX_DOCTORS_TO_RENDER);
                    const shouldScroll = visibleDoctors.length > MAX_SCROLL_ITEMS;
                    const scrollHeight = Math.max(96, Math.min(240, MAX_SCROLL_ITEMS * 22 + 16));
                    const isOpen = openKey === row.specialization;

                    return (
                  <Collapsible
                    key={row.specialization}
                    open={isOpen}
                    onOpenChange={(open) => setOpenKey(open ? row.specialization : null)}
                    className="rounded-lg border"
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-accent/60 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label={`Toggle daftar dokter praktek untuk spesialis ${row.specialization}`}
                      >
                        <div className="min-w-0">
                          <div className="truncate font-medium">{row.specialization}</div>
                          <div className="text-xs text-muted-foreground">Dokter praktek • klik untuk expand</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="shrink-0 text-lg font-semibold">{formatNumber(row.doctors)}</div>
                          <div
                            className={`shrink-0 text-xs text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                            aria-hidden="true"
                          >
                            ▾
                          </div>
                        </div>
                      </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="overflow-hidden border-t px-3 py-2 data-[state=open]:animate-[collapsible-down_220ms_ease-out] data-[state=closed]:animate-[collapsible-up_220ms_ease-out]">
                      {row.doctorList.length === 0 ? (
                        <div className="text-sm text-muted-foreground">Tidak ada data dokter.</div>
                      ) : (
                        <>
                          {shouldScroll ? (
                            <ScrollArea className="pr-2" style={{ height: scrollHeight }}>
                              <div className="space-y-1">
                                {visibleDoctors.map((d) => (
                                  <div key={d.id} className="truncate text-sm">
                                    {d.name}
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          ) : (
                            <div className="space-y-1">
                              {visibleDoctors.map((d) => (
                                <div key={d.id} className="truncate text-sm">
                                  {d.name}
                                </div>
                              ))}
                            </div>
                          )}

                          {row.doctorList.length > MAX_DOCTORS_TO_RENDER ? (
                            <div className="pt-2 text-xs text-muted-foreground">
                              +{formatNumber(row.doctorList.length - MAX_DOCTORS_TO_RENDER)} dokter lainnya…
                            </div>
                          ) : null}
                        </>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                    );
                  })()
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

