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

const supabase = createClient(envVars.VITE_SUPABASE_URL, envVars.VITE_SUPABASE_ANON_KEY);

async function inspectFinances() {
  const { data: transactions } = await supabase.from('transactions').select('*');
  const { data: maalems } = await supabase.from('maalem_details').select('*');
  const { data: interventions } = await supabase.from('interventions').select('*');

  console.log('=== TRANSACTIONS (' + (transactions?.length || 0) + ') ===');
  console.table(transactions?.map(t => ({
    id: t.id?.slice(0, 8),
    type: t.type,
    amount_dh: t.amount_dh,
    status: t.status,
    method: t.payment_method,
    ref: t.reference_ref,
    maalem_id: t.maalem_id?.slice(0, 8)
  })));

  console.log('=== MAALEMS (' + (maalems?.length || 0) + ') ===');
  console.table(maalems?.map(m => ({
    id: m.id?.slice(0, 8),
    credit_balance: m.credit_balance,
    specialty: m.specialty,
    rating: m.rating,
    reviews_count: m.reviews_count
  })));

  console.log('=== INTERVENTIONS (' + (interventions?.length || 0) + ') ===');
  console.table(interventions?.map(i => ({
    id: i.id?.slice(0, 8),
    status: i.status,
    service_type: i.service_type,
    price: i.price,
    final_agreed_price: i.final_agreed_price,
    rating: i.rating
  })));
}

inspectFinances().then(() => process.exit(0));
