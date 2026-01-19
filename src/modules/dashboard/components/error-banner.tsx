import { AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function ErrorBanner({
  message,
  onRetry,
  motionDelay,
}: {
  message: string;
  onRetry: () => void;
  motionDelay?: number;
}) {
  return (
    <motion.div
      className="mb-6 rounded-xl border bg-destructive/5 p-4"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionDelay !== undefined ? { delay: motionDelay } : undefined}
    >
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 text-destructive" />
        <div className="flex-1">
          <div className="font-semibold">Gagal memuat data dashboard</div>
          <div className="text-sm text-muted-foreground">{message}</div>
          <button
            className="mt-3 inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-muted"
            onClick={onRetry}
            type="button"
          >
            Coba lagi
          </button>
        </div>
      </div>
    </motion.div>
  );
}

