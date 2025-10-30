"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { createResource, type ActionResult } from "@/app/submit/actions";
import { cn } from "@/lib/utils";
import { RESOURCE_TYPES } from "@/lib/types";

export function ResourceForm() {
  const [message, setMessage] = useState<ActionResult | null>(null);
  const [descriptionLength, setDescriptionLength] = useState(0);

  async function handleAction(formData: FormData) {
    setMessage(null);
    const result = await createResource(formData);

    if (result) {
      setMessage(result);
    }
  }

  return (
    <div className="w-full max-w-2xl space-y-6">
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
      <form action={handleAction} className="space-y-6">
        {/* Title field */}
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            minLength={3}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-blue-500"
            placeholder="e.g., Complete React Course 2025"
          />
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Minimum 3 characters
          </p>
        </div>

        {/* URL field */}
        <div>
          <label
            htmlFor="url"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            URL <span className="text-red-500">*</span>
          </label>
          <input
            id="url"
            name="url"
            type="url"
            required
            pattern="https?://.+"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-blue-500"
            placeholder="https://example.com/resource"
          />
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            Must start with http:// or https://
          </p>
        </div>

        {/* Type field */}
        <div>
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Resource Type <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            name="type"
            required
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-blue-500"
          >
            <option value="">Select a type...</option>
            <option value={RESOURCE_TYPES.video}>Video</option>
            <option value={RESOURCE_TYPES.article}>Article</option>
            <option value={RESOURCE_TYPES.pdf}>PDF</option>
          </select>
        </div>

        {/* Description field */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
          >
            Description{" "}
            <span className="font-normal text-zinc-500 dark:text-zinc-400">
              (Optional)
            </span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={500}
            onChange={(e) => setDescriptionLength(e.target.value.length)}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm placeholder-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-blue-500"
            placeholder="Brief description of what learners will gain from this resource..."
          />
          <div className="mt-1 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Maximum 500 characters</span>
            <span
              className={cn(
                descriptionLength > 500 && "text-red-500 dark:text-red-400"
              )}
            >
              {descriptionLength}/500
            </span>
          </div>
        </div>

        {/* Submit button */}
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors",
        "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-zinc-900"
      )}
      aria-disabled={pending}
    >
      {pending ? "Creating resource..." : "Create Resource"}
    </button>
  );
}

