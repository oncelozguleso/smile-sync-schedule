# 🗄️ Supabase Integration Setup Guide

Your dental content schedule now supports **persistent data storage** and **real-time updates** using Supabase!

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Sign in (free account)
3. Click **"New Project"**
4. Fill in:
   - **Name**: `dental-content-schedule`
   - **Password**: Choose a secure database password
   - **Region**: Select closest to your location
5. Click **"Create new project"**
6. Wait 2-3 minutes for setup to complete

### Step 2: Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

### Step 3: Create Environment File
Create a file called `.env.local` in your project root:

```bash
# In your project directory
touch .env.local
```

Add your credentials to `.env.local`:
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**⚠️ Important**: Replace the URLs above with your actual values from Step 2!

### Step 4: Create Database Table
1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
-- Create videos table
CREATE TABLE videos (
  id text PRIMARY KEY,
  date text NOT NULL,
  day integer NOT NULL,
  dentist text NOT NULL,
  topic text NOT NULL,
  content_type text NOT NULL,
  duration text NOT NULL,
  script text NOT NULL,
  broll_shots text[] NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow all operations (simple policy for this use case)
CREATE POLICY "Allow all operations on videos" ON videos
FOR ALL USING (true);

-- Auto-update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_videos_updated_at 
    BEFORE UPDATE ON videos 
    FOR EACH ROW 
    EXECUTE PROCEDURE update_updated_at_column();
```

4. Click **"Run"** to execute the SQL

### Step 5: Test Locally
```bash
npm run dev
```

Visit `http://localhost:5173` - your app should:
- ✅ Load with a "Connecting to database" message
- ✅ Automatically populate with your 19 video schedule
- ✅ Persist completion status when you refresh the page!

## 🎉 What You Now Have

### ✅ Persistent Data Storage
- Video completion status **saves permanently**
- **Survives page refreshes** and browser restarts
- **Shared across all users** accessing the app

### ✅ Real-Time Updates
- Multiple users can use the app simultaneously
- **Changes appear instantly** for all users
- No need to refresh to see updates

### ✅ Automatic Database Setup
- App automatically creates initial data on first run
- No manual data entry required
- Seamless migration from static data

### ✅ Error Handling
- **Fallback to static data** if database is unavailable
- **User-friendly error messages**
- **Retry functionality** built-in

## 🔧 For VPS Deployment

When deploying to your VPS, you'll need to add the environment variables:

```bash
# SSH into your VPS
ssh general

# Navigate to your app directory
cd /var/www/smile-sync-schedule

# Create production environment file
nano .env.local

# Add your Supabase credentials (same as above)
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Save and rebuild
npm run build
```

## 🔒 Security Notes

- ✅ **Row Level Security** enabled on database
- ✅ **Public read/write** policy (appropriate for this use case)
- ✅ **Environment variables** keep credentials secure
- ✅ **Anon key** is safe for client-side use

## 🆘 Troubleshooting

### "Failed to Load Schedule" Error
1. Check your `.env.local` file exists and has correct values
2. Verify Supabase project is active (not paused)
3. Confirm database table was created successfully

### Data Not Persisting
1. Check browser console for error messages
2. Verify Supabase credentials are correct
3. Ensure RLS policy allows operations

### Real-Time Updates Not Working
1. Supabase real-time is enabled by default
2. Check network connectivity
3. Verify multiple browser windows to test

## 📞 Support

Your dental content schedule now has enterprise-grade data persistence! 🦷✨
