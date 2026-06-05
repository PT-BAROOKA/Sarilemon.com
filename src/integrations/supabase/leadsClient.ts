import { createClient } from '@supabase/supabase-js';

// Leads Supabase client — separate project (wfthv) for lead capture only.
// Blog/autoblog stay on the main project (see client.ts / externalClient.ts).
const LEADS_SUPABASE_URL = process.env.NEXT_PUBLIC_LEADS_SUPABASE_URL!;
const LEADS_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_LEADS_SUPABASE_PUBLISHABLE_KEY!;

export const leadsSupabase = createClient(LEADS_SUPABASE_URL, LEADS_SUPABASE_ANON_KEY);
