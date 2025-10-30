import type { Metadata } from "next";
import Link from "next/link";
import { Plus, Video, FileText, BookOpen, Layers } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { StatsCard } from "@/components/dashboard/stats-card";
import { DashboardResourceCard } from "@/components/dashboard/dashboard-resource-card";
import type { ResourceWithOwner } from "@/lib/types";

export const metadata: Metadata = {
  title: "My Dashboard | LearnHub",
  description: "Manage your submitted learning resources and view your stats.",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user's resources
  const { data: resources } = await supabase
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
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  const typedResources = (resources || []) as ResourceWithOwner[];

  // Calculate stats
  const total = typedResources.length;
  const videos = typedResources.filter((r) => r.type === "video").length;
  const articles = typedResources.filter((r) => r.type === "article").length;
  const pdfs = typedResources.filter((r) => r.type === "pdf").length;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            My Dashboard
          </h1>
          <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
            Manage your submitted learning resources
          </p>
        </div>
        <Link
          href="/submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Create Resource
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard label="Total Resources" count={total} icon={Layers} />
        <StatsCard
          label="Videos"
          count={videos}
          icon={Video}
          variant="blue"
        />
        <StatsCard
          label="Articles"
          count={articles}
          icon={FileText}
          variant="green"
        />
        <StatsCard label="PDFs" count={pdfs} icon={BookOpen} variant="purple" />
      </div>

      {/* Resources Grid */}
      {typedResources.length > 0 ? (
        <div>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Your Resources
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {typedResources.map((resource) => (
              <DashboardResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
          <Layers className="mb-4 h-12 w-12 text-zinc-400 dark:text-zinc-600" />
          <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            No resources yet
          </h3>
          <p className="mb-6 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
            You haven&apos;t submitted any resources yet. Share your first
            learning resource!
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Create Resource
          </Link>
        </div>
      )}
    </div>
  );
}

