-- LearnHub Seed Data with Demo User
-- This script creates a demo user and 5 sample learning resources
-- Run this script in the Supabase SQL Editor

-- First, create a demo user in auth.users (if not exists)
-- Note: You'll need to sign up via the app for proper auth setup
-- This is a fallback for testing only

-- Get or create a demo user profile
DO $$
DECLARE
  demo_user_id uuid;
BEGIN
  -- Check if a demo user already exists
  SELECT id INTO demo_user_id 
  FROM auth.users 
  WHERE email = 'demo@learnhub.test' 
  LIMIT 1;

  -- If demo user doesn't exist, you need to sign up first
  IF demo_user_id IS NULL THEN
    RAISE EXCEPTION 'No demo user found. Please sign up at http://localhost:3000/login first, then replace <YOUR_USER_ID> in scripts/seed.sql with your actual user ID';
  END IF;

  -- Clean up any existing demo resources (optional)
  DELETE FROM public.resources WHERE owner_id = demo_user_id;

  -- Insert 5 sample resources
  INSERT INTO public.resources (title, description, url, type, owner_id, created_at)
  VALUES
    (
      'Next.js 15 Complete Course for Beginners',
      'Comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and deployment strategies.',
      'https://www.youtube.com/watch?v=Sklc_fQBmcs',
      'video',
      demo_user_id,
      NOW() - INTERVAL '5 days'
    ),
    (
      'TypeScript Deep Dive - Full Course',
      'Master TypeScript from basics to advanced patterns including generics, utility types, and real-world project setup. Perfect for developers looking to level up their skills.',
      'https://www.youtube.com/watch?v=BwuLxPH8IDs',
      'video',
      demo_user_id,
      NOW() - INTERVAL '4 days'
    ),
    (
      'React 19: What''s New with Server Components',
      'Deep dive into React 19 features including Server Components, Actions, and the new use() hook. Learn how to build faster, more efficient applications.',
      'https://react.dev/blog/2024/04/25/react-19',
      'article',
      demo_user_id,
      NOW() - INTERVAL '3 days'
    ),
    (
      'Building Scalable APIs with Supabase',
      'Learn best practices for designing and implementing robust APIs with Supabase, including Row Level Security, real-time subscriptions, and performance optimization.',
      'https://supabase.com/docs/guides/api',
      'article',
      demo_user_id,
      NOW() - INTERVAL '2 days'
    ),
    (
      'Web Vitals Optimization Guide',
      'Complete guide to optimizing Core Web Vitals for better user experience and SEO rankings. Covers performance metrics, measurement tools, and optimization techniques.',
      'https://web.dev/vitals/',
      'article',
      demo_user_id,
      NOW() - INTERVAL '1 day'
    );
END $$;

-- Verify the seed data was inserted
SELECT 
  r.id,
  r.title,
  r.type,
  p.username as owner,
  r.created_at
FROM public.resources r
JOIN public.profiles p ON r.owner_id = p.id
ORDER BY r.created_at DESC;

