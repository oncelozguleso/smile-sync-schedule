import { createClient } from '@supabase/supabase-js'

// These will be your Supabase project credentials
// You'll get these from your Supabase dashboard
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface VideoRecord {
  id: string
  date: string
  day: number
  dentist: string
  topic: string
  content_type: string
  duration: string
  script: string
  broll_shots: string[]
  completed: boolean
  created_at?: string
  updated_at?: string
}
