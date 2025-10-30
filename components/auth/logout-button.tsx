"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "@/app/login/actions";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  className?: string;
  variant?: "default" | "ghost";
}

export function LogoutButton({ className, variant = "default" }: LogoutButtonProps) {
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    setIsPending(true);
    await signOut();
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className={cn(
        "inline-flex items-center gap-2 transition-colors",
        variant === "default"
          ? "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-zinc-900"
          : "rounded-md px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50 disabled:cursor-not-allowed dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        className
      )}
      aria-disabled={isPending}
    >
      <LogOut className="h-4 w-4" />
      {isPending ? "Signing out..." : "Sign Out"}
    </button>
  );
}

