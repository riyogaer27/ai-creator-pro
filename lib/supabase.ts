import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function initSupabase() {
  const { data, error } = await supabase.auth.getSession()
  if (error) console.error('Supabase init error:', error)
  return { data, error }
}
