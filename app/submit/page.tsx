import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ResourceForm } from "@/components/resources/resource-form";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Submit Resource | LearnHub",
  description: "Share a learning resource with the LearnHub community",
};

export default async function SubmitPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          Share a Learning Resource
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Help others discover great learning materials by sharing a resource
          you found valuable.
        </p>
      </div>

      {/* Form */}
      <ResourceForm />
    </div>
  );
}

