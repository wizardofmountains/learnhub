"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { IS_DEVELOPMENT } from "@/lib/env";

export async function deleteResource(resourceId: string) {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unauthorized" };
  }

  // Delete resource (RLS ensures user can only delete their own)
  const { error } = await supabase
    .from("resources")
    .delete()
    .eq("id", resourceId)
    .eq("owner_id", user.id);

  if (error) {
    if (IS_DEVELOPMENT) {
      console.error("Error deleting resource:", error);
    }
    return { error: "Failed to delete resource" };
  }

  // Revalidate dashboard page
  revalidatePath("/dashboard");

  return { success: true };
}

