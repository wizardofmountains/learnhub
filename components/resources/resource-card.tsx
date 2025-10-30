import Link from "next/link";
import { ExternalLink, Video, FileText, BookOpen } from "lucide-react";
import type { ResourceWithOwner } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: ResourceWithOwner;
}

const typeConfig = {
  video: {
    icon: Video,
    bgColor: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-700 dark:text-blue-300",
    label: "Video",
  },
  article: {
    icon: FileText,
    bgColor: "bg-green-100 dark:bg-green-900/20",
    textColor: "text-green-700 dark:text-green-300",
    label: "Article",
  },
  pdf: {
    icon: BookOpen,
    bgColor: "bg-purple-100 dark:bg-purple-900/20",
    textColor: "text-purple-700 dark:text-purple-300",
    label: "PDF",
  },
} as const;

export function ResourceCard({ resource }: ResourceCardProps) {
  const typeInfo = typeConfig[resource.type as keyof typeof typeConfig];
  const Icon = typeInfo?.icon || FileText;

  return (
    <article
      className={cn(
        "group min-h-32 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm",
        "transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
      )}
    >
      {/* Header with title and type badge */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <Link
          href={`/resource/${resource.id}`}
          className="flex-1 hover:underline"
        >
          <h3 className="line-clamp-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {resource.title}
          </h3>
        </Link>
        <div
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
            typeInfo?.bgColor || "bg-zinc-100 dark:bg-zinc-800",
            typeInfo?.textColor || "text-zinc-700 dark:text-zinc-300"
          )}
        >
          <Icon className="h-3 w-3" />
          <span>{typeInfo?.label || resource.type}</span>
        </div>
      </div>

      {/* Description */}
      {resource.description && (
        <p className="mb-4 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
          {resource.description}
        </p>
      )}

      {/* Footer with owner and link */}
      <div className="flex items-center justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          Submitted by{" "}
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            @{resource.profiles.username}
          </span>
        </span>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-blue-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-blue-400"
          aria-label={`Open ${resource.title} in new tab`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

