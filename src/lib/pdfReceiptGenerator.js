/**
 * Générateur de Reçus PDF / Bordereaux Officiels BricoleMoi Maroc
 */

export const generateReceiptPDF = (tx, maalems = [], user = null) => {
  const targetMaalem = maalems?.find((m) => m.id === tx.maalem_id) || (user?.id === tx.maalem_id ? user : null);
  const maalemFullName = targetMaalem?.full_name || tx.maalem_name || (user?.id === tx.maalem_id ? user?.full_name : 'Artisan Maâlem');
  const maalemPhone = targetMaalem?.phone || tx.maalem_phone || user?.phone || 'Non renseigné';
  const maalemSpecialty = targetMaalem?.specialty || user?.maalem_details?.specialty || 'Dépannage & Travaux Express';
  const maalemCIN = targetMaalem?.cin_number || user?.cin_number || user?.maalem_details?.cin_number || 'Vérifiée';

  const receiptWindow = window.open('', '_blank');
  if (!receiptWindow) {
    if (typeof window !== 'undefined' && window.alert) {
      window.alert('⚠️ Veuillez autoriser les fenêtres surgissantes pour ouvrir le reçu PDF.');
    }
    return;
  }

  receiptWindow.document.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Reçu de Paiement - ${maalemFullName} - BricoleMoi Maroc</title>
      <style>
        body { font-family: 'Inter', system-ui, -apple-system, sans-serif; padding: 40px; color: #0f172a; background: #ffffff; margin: 0; }
        .header { border-bottom: 2px solid #0f172a; padding-bottom: 20px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; }
        .logo { font-size: 24px; font-weight: 900; color: #0284c7; }
        .badge { background: #059669; color: #ffffff; padding: 6px 16px; border-radius: 999px; font-size: 13px; font-weight: 800; }
        .details { background: #f8fafc; border: 1px solid #cbd5e1; padding: 24px; border-radius: 16px; margin-bottom: 24px; }
        .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; }
        .row span { color: #64748b; font-weight: 500; }
        .row strong { color: #0f172a; font-weight: 700; }
        .total { font-size: 22px; font-weight: 900; color: #0284c7; padding-top: 16px; border-top: 2px solid #cbd5e1; margin-top: 12px; }
        .footer { text-align: center; font-size: 11px; color: #64748b; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo">🛠️ BricoleMoi Maroc</div>
          <div style="font-size: 13px; color: #64748b; margin-top: 4px;">Bordereau Officiel de Rapprochement & Crédit de Solde</div>
        </div>
        <div class="badge">VALIDÉ & CRÉDITÉ 🟢</div>
      </div>

      <div class="details">
        <div class="row"><span>Numéro de Transaction :</span><strong>${tx.id}</strong></div>
        <div class="row"><span>Nom & Prénom Artisan :</span><strong style="color: #0284c7; font-size: 15px;">${maalemFullName}</strong></div>
        <div class="row"><span>Téléphone Artisan :</span><strong>${maalemPhone}</strong></div>
        <div class="row"><span>Spécialité :</span><strong>${maalemSpecialty}</strong></div>
        <div class="row"><span>Numéro CIN :</span><strong>${maalemCIN}</strong></div>
        <div class="row"><span>Mode de Paiement :</span><strong>${tx.payment_method}</strong></div>
        <div class="row"><span>Référence Bordereau :</span><strong style="font-family: monospace;">${tx.reference_ref}</strong></div>
        <div class="row"><span>Date & Heure :</span><strong>${new Date(tx.created_at || Date.now()).toLocaleString('fr-FR')}</strong></div>
        <div class="row total"><span>Montant Encaissé / Crédité :</span><strong>+${Number(tx.amount_dh).toFixed(2)} DH</strong></div>
      </div>

      <p style="font-size: 12px; color: #475569; line-height: 1.6;">
        Le présent reçu certifie le paiement effectif et le crédit immédiat de ${Number(tx.amount_dh).toFixed(2)} DH sur le compte de l'artisan <strong>${maalemFullName}</strong> pour la réception des interventions SOS sur la plateforme BricoleMoi Maroc.
      </p>

      <div class="footer">
        BricoleMoi Maroc SARL • Registre de Commerce & Rapprochement Bancaire Casablanca • Contact : compta@bricolemoi.ma
      </div>

      <script>
        window.onload = function() { window.print(); };
      </script>
    </body>
  </html>
  `);
  receiptWindow.document.close();
};

export default generateReceiptPDF;
