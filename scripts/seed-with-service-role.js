// Script to seed resources using service role key (bypasses RLS)
// This requires SUPABASE_SERVICE_ROLE_KEY in your .env.local

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

async function seedResources() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceRoleKey) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY not found in .env.local');
    console.log('\n📋 To get your service role key:');
    console.log('1. Go to: https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa/settings/api');
    console.log('2. Copy the "service_role" key');
    console.log('3. Add to .env.local: SUPABASE_SERVICE_ROLE_KEY=your_key_here');
    console.log('\n⚠️  NEVER commit this key to git! It\'s already in .gitignore.');
    process.exit(1);
  }
  
  // Create client with service role key (bypasses RLS)
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
  
  console.log('✅ Using service role key - will bypass RLS');
  
  // Get first user
  const { data: users, error: userError } = await supabase
    .from('profiles')
    .select('id, username')
    .limit(1);
  
  if (userError) {
    console.error('❌ Error fetching users:', userError);
    process.exit(1);
  }
  
  if (!users || users.length === 0) {
    console.error('❌ No users found. Please sign up first!');
    process.exit(1);
  }
  
  const user = users[0];
  console.log('✅ Found user:', user.username, '(' + user.id + ')');
  
  // Seed resources
  const resources = [
    {
      title: 'Next.js 15 Complete Course for Beginners',
      description: 'Comprehensive guide to building modern web applications with Next.js 15, covering App Router, Server Components, and deployment strategies.',
      url: 'https://www.youtube.com/watch?v=Sklc_fQBmcs',
      type: 'video',
      owner_id: user.id
    },
    {
      title: 'TypeScript Deep Dive - Full Course',
      description: 'Master TypeScript from basics to advanced patterns including generics, utility types, and real-world project setup. Perfect for developers looking to level up their skills.',
      url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs',
      type: 'video',
      owner_id: user.id
    },
    {
      title: 'React 19: What\'s New with Server Components',
      description: 'Deep dive into React 19 features including Server Components, Actions, and the new use() hook. Learn how to build faster, more efficient applications.',
      url: 'https://react.dev/blog/2024/04/25/react-19',
      type: 'article',
      owner_id: user.id
    },
    {
      title: 'Building Scalable APIs with Supabase',
      description: 'Learn best practices for designing and implementing robust APIs with Supabase, including Row Level Security, real-time subscriptions, and performance optimization.',
      url: 'https://supabase.com/docs/guides/api',
      type: 'article',
      owner_id: user.id
    },
    {
      title: 'Web Vitals Optimization Guide',
      description: 'Complete guide to optimizing Core Web Vitals for better user experience and SEO rankings. Covers performance metrics, measurement tools, and optimization techniques.',
      url: 'https://web.dev/vitals/',
      type: 'article',
      owner_id: user.id
    }
  ];
  
  console.log('\n🔄 Inserting resources...');
  const { data, error } = await supabase
    .from('resources')
    .insert(resources)
    .select();
  
  if (error) {
    console.error('❌ Error inserting resources:', error);
    process.exit(1);
  }
  
  console.log('✅ Successfully inserted', data.length, 'resources!\n');
  console.log('Resources created:');
  data.forEach((r, i) => {
    console.log(`${i + 1}. ${r.title} (${r.type})`);
  });
  
  console.log('\n🎉 Visit http://localhost:3000/resources to see them!');
}

seedResources().catch(console.error);

