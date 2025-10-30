import { z } from "zod";
import { RESOURCE_TYPES } from "@/lib/types";

// Title validation schema
export const titleSchema = z
  .string()
  .min(1, "Title is required")
  .min(3, "Title must be at least 3 characters");

// URL validation schema
export const urlSchema = z
  .string()
  .min(1, "URL is required")
  .url("Please enter a valid URL")
  .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
    message: "URL must start with http:// or https://",
  });

// Description validation schema
export const descriptionSchema = z
  .string()
  .max(500, "Description must be 500 characters or less")
  .optional();

// Type validation schema
export const typeSchema = z.enum(
  [RESOURCE_TYPES.video, RESOURCE_TYPES.article, RESOURCE_TYPES.pdf],
  {
    errorMap: () => ({ message: "Please select a valid resource type" }),
  }
);

// Complete resource creation schema
export const createResourceSchema = z.object({
  title: titleSchema,
  url: urlSchema,
  description: descriptionSchema,
  type: typeSchema,
});

// Export types
export type CreateResourceInput = z.infer<typeof createResourceSchema>;

