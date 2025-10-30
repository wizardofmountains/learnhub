/**
 * Seed Script for LearnHub Resources
 * 
 * This script seeds the database with 5 sample learning resources.
 * Run with: npm run seed
 * 
 * Prerequisites:
 * 1. Install tsx: npm install -D tsx
 * 2. Have a user account created (sign up at /login)
 * 3. Have .env.local with Supabase credentials
 */

import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../lib/supabase/database.types';

// Load environment variables
config({ path: '.env.local' });

// Initialize Supabase client with service role
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL not found in .env.local');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

async function seedResources() {
  console.log('🌱 Starting resource seeding...\n');

  // Get the first user from profiles table
  const { data: profiles, error: profileError } = await supabase
    .from('profiles')
    .select('id, username')
    .limit(1)
    .single();

  if (profileError || !profiles) {
    console.error('❌ Error: No user profiles found.');
    console.log('📝 Please create an account first by signing up at /login\n');
    process.exit(1);
  }

  console.log(`✅ Found user: @${profiles.username} (${profiles.id})\n`);

  // Sample resources to seed
  const resources = [
    {
      title: 'Next.js 15 Complete Course for Beginners',
      description: 'Comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and deployment strategies.',
      url: 'https://www.youtube.com/watch?v=Sklc_fQBmcs',
      type: 'video' as const,
      owner_id: profiles.id,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'TypeScript Deep Dive - Full Course',
      description: 'Master TypeScript from basics to advanced patterns including generics, utility types, and real-world project setup. Perfect for developers looking to level up their skills.',
      url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs',
      type: 'video' as const,
      owner_id: profiles.id,
      created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'React 19: What\'s New with Server Components',
      description: 'Deep dive into React 19 features including Server Components, Actions, and the new use() hook. Learn how to build faster, more efficient applications.',
      url: 'https://react.dev/blog/2024/04/25/react-19',
      type: 'article' as const,
      owner_id: profiles.id,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Building Scalable APIs with Supabase',
      description: 'Learn best practices for designing and implementing robust APIs with Supabase, including Row Level Security, real-time subscriptions, and performance optimization.',
      url: 'https://supabase.com/docs/guides/api',
      type: 'article' as const,
      owner_id: profiles.id,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      title: 'Web Vitals Optimization Guide',
      description: 'Complete guide to optimizing Core Web Vitals for better user experience and SEO rankings. Covers performance metrics, measurement tools, and optimization techniques.',
      url: 'https://web.dev/vitals/',
      type: 'article' as const,
      owner_id: profiles.id,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  console.log(`📦 Inserting ${resources.length} sample resources...\n`);

  // Insert resources
  const { data, error } = await supabase
    .from('resources')
    .insert(resources)
    .select();

  if (error) {
    console.error('❌ Error inserting resources:', error.message);
    process.exit(1);
  }

  console.log(`✅ Successfully seeded ${data?.length || 0} resources!\n`);

  // Display seeded resources
  data?.forEach((resource, index) => {
    console.log(`${index + 1}. [${resource.type.toUpperCase()}] ${resource.title}`);
  });

  console.log('\n🎉 Seeding complete! Visit /resources to see your data.\n');
}

// Run the seed function
seedResources()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });

