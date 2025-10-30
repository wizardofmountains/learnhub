/**
 * Simple Seed Script for LearnHub Resources
 * 
 * This uses SQL to directly insert resources, bypassing RLS
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../lib/supabase/database.types';

// Load environment variables
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

async function seed() {
  console.log('🌱 Seeding resources via SQL...\n');

  // Get the first user
  const { data: user } = await supabase
    .from('profiles')
    .select('id, username')
    .limit(1)
    .single();

  if (!user) {
    console.error('❌ No user found. Please sign up first at /login');
    return;
  }

  console.log(`✅ Found user: @${user.username}`);
  console.log(`📝 User ID: ${user.id}\n`);
  console.log('To seed the database, run this SQL in the Supabase SQL Editor:\n');
  console.log('https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa/sql\n');
  console.log('---\n');
  
  const sql = `
INSERT INTO public.resources (title, description, url, type, owner_id, created_at)
VALUES
  (
    'Next.js 15 Complete Course for Beginners',
    'Comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and deployment strategies.',
    'https://www.youtube.com/watch?v=Sklc_fQBmcs',
    'video',
    '${user.id}'::uuid,
    NOW() - INTERVAL '5 days'
  ),
  (
    'TypeScript Deep Dive - Full Course',
    'Master TypeScript from basics to advanced patterns including generics, utility types, and real-world project setup. Perfect for developers looking to level up their skills.',
    'https://www.youtube.com/watch?v=BwuLxPH8IDs',
    'video',
    '${user.id}'::uuid,
    NOW() - INTERVAL '4 days'
  ),
  (
    'React 19: What''s New with Server Components',
    'Deep dive into React 19 features including Server Components, Actions, and the new use() hook. Learn how to build faster, more efficient applications.',
    'https://react.dev/blog/2024/04/25/react-19',
    'article',
    '${user.id}'::uuid,
    NOW() - INTERVAL '3 days'
  ),
  (
    'Building Scalable APIs with Supabase',
    'Learn best practices for designing and implementing robust APIs with Supabase, including Row Level Security, real-time subscriptions, and performance optimization.',
    'https://supabase.com/docs/guides/api',
    'article',
    '${user.id}'::uuid,
    NOW() - INTERVAL '2 days'
  ),
  (
    'Web Vitals Optimization Guide',
    'Complete guide to optimizing Core Web Vitals for better user experience and SEO rankings. Covers performance metrics, measurement tools, and optimization techniques.',
    'https://web.dev/vitals/',
    'article',
    '${user.id}'::uuid,
    NOW() - INTERVAL '1 day'
  )
ON CONFLICT (id) DO NOTHING;
`;

  console.log(sql);
  console.log('\n---\n');
  console.log('After running the SQL, visit http://localhost:3000/resources to see your data!\n');
}

seed();

