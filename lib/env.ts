/**
 * Environment Variable Validation
 *
 * Validates required environment variables at runtime to prevent
 * silent failures in production. Validation is skipped during build
 * to allow Vercel/CI builds to proceed.
 */

const IS_BUILD = process.env.NEXT_PHASE === "phase-production-build";

function getEnvVar(key: string, isPublic: boolean = false): string {
  const value = process.env[key];

  // During build, use placeholder values to allow build to succeed
  // Runtime validation will still catch missing vars in production
  if (!value) {
    if (IS_BUILD) {
      console.warn(
        `⚠️  Environment variable ${key} not set during build. Make sure it's configured in production.`
      );
      return ""; // Return empty string during build
    }

    throw new Error(
      `Missing required environment variable: ${key}\n` +
        `Please add it to your ${isPublic ? "Vercel environment variables" : ".env.local file"}`
    );
  }

  return value;
}

// Supabase Configuration
export const SUPABASE_URL = getEnvVar("NEXT_PUBLIC_SUPABASE_URL", true);
export const SUPABASE_ANON_KEY = getEnvVar(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  true
);

// Site Configuration
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Node Environment
export const NODE_ENV = process.env.NODE_ENV || "development";
export const IS_PRODUCTION = NODE_ENV === "production";
export const IS_DEVELOPMENT = NODE_ENV === "development";

