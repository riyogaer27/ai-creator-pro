import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function initSupabase() {
  const { data, error } = await supabase.auth.getSession()
  if (error) console.error('Supabase init error:', error)
  return { data, error }
}

// Helper functions untuk database operations
export async function saveCharacter(userId: string, characterData: any) {
  const { data, error } = await supabase
    .from('character_templates')
    .insert([
      {
        user_id: userId,
        ...characterData,
      },
    ])
  if (error) throw error
  return data
}

export async function saveGeneratedImage(userId: string, imageData: any) {
  const { data, error } = await supabase
    .from('generated_images')
    .insert([
      {
        user_id: userId,
        ...imageData,
      },
    ])
  if (error) throw error
  return data
}

export async function saveMotionCapture(userId: string, motionData: any) {
  const { data, error } = await supabase
    .from('motion_captures')
    .insert([
      {
        user_id: userId,
        ...motionData,
      },
    ])
  if (error) throw error
  return data
}

export async function getCharacters(userId: string) {
  const { data, error } = await supabase
    .from('character_templates')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data
}

export async function getImages(userId: string) {
  const { data, error } = await supabase
    .from('generated_images')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data
}
