import { useMutation, useQuery } from "@tanstack/react-query";
import { type DashboardSummaryResponse, fetchDashboardSummary, syncDashboardData } from "../dashboard-summary";

function formatDateYYYYMMDDLocal(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function useDashboardSummary(date: Date) {
  const dateKey = formatDateYYYYMMDDLocal(date);

  return useQuery<DashboardSummaryResponse>({
    queryKey: ["dashboard-summary", dateKey],
    queryFn: () => fetchDashboardSummary({ date }),
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useSyncDashboardData() {
  return useMutation({
    mutationFn: () => syncDashboardData(),
  });
}