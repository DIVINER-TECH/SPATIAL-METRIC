import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || (import.meta as any).env?.VITE_SUPABASE_URL_PUBLIC
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY_PUBLIC

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase env vars: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
