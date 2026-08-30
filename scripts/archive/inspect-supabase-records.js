import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
const envVars = {};
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      envVars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
    }
  });
}

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);

async function inspect() {
  const [
    { data: profiles },
    { data: maalemDetails },
    { data: interventions },
    { data: transactions },
    { data: reviews }
  ] = await Promise.all([
    supabase.from('profiles').select('*'),
    supabase.from('maalem_details').select('*'),
    supabase.from('interventions').select('*'),
    supabase.from('transactions').select('*'),
    supabase.from('reviews').select('*')
  ]);

  console.log('--- SAMPLE PROFILES ---', profiles?.slice(0, 2));
  console.log('--- SAMPLE MAALEM_DETAILS ---', maalemDetails?.slice(0, 1));
  console.log('--- SAMPLE INTERVENTIONS ---', interventions?.slice(0, 2));
  console.log('--- SAMPLE TRANSACTIONS ---', transactions?.slice(0, 2));
  console.log('--- SAMPLE REVIEWS ---', reviews?.slice(0, 2));
}

inspect();
