import { createClient } from '@supabase/supabase-js';

// External Supabase client for the user's own database
const EXTERNAL_SUPABASE_URL = "https://unpqekghcpjclzvpeyse.supabase.co";
const EXTERNAL_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVucHFla2doY3BqY2x6dnBleXNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4MzI2NTQsImV4cCI6MjA5MjQwODY1NH0._BVfEKiP5pbBNVBWwwuagoswj0E7GQOLCk55LkXdr8s";

export const externalSupabase = createClient(EXTERNAL_SUPABASE_URL, EXTERNAL_SUPABASE_ANON_KEY);
