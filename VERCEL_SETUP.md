# Vercel Deployment Setup Guide

This guide covers the complete setup process for deploying LearnHub to Vercel.

---

## Prerequisites

- [x] Vercel account (free tier works)
- [x] GitHub/GitLab/Bitbucket repository connected
- [x] Supabase project running (iwljwcfpjyfesdxmiuwa)

---

## Step 1: Install Vercel CLI (Optional)

```bash
npm i -g vercel
vercel login
```

---

## Step 2: Configure Environment Variables

### Required Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

#### 1. NEXT_PUBLIC_SUPABASE_URL
- **Value**: `https://iwljwcfpjyfesdxmiuwa.supabase.co`
- **Where to find**: Supabase Dashboard → Settings → API
- **Environments**: Production, Preview, Development
- **Note**: This is safe to expose publicly

#### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
- **Value**: Your anon/public key from Supabase
- **Where to find**: Supabase Dashboard → Settings → API → Project API keys → `anon` `public` key
- **Environments**: Production, Preview, Development
- **Note**: This is safe to expose publicly

#### 3. NEXT_PUBLIC_SITE_URL ⚠️ CRITICAL
- **Development**: `http://localhost:3000`
- **Preview**: `https://your-project-git-branch.vercel.app`
- **Production**: `https://your-custom-domain.com` or `https://your-project.vercel.app`
- **Where used**: Email confirmation redirects in authentication
- **Environments**: Set different values per environment
- **Note**: ⚠️ **Without this, email confirmations will fail in production!**

### How to Add in Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Enter variable name (e.g., `NEXT_PUBLIC_SITE_URL`)
6. Enter value
7. Select environments (Production, Preview, Development)
8. Click **Save**

---

## Step 3: Configure Supabase for Production

### Update Auth Settings

1. Go to: https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa/auth/url-configuration
2. Update **Site URL** to your production domain:
   - `https://your-domain.vercel.app`
3. Add **Redirect URLs** (one per line):
   ```
   https://your-domain.vercel.app/auth/confirm
   https://your-domain.vercel.app/dashboard
   http://localhost:3000/auth/confirm
   http://localhost:3000/dashboard
   ```

### Enable Security Features

1. Go to: https://supabase.com/dashboard/project/iwljwcfpjyfesdxmiuwa/auth/policies
2. Enable **Password breach detection** (recommended)
3. Configure **Rate limiting** if needed

---

## Step 4: Deploy

### Option A: Deploy via Git Push (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Vercel
3. Vercel auto-deploys on every push

### Option B: Deploy via CLI

```bash
# Link project
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## Step 5: Verify Deployment

### Automated Checks

After deployment, verify these features work:

- [ ] Homepage loads
- [ ] Resources page displays seed data
- [ ] Sign up form works
- [ ] Email confirmation link works (check your email)
- [ ] Login works after email confirmation
- [ ] Dashboard shows user's resources
- [ ] Submit resource form works
- [ ] Delete resource works
- [ ] Search and filters work
- [ ] Mobile responsive layout

### Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on latest deployment
3. Go to **Functions** tab
4. Check for errors in logs

---

## Step 6: Custom Domain (Optional)

### Add Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your domain: `learnhub.com`
3. Follow DNS configuration instructions
4. Wait for DNS propagation (5 minutes - 24 hours)

### Update Environment Variables

Once custom domain is active:

1. Update `NEXT_PUBLIC_SITE_URL` to your custom domain
2. Update Supabase Auth redirect URLs
3. Redeploy (automatic after env var change)

---

## Troubleshooting

### Issue: Email Confirmations Not Working

**Symptom**: Users don't receive confirmation emails or links redirect to localhost

**Fix**:
1. Check `NEXT_PUBLIC_SITE_URL` is set correctly in Vercel
2. Verify Supabase Auth Site URL matches your domain
3. Check Supabase redirect URLs include your domain
4. Redeploy after changes

### Issue: "Missing required environment variable" Error

**Symptom**: App crashes on load with environment variable error

**Fix**:
1. Check all 3 required variables are set in Vercel
2. Ensure variables are set for the correct environment
3. Check variable names are exactly correct (case-sensitive)
4. Redeploy after adding variables

### Issue: Database Connection Failed

**Symptom**: Resources don't load, authentication fails

**Fix**:
1. Verify Supabase project is active
2. Check `NEXT_PUBLIC_SUPABASE_URL` is correct
3. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
4. Check Supabase project has no service disruptions

### Issue: Build Fails

**Symptom**: Deployment fails during build step

**Fix**:
1. Run `npm run build` locally to reproduce error
2. Check TypeScript errors with `npm run lint`
3. Ensure all dependencies are in `package.json`
4. Check Node version matches (20.x recommended)

---

## Environment Variables Summary

| Variable | Development | Production | Required |
|----------|-------------|------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Same as prod | `https://iwljwcfpjyfesdxmiuwa.supabase.co` | ✅ Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same as prod | Your anon key | ✅ Yes |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Your domain | ✅ Yes |

---

## Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] Supabase auth settings updated
- [ ] Custom domain configured (if applicable)
- [ ] Email confirmations tested
- [ ] All core features tested
- [ ] Mobile responsiveness verified
- [ ] No errors in Vercel logs
- [ ] Performance acceptable (check Vercel Analytics)
- [ ] Database RLS policies working correctly
- [ ] Seed data cleared (if needed for production)

---

## Monitoring & Maintenance

### Enable Vercel Analytics (Optional)

1. Vercel Dashboard → Analytics → Enable
2. Monitor Core Web Vitals
3. Track page load times

### Monitor Supabase

1. Dashboard → Database → Monitor queries
2. Check for slow queries
3. Monitor API usage
4. Set up billing alerts

### Regular Maintenance

- Check Vercel logs weekly for errors
- Monitor Supabase usage and performance
- Review RLS policy performance (see advisors)
- Keep dependencies updated (`npm audit`)
- Back up database regularly

---

## Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Support**: https://vercel.com/support

---

**Last Updated**: October 30, 2025  
**Version**: 1.0  
**Status**: Production Ready ✅

