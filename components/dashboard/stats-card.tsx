import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  count: number;
  icon: LucideIcon;
  variant?: "blue" | "green" | "purple" | "zinc";
}

const variantConfig = {
  blue: {
    bgColor: "bg-rose-100 dark:bg-rose-900/20",
    iconColor: "text-rose-600 dark:text-rose-500",
  },
  green: {
    bgColor: "bg-green-100 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-500",
  },
  purple: {
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-500",
  },
  zinc: {
    bgColor: "bg-zinc-100 dark:bg-zinc-800",
    iconColor: "text-zinc-600 dark:text-zinc-400",
  },
} as const;

export function StatsCard({
  label,
  count,
  icon: Icon,
  variant = "zinc",
}: StatsCardProps) {
  const config = variantConfig[variant];

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
            config.bgColor
          )}
        >
          <Icon className={cn("h-6 w-6", config.iconColor)} />
        </div>
        <div>
          <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {count}
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">{label}</p>
        </div>
      </div>
    </div>
  );
}

