import { createClient } from '@supabase/supabase-js'

function getSupabaseClient() {
  if ((window as any).__SUPABASE_CLIENT__) {
    return (window as any).__SUPABASE_CLIENT__
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || (window as any).__YURSERVICE_SUPABASE_URL__
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || (window as any).__YURSERVICE_SUPABASE_ANON_KEY__

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing env variables. Please check your .env file.')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = getSupabaseClient()

