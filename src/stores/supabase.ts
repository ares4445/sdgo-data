import { defineStore } from 'pinia'
import { createClient } from '@supabase/supabase-js'

export const useSupabase = defineStore('supabase', {
  state: () => ({
    supabase: createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY),
  }),
})
