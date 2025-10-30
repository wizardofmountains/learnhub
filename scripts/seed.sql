-- LearnHub Seed Data
-- This script creates 5 sample learning resources
--
-- IMPORTANT: Before running this script, you need to:
-- 1. Sign up for an account at http://localhost:3000/login
-- 2. Replace <YOUR_USER_ID> below with your actual user UUID from the profiles table
--
-- To get your user ID after signing up:
-- SELECT id, username FROM public.profiles;

-- Seed Resources
-- Replace <YOUR_USER_ID> with your actual UUID

INSERT INTO public.resources (title, description, url, type, owner_id, created_at)
VALUES
  (
    'Next.js 15 Complete Course for Beginners',
    'Comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and deployment strategies.',
    'https://www.youtube.com/watch?v=Sklc_fQBmcs',
    'video',
    '<YOUR_USER_ID>'::uuid,
    NOW() - INTERVAL '5 days'
  ),
  (
    'TypeScript Deep Dive - Full Course',
    'Master TypeScript from basics to advanced patterns including generics, utility types, and real-world project setup. Perfect for developers looking to level up their skills.',
    'https://www.youtube.com/watch?v=BwuLxPH8IDs',
    'video',
    '<YOUR_USER_ID>'::uuid,
    NOW() - INTERVAL '4 days'
  ),
  (
    'React 19: What\'s New with Server Components',
    'Deep dive into React 19 features including Server Components, Actions, and the new use() hook. Learn how to build faster, more efficient applications.',
    'https://react.dev/blog/2024/04/25/react-19',
    'article',
    '<YOUR_USER_ID>'::uuid,
    NOW() - INTERVAL '3 days'
  ),
  (
    'Building Scalable APIs with Supabase',
    'Learn best practices for designing and implementing robust APIs with Supabase, including Row Level Security, real-time subscriptions, and performance optimization.',
    'https://supabase.com/docs/guides/api',
    'article',
    '<YOUR_USER_ID>'::uuid,
    NOW() - INTERVAL '2 days'
  ),
  (
    'Web Vitals Optimization Guide',
    'Complete guide to optimizing Core Web Vitals for better user experience and SEO rankings. Covers performance metrics, measurement tools, and optimization techniques.',
    'https://web.dev/vitals/',
    'article',
    '<YOUR_USER_ID>'::uuid,
    NOW() - INTERVAL '1 day'
  )
ON CONFLICT (id) DO NOTHING;

-- Verify the seed data was inserted
-- SELECT id, title, type, created_at FROM public.resources ORDER BY created_at DESC;

