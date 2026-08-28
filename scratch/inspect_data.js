import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
const envVars = {};

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      envVars[key] = val;
    }
  });
}

const SUPABASE_URL = envVars.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = envVars.SUPABASE_SERVICE_ROLE_KEY || envVars.VITE_SUPABASE_SERVICE_ROLE_KEY || envVars.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function inspect() {
  console.log('=== PROFILES ===');
  const { data: profiles, error: pErr } = await supabase.from('profiles').select('*');
  console.log(JSON.stringify(profiles, null, 2));

  console.log('=== MAALEM DETAILS ===');
  const { data: maalemDetails } = await supabase.from('maalem_details').select('*');
  console.log(JSON.stringify(maalemDetails, null, 2));

  console.log('=== INTERVENTIONS ===');
  const { data: interventions } = await supabase.from('interventions').select('*');
  console.log(JSON.stringify(interventions, null, 2));

  console.log('=== TRANSACTIONS ===');
  const { data: transactions } = await supabase.from('transactions').select('*');
  console.log(JSON.stringify(transactions, null, 2));

  console.log('=== REVIEWS ===');
  const { data: reviews } = await supabase.from('reviews').select('*');
  console.log(JSON.stringify(reviews, null, 2));

  console.log('=== ADMIN NOTIFICATIONS ===');
  const { data: notifications } = await supabase.from('admin_notifications').select('*');
  console.log(JSON.stringify(notifications, null, 2));
}

inspect().catch(console.error);
