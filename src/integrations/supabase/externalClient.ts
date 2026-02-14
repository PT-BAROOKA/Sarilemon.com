import { createClient } from '@supabase/supabase-js';

// External Supabase client for the user's own database
const EXTERNAL_SUPABASE_URL = "https://wfthvovlhphnrodrqxqt.supabase.co";
const EXTERNAL_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmdGh2b3ZsaHBobnJvZHJxeHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNTU1NjYsImV4cCI6MjA3MzgzMTU2Nn0.cXHWZbabCY93LbzgCgle9lVOW407MPV4jrtw1BuPkHo";

export const externalSupabase = createClient(EXTERNAL_SUPABASE_URL, EXTERNAL_SUPABASE_ANON_KEY);
