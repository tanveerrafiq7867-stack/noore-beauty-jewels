import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qtjbmearsaelugvxeogg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_mTbnubUGNBcx3ZMw2xyDxw_etyVtt8d'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
