import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AuthForm } from "@/components/auth/auth-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | LearnHub",
  description: "Sign in to LearnHub to share and discover learning resources",
};

export default async function LoginPage() {
  const supabase = await createClient();

  // Check if user is already authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to dashboard if already logged in
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Welcome to LearnHub
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Share and discover amazing learning resources
          </p>
        </div>

        {/* Auth Form */}
        <AuthForm defaultMode="signin" />
      </div>
    </div>
  );
}

