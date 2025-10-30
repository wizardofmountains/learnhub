-- Insert seed data for user: lol (f126f88e-2aa8-492a-8f25-aa78ee7789de)
-- Copy this entire script and run in Supabase SQL Editor

INSERT INTO public.resources (title, description, url, type, owner_id, created_at)
VALUES
  (
    'Next.js 15 Complete Course for Beginners',
    'Comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and deployment strategies.',
    'https://www.youtube.com/watch?v=Sklc_fQBmcs',
    'video',
    'f126f88e-2aa8-492a-8f25-aa78ee7789de',
    NOW() - INTERVAL '5 days'
  ),
  (
    'TypeScript Deep Dive - Full Course',
    'Master TypeScript from basics to advanced patterns including generics, utility types, and real-world project setup. Perfect for developers looking to level up their skills.',
    'https://www.youtube.com/watch?v=BwuLxPH8IDs',
    'video',
    'f126f88e-2aa8-492a-8f25-aa78ee7789de',
    NOW() - INTERVAL '4 days'
  ),
  (
    'React 19: What''s New with Server Components',
    'Deep dive into React 19 features including Server Components, Actions, and the new use() hook. Learn how to build faster, more efficient applications.',
    'https://react.dev/blog/2024/04/25/react-19',
    'article',
    'f126f88e-2aa8-492a-8f25-aa78ee7789de',
    NOW() - INTERVAL '3 days'
  ),
  (
    'Building Scalable APIs with Supabase',
    'Learn best practices for designing and implementing robust APIs with Supabase, including Row Level Security, real-time subscriptions, and performance optimization.',
    'https://supabase.com/docs/guides/api',
    'article',
    'f126f88e-2aa8-492a-8f25-aa78ee7789de',
    NOW() - INTERVAL '2 days'
  ),
  (
    'Web Vitals Optimization Guide',
    'Complete guide to optimizing Core Web Vitals for better user experience and SEO rankings. Covers performance metrics, measurement tools, and optimization techniques.',
    'https://web.dev/vitals/',
    'article',
    'f126f88e-2aa8-492a-8f25-aa78ee7789de',
    NOW() - INTERVAL '1 day'
  )
RETURNING id, title, type;

-- Verify the seed data
SELECT 
  r.id,
  r.title,
  r.type,
  p.username as owner,
  r.created_at
FROM public.resources r
JOIN public.profiles p ON r.owner_id = p.id
ORDER BY r.created_at DESC;