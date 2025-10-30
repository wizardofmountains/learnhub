"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createResourceSchema } from "@/lib/validations/resource";

// Error result type
export interface ActionResult {
  error?: string;
  success?: string;
}

export async function createResource(
  formData: FormData
): Promise<ActionResult | void> {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      error: "You must be signed in to create a resource",
    };
  }

  // Validate form data
  const validationResult = createResourceSchema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description") || undefined,
    type: formData.get("type"),
  });

  if (!validationResult.success) {
    return {
      error: validationResult.error.errors[0].message,
    };
  }

  const { title, url, description, type } = validationResult.data;

  // Insert resource
  const { error } = await supabase.from("resources").insert({
    title,
    url,
    description: description || null,
    type,
    owner_id: user.id,
  });

  if (error) {
    console.error("Error creating resource:", error);
    return {
      error: "Failed to create resource. Please try again.",
    };
  }

  // Revalidate cache
  revalidatePath("/dashboard", "page");
  revalidatePath("/resources", "page");

  // Redirect to dashboard
  redirect("/dashboard");
}

