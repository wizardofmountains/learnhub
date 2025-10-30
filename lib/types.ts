import type { Database } from "./supabase/database.types";

// Table types
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Resource = Database["public"]["Tables"]["resources"]["Row"];

// Insert types for forms
export type ProfileInsert = Database["public"]["Tables"]["profiles"]["Insert"];
export type ResourceInsert =
  Database["public"]["Tables"]["resources"]["Insert"];

// Update types
export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];
export type ResourceUpdate =
  Database["public"]["Tables"]["resources"]["Update"];

// Resource type enum
export const RESOURCE_TYPES = {
  video: "video",
  article: "article",
  pdf: "pdf",
} as const;

export type ResourceType = (typeof RESOURCE_TYPES)[keyof typeof RESOURCE_TYPES];

// Extended resource type with owner info
export interface ResourceWithOwner extends Resource {
  profiles: Pick<Profile, "username">;
}

// Stats type for dashboard
export interface ResourceStats {
  total: number;
  videos: number;
  articles: number;
  pdfs: number;
}

