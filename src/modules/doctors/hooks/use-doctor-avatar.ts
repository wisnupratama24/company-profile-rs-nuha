"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDoctorAvatarBase64 } from "@/services/doctors";

export function normalizeBase64ImageSrc(image: string | null | undefined): string | null {
  if (!image) return null;
  const trimmed = image.trim();
  if (!trimmed) return null;

  // API may already return a valid data URL (e.g. "data:image/jpeg;base64,...").
  if (trimmed.startsWith("data:image/")) return trimmed;

  // Otherwise assume it's a raw base64 payload.
  return `data:image/jpeg;base64,${trimmed}`;
}

export function getLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function useDoctorAvatar(idDokter: number | null, date?: Date) {
  const dateKey = date ? getLocalDateKey(date) : undefined;

  return useQuery<string | null>({
    queryKey: ["doctor-avatar", idDokter, dateKey],
    enabled: typeof idDokter === "number" && Number.isFinite(idDokter) && idDokter > 0,
    queryFn: async () => {
      if (!idDokter) return null;
      const image = await fetchDoctorAvatarBase64(idDokter, date);
      return normalizeBase64ImageSrc(image);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

