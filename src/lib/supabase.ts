import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(url, key)

export type Market = {
  id: string
  title: string
  description: string
  category: string
  end_date: string
  yes_price: number
  no_price: number
  volume: number
  resolved: boolean
  outcome: string | null
  created_at: string
}