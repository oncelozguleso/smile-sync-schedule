# Supabase Setup Instructions

## 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create account
2. Create new project: `dental-content-schedule`
3. Wait for project to be ready (2-3 minutes)

## 2. Get Your Credentials
From your Supabase dashboard > Settings > API:
- Copy your `Project URL`
- Copy your `anon/public` key

## 3. Create Environment File
Create `.env.local` in your project root:
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Create Database Table
Go to Supabase Dashboard > SQL Editor and run this:

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

-- Enable Row Level Security (RLS)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for simplicity)
-- In production, you'd want more restrictive policies
CREATE POLICY "Allow all operations on videos" ON videos
FOR ALL USING (true);

-- Create updated_at trigger
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

## 5. Insert Initial Data
After creating the table, we'll populate it with your video schedule data.
