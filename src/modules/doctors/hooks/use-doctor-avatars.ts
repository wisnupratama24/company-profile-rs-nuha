"use client";

import { useQueries } from "@tanstack/react-query";
import { fetchDoctorAvatarBase64 } from "@/services/doctors";
import { DoctorScheduleData } from "../utils/constants";
import { parseDateOnlyLocal } from "../utils/helpers";
import { getLocalDateKey, normalizeBase64ImageSrc } from "./use-doctor-avatar";

export function useDoctorAvatars(
  doctors: DoctorScheduleData[],
  selectedDays: Record<string, number>
) {
  const results = useQueries({
    queries: doctors.map((doctor) => {
      const idStr = doctor.doctor.id;
      const idNum = Number(idStr);

      const sortedSchedule = [...doctor.schedule].sort(
        (a, b) => +parseDateOnlyLocal(a.date) - +parseDateOnlyLocal(b.date)
      );

      const selectedDayIndex = selectedDays[idStr] ?? 0;
      const selectedDayData = sortedSchedule[selectedDayIndex];
      const avatarDate = selectedDayData ? parseDateOnlyLocal(selectedDayData.date) : new Date();
      const dateKey = getLocalDateKey(avatarDate);

      const enabled = Number.isFinite(idNum) && idNum > 0;

      return {
        queryKey: ["doctor-avatar", idNum, dateKey],
        enabled,
        queryFn: async () => {
          if (!enabled) return null;
          const image = await fetchDoctorAvatarBase64(idNum, avatarDate);
          return normalizeBase64ImageSrc(image);
        },
        staleTime: 10 * 60 * 1000, // 10 minutes
      };
    }),
  });

  const avatarSrcByDoctorId: Record<string, string | null | undefined> = {};
  const isLoadingByDoctorId: Record<string, boolean> = {};

  doctors.forEach((doctor, idx) => {
    const idStr = doctor.doctor.id;
    avatarSrcByDoctorId[idStr] = results[idx]?.data ?? null;
    isLoadingByDoctorId[idStr] = results[idx]?.isLoading ?? false;
  });

  return { avatarSrcByDoctorId, isLoadingByDoctorId };
}

