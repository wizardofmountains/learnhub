import Link from "next/link";
import { FileQuestion, SearchX, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  variant: "no-resources" | "no-results" | "custom";
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  variant,
  title,
  message,
  actionLabel,
  actionHref,
  icon,
}: EmptyStateProps) {
  // Default configurations for each variant
  const configs = {
    "no-resources": {
      icon: (
        <FileQuestion className="h-12 w-12 text-zinc-400 dark:text-zinc-600" />
      ),
      title: "No resources yet",
      message: "Be the first to share a learning resource!",
      actionLabel: "Share Resource",
      actionHref: "/submit",
    },
    "no-results": {
      icon: (
        <SearchX className="h-12 w-12 text-zinc-400 dark:text-zinc-600" />
      ),
      title: "No resources match your search",
      message: "Try adjusting your search terms or filters",
      actionLabel: "Clear Search",
      actionHref: "/resources",
    },
    custom: {
      icon: icon || (
        <FileQuestion className="h-12 w-12 text-zinc-400 dark:text-zinc-600" />
      ),
      title: title || "Nothing here",
      message: message || "There's nothing to display",
      actionLabel,
      actionHref,
    },
  };

  const config = configs[variant];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {/* Icon */}
      <div className="mb-4">{config.icon}</div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {config.title}
      </h3>

      {/* Message */}
      <p className="mb-6 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
        {config.message}
      </p>

      {/* Action Button */}
      {config.actionLabel && config.actionHref && (
        <Link
          href={config.actionHref}
          className={cn(
            "inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white",
            "transition-colors hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
          )}
        >
          <Plus className="h-4 w-4" />
          {config.actionLabel}
        </Link>
      )}
    </div>
  );
}

