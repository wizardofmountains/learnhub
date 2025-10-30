"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff } from "lucide-react";
import { signIn, signUp, type ActionResult } from "@/app/login/actions";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  defaultMode?: "signin" | "signup";
}

export function AuthForm({ defaultMode = "signin" }: AuthFormProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<ActionResult | null>(null);

  async function handleAction(formData: FormData) {
    setMessage(null);
    let result: ActionResult | void;

    if (mode === "signin") {
      result = await signIn(formData);
    } else {
      result = await signUp(formData);
    }

    if (result) {
      setMessage(result);
    }
  }

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setMessage(null);
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Toggle buttons */}
      <div className="flex gap-2 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            mode === "signin"
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          )}
          aria-pressed={mode === "signin"}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
            mode === "signup"
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-50"
              : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          )}
          aria-pressed={mode === "signup"}
        >
          Sign Up
        </button>
      </div>

      {/* Error/Success Message */}
      {message?.error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/20 dark:text-red-200"
          role="alert"
        >
          {message.error}
        </div>
      )}

      {message?.success && (
        <div
          className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-800 dark:bg-green-950/20 dark:text-green-200"
          role="alert"
        >
          {message.success}
        </div>
      )}

      {/* Form */}
      <form action={handleAction} className="space-y-4">
        {/* Email field */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm placeholder-zinc-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-rose-500"
            placeholder="you@example.com"
          />
        </div>

        {/* Password field */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 pr-10 text-sm placeholder-zinc-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-rose-500"
              placeholder={mode === "signin" ? "Enter your password" : "Min. 6 characters"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm password field (signup only) */}
        {mode === "signup" && (
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="w-full rounded-lg border border-zinc-300 px-3 py-2 pr-10 text-sm placeholder-zinc-400 focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-rose-500"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Submit button */}
        <SubmitButton mode={mode} />
      </form>

      {/* Help text */}
      <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
        {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
        <button
          type="button"
          onClick={toggleMode}
          className="font-medium text-rose-600 hover:text-rose-700 dark:text-rose-500 dark:hover:text-rose-400"
        >
          {mode === "signin" ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

function SubmitButton({ mode }: { mode: "signin" | "signup" }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full rounded-lg bg-rose-500 px-4 py-2 text-sm font-medium text-white transition-colors",
        "hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-zinc-900"
      )}
      aria-disabled={pending}
    >
      {pending ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
    </button>
  );
}

