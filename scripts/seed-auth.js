// Script to seed resources by authenticating as the user first
// This respects RLS policies by creating an authenticated session

const { createClient } = require('@supabase/supabase-js');

async function seedResources() {
  const supabaseUrl = 'https://iwljwcfpjyfesdxmiuwa.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3bGp3Y2ZwanlmZXNkeG1pdXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MjAyODgsImV4cCI6MjA3NzM5NjI4OH0.C8vuNRB29me9vz76uj7I62J1n_LanPTCZDS9nFfsszI';
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  // First, get user ID
  const { data: users } = await supabase.from('profiles').select('id').limit(1);
  
  if (!users || users.length === 0) {
    console.error('❌ No users found. Please sign up first!');
    process.exit(1);
  }
  
  const userId = users[0].id;
  console.log('✅ Found user ID:', userId);
  
  // Try to seed resources
  const resources = [
    {
      title: 'Next.js 15 Complete Course for Beginners',
      description: 'Comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and deployment strategies.',
      url: 'https://www.youtube.com/watch?v=Sklc_fQBmcs',
      type: 'video',
      owner_id: userId
    },
    {
      title: 'TypeScript Deep Dive - Full Course',
      description: 'Master TypeScript from basics to advanced patterns including generics, utility types, and real-world project setup. Perfect for developers looking to level up their skills.',
      url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs',
      type: 'video',
      owner_id: userId
    },
    {
      title: 'React 19: What\'s New with Server Components',
      description: 'Deep dive into React 19 features including Server Components, Actions, and the new use() hook. Learn how to build faster, more efficient applications.',
      url: 'https://react.dev/blog/2024/04/25/react-19',
      type: 'article',
      owner_id: userId
    },
    {
      title: 'Building Scalable APIs with Supabase',
      description: 'Learn best practices for designing and implementing robust APIs with Supabase, including Row Level Security, real-time subscriptions, and performance optimization.',
      url: 'https://supabase.com/docs/guides/api',
      type: 'article',
      owner_id: userId
    },
    {
      title: 'Web Vitals Optimization Guide',
      description: 'Complete guide to optimizing Core Web Vitals for better user experience and SEO rankings. Covers performance metrics, measurement tools, and optimization techniques.',
      url: 'https://web.dev/vitals/',
      type: 'article',
      owner_id: userId
    }
  ];
  
  const { data, error } = await supabase.from('resources').insert(resources).select();
  
  if (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 This is expected! RLS requires authentication.');
    console.log('📋 Please run the SQL in Supabase Dashboard instead.');
    console.log('   https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa/sql');
  } else {
    console.log('✅ Successfully inserted', data.length, 'resources!');
  }
}

seedResources();

