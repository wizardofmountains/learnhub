# Quick Seed Instructions

## ✅ Your Seed SQL is Ready!

Run `npm run seed` to generate SQL with your user ID, then:

### Step 1: Copy the SQL

The script output contains SQL like this:
```sql
INSERT INTO public.resources (title, description, url, type, owner_id, created_at)
VALUES
  (
    'Next.js 15 Complete Course for Beginners',
    ...
  ),
  ...
```

### Step 2: Run in Supabase SQL Editor

1. Open: https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa/sql
2. Paste the SQL from the script output
3. Click "Run" or press Cmd/Ctrl + Enter
4. You should see: "Success. No rows returned"

### Step 3: View Your Resources

Visit: http://localhost:3000/resources

You should now see 5 sample resources:
- 2 Videos (Next.js, TypeScript)
- 3 Articles (React 19, Supabase APIs, Web Vitals)

---

## Alternative: Use the provided seed.sql

If you prefer, edit `scripts/seed.sql`:
1. Replace `<YOUR_USER_ID>` with your UUID
2. Run in Supabase SQL Editor

Your UUID: **Check the output of `npm run seed`**

---

## Troubleshooting

### "No user found"
- Sign up at http://localhost:3000/login first
- Confirm your email
- Run `npm run seed` again

### SQL Error
- Make sure you copied the complete INSERT statement
- Check that your user ID is a valid UUID
- Verify you're logged into the correct Supabase project

### No data appears
- Check the Supabase Table Editor
- Query: `SELECT * FROM resources;`
- Clear your browser cache and refresh

---

## Next Steps

After seeding:
1. ✅ Browse resources at `/resources`
2. ✅ Test search and filters
3. ✅ Check responsive design (mobile, tablet, desktop)
4. 🔜 Build the submit form to add your own resources
5. 🔜 Build the dashboard to view your stats

