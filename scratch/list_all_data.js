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

async function listAll() {
  const { data: profiles } = await supabase.from('profiles').select('*');
  console.log('=== ALL PROFILES (' + (profiles?.length || 0) + ') ===');
  profiles?.forEach(p => {
    console.log(`- ID: ${p.id} | Name: ${p.full_name} | Role: ${p.role} | Phone: ${p.phone} | Created: ${p.created_at}`);
  });

  const { data: interventions } = await supabase.from('interventions').select('*');
  console.log('\n=== ALL INTERVENTIONS (' + (interventions?.length || 0) + ') ===');
  interventions?.forEach(i => {
    console.log(`- ID: ${i.id} | Service: ${i.service_type} | Sub: ${i.subcategory} | Status: ${i.status} | Client: ${i.client_name} (${i.client_phone}) | Maalem: ${i.maalem_name} | Created: ${i.created_at}`);
  });

  const { data: transactions } = await supabase.from('transactions').select('*');
  console.log('\n=== ALL TRANSACTIONS (' + (transactions?.length || 0) + ') ===');
  transactions?.forEach(t => {
    console.log(`- ID: ${t.id} | Type: ${t.type} | Amount: ${t.amount_dh} DH | Method: ${t.payment_method} | Status: ${t.status} | Ref: ${t.reference_ref}`);
  });

  const { data: reviews } = await supabase.from('reviews').select('*');
  console.log('\n=== ALL REVIEWS (' + (reviews?.length || 0) + ') ===');
  reviews?.forEach(r => {
    console.log(`- ID: ${r.id} | Rating: ${r.rating}* | Comment: ${r.comment} | IntvID: ${r.intervention_id}`);
  });
}

listAll().catch(console.error);
