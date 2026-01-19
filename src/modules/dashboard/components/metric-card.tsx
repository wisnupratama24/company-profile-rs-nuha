import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";
import { motion } from "motion/react";

export function MetricCard({
  title,
  description,
  icon,
  isLoading,
  value,
  footer,
  className,
  cardClassName,
  motionDelay,
}: {
  title: ReactNode;
  description: ReactNode;
  icon?: ReactNode;
  isLoading: boolean;
  value: ReactNode;
  footer?: ReactNode;
  /** Class untuk wrapper (grid item), misalnya `lg:col-span-2`. */
  className?: string;
  /** Class untuk Card (container UI). */
  cardClassName?: string;
  /** Delay animasi (detik). */
  motionDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionDelay !== undefined ? { delay: motionDelay } : undefined}
    >
      <Card className={cardClassName ? `h-full ${cardClassName}` : "h-full"}>
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            {icon ? icon : null}
            {title}
          </CardTitle>
          {/* <CardDescription>{description}</CardDescription> */}
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="text-sm text-muted-foreground">Memuat…</div>
          ) : (
            <div className="space-y-1">
              <div>{value}</div>
              {footer ? <div>{footer}</div> : null}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

