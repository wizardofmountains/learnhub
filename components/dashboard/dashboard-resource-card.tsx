"use client";

import Link from "next/link";
import { ExternalLink, Video, FileText, BookOpen, Edit } from "lucide-react";
import type { ResourceWithOwner } from "@/lib/types";
import { cn } from "@/lib/utils";
import { DeleteDialog } from "./delete-dialog";
import { deleteResource } from "@/app/dashboard/actions";
import { useRouter } from "next/navigation";

interface DashboardResourceCardProps {
  resource: ResourceWithOwner;
}

const typeConfig = {
  video: {
    icon: Video,
    bgColor: "bg-rose-100 dark:bg-rose-900/20",
    textColor: "text-rose-700 dark:text-rose-300",
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

export function DashboardResourceCard({ resource }: DashboardResourceCardProps) {
  const router = useRouter();
  const typeInfo = typeConfig[resource.type as keyof typeof typeConfig];
  const Icon = typeInfo?.icon || FileText;

  const handleDelete = async (resourceId: string) => {
    const result = await deleteResource(resourceId);
    if (result.error) {
      alert(result.error);
    } else {
      router.refresh();
    }
  };

  // Format date
  const createdDate = new Date(resource.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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

      {/* Timestamp */}
      <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
        Created on {createdDate}
      </p>

      {/* Footer with actions and link */}
      <div className="flex items-center justify-between border-t border-zinc-200 pt-3 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          {/* Edit button (placeholder) */}
          <button
            disabled
            className="rounded-md p-2 text-zinc-400 dark:text-zinc-600"
            aria-label="Edit resource (coming soon)"
            title="Edit feature coming soon"
          >
            <Edit className="h-4 w-4" />
          </button>

          {/* Delete button with dialog */}
          <DeleteDialog
            resourceId={resource.id}
            resourceTitle={resource.title}
            onDelete={handleDelete}
          />
        </div>

        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-rose-600 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-rose-400"
          aria-label={`Open ${resource.title} in new tab`}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

