# Seed Data Guide

This guide explains how to populate your LearnHub database with sample data for development and testing.

## Overview

The seed script creates **5 sample learning resources** representing different types:
- 2 video resources
- 3 article resources

## Quick Start (Recommended)

### Step 1: Sign Up for an Account

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/login

3. Click "Sign Up" and create an account

4. Confirm your email address (check your inbox)

5. Sign in with your new account

### Step 2: Run the Automatic Seed Script

Simply run:
```bash
npm run seed
```

This will automatically:
- Find your user account
- Insert 5 sample resources
- Display the results

**That's it!** Visit http://localhost:3000/resources to see your seeded data.

---

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

---

## Alternative: Manual SQL Method

If the automatic script doesn't work, you can use the SQL method:

### Step 1: Get Your User ID

**Using Supabase Dashboard:**
1. Go to https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa
2. Navigate to **Table Editor** → **profiles**
3. Find your profile and copy the `id` UUID

**Using SQL Editor:**
```sql
SELECT id, username FROM public.profiles;
```

### Step 2: Run the SQL Script

1. Open the Supabase SQL Editor
2. Open the file `scripts/seed.sql` from this project
3. Replace all instances of `<YOUR_USER_ID>` with your actual UUID
4. Run the SQL script
5. Verify:
   ```sql
   SELECT id, title, type, created_at 
   FROM public.resources 
   ORDER BY created_at DESC;
   ```

---

## Verifying RLS Policies

After seeding, test that Row Level Security works correctly:

### Test 1: Public Can View All Resources
```sql
-- This should return all 5 resources
SELECT * FROM public.resources;
```

### Test 2: Users Can Only Delete Their Own Resources
Try to delete a resource you didn't create (should fail with RLS policy violation).

### Test 3: Authenticated Users Can Create Resources
This will be tested when you use the submit form (Milestone 4).

---

## Clearing Seed Data

If you need to clear the seed data and start fresh:

```sql
-- WARNING: This deletes ALL resources (not just seed data)
DELETE FROM public.resources;

-- Or delete only your resources:
DELETE FROM public.resources WHERE owner_id = '<YOUR_USER_ID>';
```

---

## Troubleshooting

### Error: "No user profiles found"
- Make sure you've signed up for an account first
- Check that your profile was created in the `profiles` table

### Script doesn't run
- Ensure `tsx` is installed: `npm install -D tsx`
- Check that your `.env.local` file has the correct Supabase credentials

### No data appears after running the script
- Check the script output for errors
- Verify the script ran successfully (you should see "✅ Successfully seeded...")
- Query the resources table to confirm

---

## Production Notes

⚠️ **Important**: Seed data is for **development and testing only**.

- Do NOT run seed scripts in production environments
- Do NOT commit seed data with sensitive or copyrighted content
- Consider using fixtures or factories for testing instead

---

## Next Steps

After successfully seeding the database:

1. Visit `/resources` to see your seeded resources
2. Test search and filter functionality
3. Build the submit form to add new resources
4. Build the dashboard to view your own resources

---

## Related Files

- `scripts/seed-resources.ts` - TypeScript seed script
- `scripts/seed.sql` - SQL seed script (manual method)
- `DATABASE.md` - Database schema documentation
- `lib/types.ts` - TypeScript type definitions

