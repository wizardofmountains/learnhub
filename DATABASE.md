# LearnHub Database Setup

## Overview

This document describes the database schema and setup for LearnHub.

## Supabase Project

- **Project ID**: `iwljwcfpjyfesdxmiuwa`
- **Region**: `eu-west-1`
- **Status**: Active & Healthy
- **Database Version**: PostgreSQL 17.6.1

## Database Schema

### Tables

#### `profiles`

User profiles linked to Supabase Auth.

| Column       | Type           | Description                          |
| ------------ | -------------- | ------------------------------------ |
| `id`         | UUID (PK, FK)  | References `auth.users.id`           |
| `username`   | TEXT (UNIQUE)  | Display name                         |
| `created_at` | TIMESTAMPTZ    | Registration timestamp               |

**Indexes:**
- `idx_profiles_username` on `username`

**RLS Policies:**
- ✅ `SELECT`: Everyone can view profiles
- ✅ `INSERT`: Users can create their own profile
- ✅ `UPDATE`: Users can update their own profile

**Trigger:**
- Automatically creates profile when user signs up via Auth

---

#### `resources`

Learning resources shared by users.

| Column        | Type          | Description                                      |
| ------------- | ------------- | ------------------------------------------------ |
| `id`          | UUID (PK)     | Auto-generated primary key                       |
| `owner_id`    | UUID (FK)     | References `profiles.id`                         |
| `title`       | TEXT          | Resource title (min 3 chars)                     |
| `description` | TEXT          | Short description (max 500 chars, optional)      |
| `url`         | TEXT          | External link (must start with http/https)       |
| `type`        | TEXT          | Resource type: 'video', 'article', or 'pdf'      |
| `created_at`  | TIMESTAMPTZ   | Creation timestamp                               |

**Constraints:**
- `title`: minimum 3 characters
- `description`: maximum 500 characters
- `url`: must match regex `^https?://`
- `type`: must be one of ['video', 'article', 'pdf']

**Indexes:**
- `idx_resources_owner_id` on `owner_id`
- `idx_resources_type` on `type`
- `idx_resources_created_at` on `created_at DESC`
- `idx_resources_search` (GIN) on full-text search of title + description

**RLS Policies:**
- ✅ `SELECT`: Everyone can view resources
- ✅ `INSERT`: Only authenticated users can create resources (must own them)
- ✅ `DELETE`: Users can only delete their own resources

---

## Migrations Applied

1. **`create_profiles_table`** - Creates profiles table with RLS and auto-creation trigger
2. **`create_resources_table`** - Creates resources table with RLS and indexes
3. **`fix_function_search_path`** - Security fix for trigger function

## Security

- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Function search paths properly configured
- ✅ No security advisories outstanding

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://iwljwcfpjyfesdxmiuwa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
```

## TypeScript Types

Types are auto-generated from the database schema:
- Location: `lib/supabase/database.types.ts`
- Helper types: `lib/types.ts`

## Client Libraries

- **Server Components**: Use `lib/supabase/server.ts`
- **Client Components**: Use `lib/supabase/client.ts`
- **Middleware**: Configured in `middleware.ts` for session management

## Next Steps

1. ✅ Database schema created
2. ✅ RLS policies configured
3. ✅ TypeScript types generated
4. ✅ Seed data script created (5 sample resources)
5. ✅ Authentication UI complete
6. ⏳ CRUD operations (resources list, detail, submit)

