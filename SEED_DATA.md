# Seed Data Guide

This guide explains how to populate your LearnHub database with sample data for development and testing.

## Overview

The seed script creates **5 sample learning resources** representing different types:
- 2 video resources
- 3 article resources

## Prerequisites

Before seeding the database, you must:

1. **Have the database tables created** (already done via migrations)
2. **Create a user account** by signing up at `/login`
3. **Get your user ID** from the profiles table

## Step-by-Step Instructions

### Step 1: Sign Up for an Account

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/login

3. Click "Sign Up" and create an account

4. Confirm your email address (check your inbox)

5. Sign in with your new account

### Step 2: Get Your User ID

After signing in, you can get your user ID in two ways:

**Option A: Using Supabase Dashboard**
1. Go to https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa
2. Navigate to **Table Editor** → **profiles**
3. Find your profile and copy the `id` UUID

**Option B: Using SQL Editor in Supabase**
```sql
SELECT id, username FROM public.profiles;
```

### Step 3: Run the Seed Script

**Quick Method (Recommended):**
1. Open the Supabase SQL Editor: https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa/sql
2. Open and copy the file `scripts/seed-simple.sql` from this project
3. Paste and run it in the SQL Editor
4. Done! It automatically uses your first user.

**Manual Method:**
1. Open the Supabase SQL Editor: https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa/sql
2. Open the file `scripts/seed.sql` from this project
3. Replace all instances of `<YOUR_USER_ID>` with your actual UUID
4. Run the SQL script in the Supabase SQL Editor

5. Verify the data was inserted:
   ```sql
   SELECT id, title, type, created_at 
   FROM public.resources 
   ORDER BY created_at DESC;
   ```

## Seed Data Details

### Video Resources

1. **Next.js 15 Complete Course for Beginners**
   - URL: YouTube tutorial
   - Focus: Next.js App Router and Server Components

2. **TypeScript Deep Dive - Full Course**
   - URL: YouTube tutorial
   - Focus: TypeScript fundamentals and advanced patterns

### Article Resources

3. **React 19: What's New with Server Components**
   - URL: Official React blog post
   - Focus: React 19 features and improvements

4. **Building Scalable APIs with Supabase**
   - URL: Supabase documentation
   - Focus: API design and RLS best practices

5. **Web Vitals Optimization Guide**
   - URL: Web.dev performance guide
   - Focus: Performance optimization and Core Web Vitals

## Verifying RLS Policies

After seeding, test that Row Level Security works correctly:

### Test 1: Public Can View All Resources
```sql
-- This should return all 5 resources (RLS policy allows SELECT for everyone)
SELECT * FROM public.resources;
```

### Test 2: Users Can Only Delete Their Own Resources
Try to delete a resource you didn't create (should fail):
```sql
-- This should fail with RLS policy violation
DELETE FROM public.resources WHERE id = '<some_other_user_resource_id>';
```

### Test 3: Authenticated Users Can Create Resources
This will be tested when you build the submit form (Milestone 4).

## Clearing Seed Data

If you need to clear the seed data and start fresh:

```sql
-- WARNING: This deletes ALL resources (not just seed data)
DELETE FROM public.resources;

-- Or delete only your resources:
DELETE FROM public.resources WHERE owner_id = '<YOUR_USER_ID>';
```

## Troubleshooting

### Error: "invalid input syntax for type uuid"
- Make sure you replaced `<YOUR_USER_ID>` with a valid UUID
- UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

### Error: "new row violates row-level security policy"
- Ensure you're signed in when running the script
- Or temporarily disable RLS for seeding (not recommended for production)

### No data appears after running the script
- Check the Supabase logs for errors
- Verify the script ran successfully
- Query the resources table to confirm

## Production Notes

⚠️ **Important**: Seed data is for **development and testing only**.

- Do NOT run seed scripts in production environments
- Do NOT commit seed data with sensitive or copyrighted content
- Consider using fixtures or factories for testing instead

## Next Steps

After successfully seeding the database:

1. Build the resources list page (`/resources`)
2. Build the resource detail page (`/resource/[id]`)
3. Build the dashboard to view your seeded resources
4. Create the submit form to add new resources

## Related Files

- `scripts/seed.sql` - The seed SQL script
- `DATABASE.md` - Database schema documentation
- `lib/types.ts` - TypeScript type definitions

