-- Migration: Create Resources Table
-- Description: Creates the resources table with RLS policies, constraints, and indexes
-- Dependencies: profiles table must exist
-- Status: ✅ Already applied in production (documented here for reference)

-- ============================================================================
-- TABLE: resources
-- ============================================================================
-- Learning resources shared by users

CREATE TABLE IF NOT EXISTS public.resources (
  -- Primary key
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Foreign key to profiles
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Resource details
  title TEXT NOT NULL CHECK (char_length(title) >= 3),
  description TEXT CHECK (char_length(description) <= 500),
  url TEXT NOT NULL CHECK (url ~* '^https?://'),
  type TEXT NOT NULL CHECK (type = ANY (ARRAY['video'::text, 'article'::text, 'pdf'::text])),
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================
-- Performance indexes for common queries

-- Index for filtering by owner
CREATE INDEX IF NOT EXISTS idx_resources_owner_id 
ON public.resources(owner_id);

-- Index for filtering by type
CREATE INDEX IF NOT EXISTS idx_resources_type 
ON public.resources(type);

-- Index for sorting by creation date (descending)
CREATE INDEX IF NOT EXISTS idx_resources_created_at 
ON public.resources(created_at DESC);

-- Full-text search index on title and description
CREATE INDEX IF NOT EXISTS idx_resources_search 
ON public.resources 
USING GIN (to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on the resources table
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Policy 1: Everyone can view all resources (public read)
CREATE POLICY "Resources are viewable by everyone"
ON public.resources
FOR SELECT
TO public
USING (true);

-- Policy 2: Only authenticated users can create resources (must be owner)
CREATE POLICY "Authenticated users can create resources"
ON public.resources
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = owner_id);

-- Policy 3: Users can only delete their own resources
CREATE POLICY "Users can delete their own resources"
ON public.resources
FOR DELETE
TO public
USING (auth.uid() = owner_id);

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Verify table structure
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_schema = 'public' AND table_name = 'resources'
-- ORDER BY ordinal_position;

-- Verify RLS policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd
-- FROM pg_policies
-- WHERE tablename = 'resources'
-- ORDER BY policyname;

-- Verify indexes
-- SELECT indexname, indexdef
-- FROM pg_indexes
-- WHERE tablename = 'resources'
-- ORDER BY indexname;

-- Count resources
-- SELECT COUNT(*) FROM public.resources;

