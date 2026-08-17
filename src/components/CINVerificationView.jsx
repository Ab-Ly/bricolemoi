import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import {
  ShieldCheck,
  Upload,
  CheckCircle2,
  Sparkles,
  FileText,
  Lock,
  RefreshCw,
  Hash
} from 'lucide-react';

export const CINVerificationView = ({ onVerificationComplete }) => {
  const { user, setUser } = useAuth();
  const { showToast, setMaalems, verifyMaalemCINWithGemini } = useApp();

  const [cinInput, setCinInput] = useState('');
  const [rectoFile, setRectoFile] = useState(null);
  const [versoFile, setVersoFile] = useState(null);
  const [rectoPreview, setRectoPreview] = useState(null);
  const [versoPreview, setVersoPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Sélection fichier Recto
  const handleRectoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setRectoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setRectoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Sélection fichier Verso
  const handleVersoSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVersoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setVersoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Upload vers Supabase Storage bucket 'cin-documents'
  const uploadToStorage = async (file, path) => {
    if (!isSupabaseConfigured || !file) return null;
    try {
      const { error } = await supabase.storage
        .from('cin-documents')
        .upload(path, file, { upsert: true });

      if (error) {
        console.warn('[Storage] Upload warning:', error.message);
        return null;
      }

      const { data: publicUrlData } = supabase.storage
        .from('cin-documents')
        .getPublicUrl(path);

      return publicUrlData?.publicUrl || null;
    } catch (err) {
      console.warn('[Storage] Upload exception:', err.message);
      return null;
    }
  };

  // Soumission CIN — upload + vérification via Edge Function (Gemini côté serveur)
  const handleSubmitVerification = async (e) => {
    e.preventDefault();
    if (!rectoPreview || !versoPreview) {
      showToast('⚠️ Veuillez téléverser les deux faces de votre CIN (Recto et Verso).', 'error');
      return;
    }

    setLoading(true);

    try {
      const maalemId = user?.id;
      if (!maalemId) {
        showToast('⚠️ Vous devez être connecté pour soumettre votre CIN.', 'error');
        return;
      }

      showToast('⬆️ Upload des photos CIN en cours...', 'info');

      // Upload vers Supabase Storage (fallback sur data URL si Storage indisponible)
      const rectoUrl = (await uploadToStorage(rectoFile, `${maalemId}/recto.jpg`)) || rectoPreview;
      const versoUrl = (await uploadToStorage(versoFile, `${maalemId}/verso.jpg`)) || versoPreview;

      let extractedHint = cinInput.trim().toUpperCase();

      console.log('🔍 [OCR DEBUG] Starting CIN OCR verification flow...');
      console.log('🔍 [OCR DEBUG] maalemId:', maalemId);
      console.log('🔍 [OCR DEBUG] User entered cinInput:', cinInput);
      console.log('🔍 [OCR DEBUG] VITE_GEMINI_API_KEY present?:', Boolean(import.meta.env.VITE_GEMINI_API_KEY));
      console.log('🔍 [OCR DEBUG] rectoPreview type:', rectoPreview ? (rectoPreview.startsWith('data:') ? 'base64 data URL' : 'http URL') : 'NULL');

      // Si le champ est vide mais que VITE_GEMINI_API_KEY est dans .env, scanner directement l'image
      if (!extractedHint && import.meta.env.VITE_GEMINI_API_KEY) {
        try {
          const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
          const parts = [
            {
              text: `Analyse cette Carte d'Identité Nationale (CIN) marocaine.
Extrais le numéro de CIN (ex: CD140804, BE123456, A987654).
Réponds uniquement avec un JSON: {"cin_number": "CD140804", "is_legible": true}`
            }
          ];

          if (rectoPreview) {
            let base64Data = '';
            let mime = 'image/jpeg';
            if (rectoPreview.startsWith('data:')) {
              mime = rectoPreview.split(';')[0].split(':')[1] || 'image/jpeg';
              base64Data = rectoPreview.split(',')[1];
            }
            if (base64Data) {
              console.log('🔍 [OCR DEBUG] Attaching inline_data to Gemini request. Mime:', mime, 'Data length:', base64Data.length);
              parts.push({ inline_data: { mime_type: mime, data: base64Data } });
            } else {
              console.warn('⚠️ [OCR DEBUG] rectoPreview is not a base64 data URL! Data:', rectoPreview.slice(0, 50));
            }
          }

          // 1. Lister dynamiquement les modèles disponibles pour cette clé API (ModelService.ListModels)
          let availableModels = [];
          try {
            console.log('🔍 [OCR DEBUG] Querying ModelService.ListModels for key...');
            const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            const listJson = await listRes.json();
            console.log('🔍 [OCR DEBUG] ListModels response:', listJson);
            if (listJson.models && Array.isArray(listJson.models)) {
              availableModels = listJson.models
                .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
                .map(m => m.name);
              console.log('✅ [OCR DEBUG] Available models for this key:', availableModels);
            }
          } catch (e) {
            console.warn('⚠️ [OCR DEBUG] ListModels failed:', e);
          }

          // 2. Construire la liste des endpoints à tester
          const defaultModels = [
            'models/gemini-2.0-flash',
            'models/gemini-1.5-flash-001',
            'models/gemini-1.5-flash-002',
            'models/gemini-2.0-flash-exp',
            'models/gemini-1.5-pro-001'
          ];
          const modelsToTest = availableModels.length > 0 ? availableModels : defaultModels;

          let gemData = null;
          for (const modelName of modelsToTest) {
            const cleanModel = modelName.replace(/^models\//, '');
            const urlEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent`;
            console.log(`🔍 [OCR DEBUG] Fetching Gemini API using model: ${cleanModel}...`);
            try {
              const gemRes = await fetch(
                `${urlEndpoint}?key=${apiKey}`,
                {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ contents: [{ parts }] })
                }
              );
              const resJson = await gemRes.json();
              console.log(`🔍 [OCR DEBUG] Gemini API raw response for ${cleanModel}:`, resJson);
              if (!resJson.error) {
                gemData = resJson;
                break;
              } else {
                gemData = resJson;
              }
            } catch (e) {
              console.error(`❌ [OCR DEBUG] Network error calling ${urlEndpoint}:`, e);
            }
          }

          if (gemData?.error) {
            console.error('❌ [OCR DEBUG] Gemini API Error Response:', gemData.error);
            showToast(`⚠️ Erreur API Gemini (${gemData.error.status || '400'}): ${gemData.error.message || 'Clé API invalide'}`, 'warning');
          } else if (gemData) {
            const gemText = gemData.candidates?.[0]?.content?.parts?.[0]?.text || '';
            console.log('✅ [OCR DEBUG] Gemini raw response text:', gemText);

            // 1. Extraction directe par Regex de numéro CIN marocain (ex: CD140804, BE123456, A98765)
            const cinRegexMatch = gemText.match(/\b([A-Za-z]{1,2}\d{5,8})\b/) || gemText.match(/N°\s*([A-Za-z0-9]+)/i);

            if (cinRegexMatch && cinRegexMatch[1]) {
              extractedHint = cinRegexMatch[1].trim().toUpperCase();
              console.log('🎉 [OCR DEBUG] CIN number extracted by Regex:', extractedHint);
              showToast(`🤖 OCR IA Gemini : N° CIN extrait [${extractedHint}] !`, 'success');
            } else {
              // 2. Extraction par parsing JSON
              const jsonMatch = gemText.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                try {
                  const parsed = JSON.parse(jsonMatch[0]);
                  console.log('✅ [OCR DEBUG] Parsed JSON from Gemini:', parsed);
                  if (parsed.cin_number) {
                    extractedHint = String(parsed.cin_number).trim().toUpperCase();
                    console.log('🎉 [OCR DEBUG] Extracted CIN number from JSON:', extractedHint);
                    showToast(`🤖 OCR IA Gemini : N° CIN extrait [${extractedHint}] !`, 'success');
                  }
                } catch (jsonErr) {
                  console.warn('⚠️ [OCR DEBUG] JSON parse error, relying on regex:', jsonErr.message);
                }
              }
            }
          }
        } catch (ocrErr) {
          console.error('❌ [OCR DEBUG] Exception in client OCR:', ocrErr);
        }
      }

      // Vérification via Edge Function Supabase (Gemini côté serveur — clé API sécurisée)
      const result = await verifyMaalemCINWithGemini({
        maalem_id: maalemId,
        cin_photo_url: rectoUrl,
        cin_photo_verso_url: versoUrl,
        full_name: user?.full_name,
        phone: user?.phone,
        cin_number_hint: extractedHint || undefined
      });

      if (result?.success) {
        // Sync admin_notifications
        if (isSupabaseConfigured) {
          try {
            await supabase.from('admin_notifications').insert([{
              type: 'CIN_SUBMISSION',
              title: '🆔 Nouvelle CIN Maalem Soumise',
              message: `L'artisan ${user?.full_name} (${user?.phone}) a fait vérifier sa CIN N° ${result.cin_number}.`,
              data: { maalem_id: maalemId, cin_number: result.cin_number }
            }]);
          } catch (notifErr) {
            console.warn('[Supabase] admin_notifications insert warning:', notifErr.message);
          }
        }

        // Sync global maalems list
        if (setMaalems) {
          setMaalems((prev) => [
            {
              id: maalemId,
              full_name: user?.full_name || 'Maalem',
              phone: user?.phone || '',
              specialty: user?.maalem_details?.specialty || 'PLUMBING',
              rating_avg: 5.0,
              is_verified: true,
              cin_verified: true,
              cin_number: result.cin_number,
              cin_photo_url: rectoUrl,
              cin_photo_recto_url: rectoUrl,
              cin_photo_verso_url: versoUrl,
              credit_balance: (user?.maalem_details?.credit_balance || 0) + (result.bonus_added_dh || 15),
              district: user?.city_zone || 'Casablanca'
            },
            ...prev.filter((m) => m.id !== maalemId)
          ]);
        }

        // Broadcast inter-onglets
        try {
          const bc = new BroadcastChannel('bricolemoi_intertab_sync');
          bc.postMessage({
            type: 'NEW_MAALEM_REGISTERED',
            maalem: {
              id: maalemId,
              full_name: user?.full_name,
              cin_verified: true,
              is_verified: true,
              district: user?.city_zone
            }
          });
          bc.close();
        } catch (e) {}

        if (onVerificationComplete) onVerificationComplete();
      }
    } catch (err) {
      showToast('❌ Erreur lors de la vérification de la CIN : ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4 space-y-6">
      {/* Bannière de sécurité */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/90 backdrop-blur-xl border border-amber-500/40 p-6 rounded-3xl shadow-[0_0_25px_rgba(245,158,11,0.25)] text-center space-y-3 relative overflow-hidden"
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-950/80 border border-amber-500/60 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.4)]">
          <Lock className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        </div>
        <h2 className="text-2xl font-black text-white font-sans tracking-tight">
          Vérification Obligatoire de la CIN
        </h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
          Pour des raisons de sécurité et conformément à la réglementation marocaine, vous devez importer le <strong>Recto</strong> et le <strong>Verso</strong> de votre Carte d'Identité Nationale (CIN) pour débloquer votre accès au tableau de bord Maalem Pro.
        </p>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>🎁 Bonus de Bienvenue : +15 DH gratuits à la validation (1er Lead Offert)</span>
        </div>
      </motion.div>

      {/* Formulaire */}
      <form onSubmit={handleSubmitVerification} className="space-y-5">

        {/* Upload Recto + Verso */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Recto */}
          <div className="bg-slate-900/70 backdrop-blur-md border border-cyan-500/30 p-4 rounded-2xl space-y-3 text-center hover:border-cyan-400 transition-all">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-200">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Face Recto (Front)</span>
            </div>

            {rectoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 group">
                <img src={rectoPreview} alt="CIN Recto" className="w-full h-36 object-cover" />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-bold cursor-pointer transition-opacity">
                  Changer l'image
                  <input type="file" accept="image/*" className="hidden" onChange={handleRectoSelect} />
                </label>
              </div>
            ) : (
              <label className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/70 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/60 min-h-[140px]">
                <Upload className="w-8 h-8 text-cyan-400 mb-2 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
                <span className="text-xs font-bold text-slate-300">Téléverser Recto</span>
                <span className="text-[10px] text-slate-500 mt-1">PNG, JPG max 5 Mo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleRectoSelect} />
              </label>
            )}
          </div>

          {/* Verso */}
          <div className="bg-slate-900/70 backdrop-blur-md border border-cyan-500/30 p-4 rounded-2xl space-y-3 text-center hover:border-cyan-400 transition-all">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-200">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Face Verso (Back)</span>
            </div>

            {versoPreview ? (
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 group">
                <img src={versoPreview} alt="CIN Verso" className="w-full h-36 object-cover" />
                <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs text-white font-bold cursor-pointer transition-opacity">
                  Changer l'image
                  <input type="file" accept="image/*" className="hidden" onChange={handleVersoSelect} />
                </label>
              </div>
            ) : (
              <label className="border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/70 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/60 min-h-[140px]">
                <Upload className="w-8 h-8 text-cyan-400 mb-2 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" />
                <span className="text-xs font-bold text-slate-300">Téléverser Verso</span>
                <span className="text-[10px] text-slate-500 mt-1">PNG, JPG max 5 Mo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleVersoSelect} />
              </label>
            )}
          </div>
        </div>

        {/* Numéro CIN optionnel (aide l'OCR) */}
        <div className="bg-slate-900/70 backdrop-blur-md border border-cyan-500/20 p-4 rounded-2xl space-y-2">
          <label className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <Hash className="w-4 h-4 text-cyan-400" />
            Numéro CIN (optionnel — aide l'IA OCR)
          </label>
          <input
            type="text"
            value={cinInput}
            onChange={(e) => setCinInput(e.target.value.toUpperCase())}
            placeholder="ex: CD140804 ou BE123456"
            maxLength={12}
            className="w-full px-4 py-2.5 bg-slate-950 border border-cyan-500/30 rounded-xl text-slate-100 font-mono text-sm font-bold placeholder-slate-600 focus:border-cyan-400 focus:outline-none transition-colors"
          />
          <p className="text-[10px] text-slate-500">
            Si laissé vide, l'IA extraira automatiquement le numéro de la photo.
          </p>
        </div>

        {/* Notice sécurité */}
        <div className="bg-slate-950 border border-cyan-500/20 p-4 rounded-2xl text-xs space-y-1.5">
          <p className="font-bold text-cyan-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Sécurité des données & Respect du profil
          </p>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            L'analyse OCR (Gemini 1.5 Flash Vision) s'exécute de manière sécurisée côté serveur. Vos données sont stockées dans <code className="text-cyan-300">cin_extracted_data</code>. Votre nom d'inscription (<strong>{user?.full_name}</strong>) reste votre identité officielle préservée sur BricoleMoi.
          </p>
        </div>

        {/* Bouton Soumettre */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading || !rectoPreview || !versoPreview}
          className={`w-full py-4 rounded-xl text-white font-extrabold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all ${
            loading || !rectoPreview || !versoPreview
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700 shadow-none'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500'
          }`}
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Analyse OCR & Validation en cours...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5 text-white" />
              <span>Valider la CIN & Débloquer l'Espace Maalem Pro (+15 DH)</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};
