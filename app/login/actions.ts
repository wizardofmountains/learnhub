"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  signInSchema,
  signUpSchemaWithRefinement,
} from "@/lib/validations/auth";

// Error result type
export interface ActionResult {
  error?: string;
  success?: string;
}

export async function signIn(
  formData: FormData
): Promise<ActionResult | void> {
  const supabase = await createClient();

  // Validate form data
  const validationResult = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      error: validationResult.error.errors[0].message,
    };
  }

  const { email, password } = validationResult.data;

  // Sign in user
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  // Revalidate cache and redirect
  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signUp(
  formData: FormData
): Promise<ActionResult | void> {
  const supabase = await createClient();

  // Validate form data
  const validationResult = signUpSchemaWithRefinement.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validationResult.success) {
    return {
      error: validationResult.error.errors[0].message,
    };
  }

  const { email, password } = validationResult.data;

  // Sign up user
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/auth/confirm?next=/dashboard`,
    },
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  // Revalidate cache
  revalidatePath("/", "layout");
  
  // Don't redirect - let user know to check email
  return {
    success: "Please check your email to confirm your account",
  };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();

  // Sign out user
  await supabase.auth.signOut();

  // Revalidate cache and redirect
  revalidatePath("/", "layout");
  redirect("/login");
}

