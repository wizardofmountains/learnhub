-- Quick SQL to get your user ID for seeding
-- Run this in Supabase SQL Editor

SELECT id, username, created_at 
FROM public.profiles 
ORDER BY created_at DESC;

