import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://cpvmuthokkspsthpbxrv.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwdm11dGhva2tzcHN0aHBieHJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1Mzc4NzMsImV4cCI6MjEwMjExMzg3M30.RjBaKurGstN9b-mrtz9pMQRtMAnPJh13EVSdNw1Ue4c';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
