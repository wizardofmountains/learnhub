import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ResourceCard } from "@/components/resources/resource-card";
import { EmptyState } from "@/components/resources/empty-state";
import type { ResourceWithOwner } from "@/lib/types";
import { SearchFilter } from "./search-filter";
import { IS_DEVELOPMENT } from "@/lib/env";

export const metadata: Metadata = {
  title: "Browse Learning Resources | LearnHub",
  description:
    "Discover curated learning resources including videos, articles, and PDFs shared by the community.",
};

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; type?: string }>;
}) {
  const supabase = await createClient();

  // Unwrap searchParams Promise
  const params = await searchParams;

  // Build the query
  let query = supabase
    .from("resources")
    .select(
      `
      id,
      title,
      description,
      url,
      type,
      created_at,
      owner_id,
      profiles:owner_id (
        username
      )
    `
    )
    .order("created_at", { ascending: false });

  // Apply search filter if query exists
  if (params.query) {
    query = query.or(
      `title.ilike.%${params.query}%,description.ilike.%${params.query}%`
    );
  }

  // Apply type filter if specified
  if (params.type && params.type !== "all") {
    query = query.eq("type", params.type);
  }

  // Fetch resources
  const { data: resources, error } = await query;

  if (error) {
    if (IS_DEVELOPMENT) {
      console.error("Error fetching resources:", error);
    }
  }

  const typedResources = (resources || []) as ResourceWithOwner[];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Browse Learning Resources
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Discover curated learning resources shared by the community
        </p>
      </div>

      {/* Search and Filter Bar */}
      <SearchFilter />

      {/* Resources Grid */}
      {typedResources.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {typedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : params.query || params.type ? (
        <EmptyState variant="no-results" />
      ) : (
        <EmptyState variant="no-resources" />
      )}
    </div>
  );
}

