/**
 * Service de stockage Cloudflare R2 pour BricoleMoi (Stockage 0€ Egress)
 * Intègre la compression automatique WebP côté client et le téléversement direct vers R2.
 */

const R2_PUBLIC_DOMAIN = (import.meta.env.VITE_R2_PUBLIC_DOMAIN || 'https://pub-e32b5a8e3eb24da59b44606366d761d7.r2.dev').replace(/\/$/, '');

/**
 * Compresse une image côté client au format WebP (1200px max, qualité 80%)
 * Réduit les photos de smartphones de 5 Mo à moins de 200 Ko avant envoi.
 * @param {File|Blob|string} imageInput 
 * @param {number} maxWidth 
 * @param {number} quality 
 * @returns {Promise<{ dataUrl: string, size: number, width: number, height: number }>}
 */
export async function compressImageToWebP(imageInput, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    let src = '';
    let isDataUrl = false;

    if (typeof imageInput === 'string') {
      src = imageInput;
      isDataUrl = true;
    } else if (imageInput instanceof Blob || imageInput instanceof File) {
      src = URL.createObjectURL(imageInput);
    } else {
      return reject(new Error('Invalid image input type'));
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      if (!isDataUrl && src.startsWith('blob:')) {
        URL.revokeObjectURL(src);
      }

      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Canvas context unavailable'));
      }

      // Dessin avec lissage haute qualité
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      // Exportation en WebP léger
      const dataUrl = canvas.toDataURL('image/webp', quality);
      const approximateSize = Math.round((dataUrl.length * 3) / 4);

      resolve({
        dataUrl,
        size: approximateSize,
        width,
        height
      });
    };

    img.onerror = (err) => {
      if (!isDataUrl && src.startsWith('blob:')) {
        URL.revokeObjectURL(src);
      }
      reject(err);
    };

    img.src = src;
  });
}

/**
 * Convertit un Blob audio ou fichier en Data URL
 */
export async function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Téléverse un fichier (image, audio, document) vers Cloudflare R2
 * @param {File|Blob|string} fileOrBlob 
 * @param {string} folder Dossier de destination ('interventions', 'cin', 'avatars', 'portfolio')
 * @returns {Promise<string>} L'URL publique CDN du fichier hébergé sur R2
 */
export async function uploadMediaToR2(fileOrBlob, folder = 'interventions') {
  if (!fileOrBlob) return null;

  try {
    let payload = {
      folder,
      contentType: 'image/webp',
      dataUrl: null
    };

    // 1. Détection du type et compression si c'est une image
    const isAudio = (fileOrBlob.type && fileOrBlob.type.startsWith('audio/')) || (typeof fileOrBlob === 'string' && fileOrBlob.startsWith('data:audio/'));

    if (isAudio) {
      if (typeof fileOrBlob === 'string') {
        payload.dataUrl = fileOrBlob;
      } else {
        payload.dataUrl = await blobToDataUrl(fileOrBlob);
      }
      payload.contentType = fileOrBlob.type || 'audio/webm';
    } else {
      // C'est une image : compression WebP systématique
      try {
        const compressed = await compressImageToWebP(fileOrBlob, 1200, 0.82);
        payload.dataUrl = compressed.dataUrl;
        payload.contentType = 'image/webp';
      } catch (compErr) {
        console.warn('[R2 Storage] Échec compression WebP, utilisation du fallback direct:', compErr);
        if (typeof fileOrBlob === 'string') {
          payload.dataUrl = fileOrBlob;
        } else {
          payload.dataUrl = await blobToDataUrl(fileOrBlob);
        }
      }
    }

    // 2. Appel du endpoint serverless Vercel / Cloudflare R2
    const res = await fetch('/api/upload-media', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.url) {
        console.log(`[R2 Storage] Média téléversé avec succès sur Cloudflare R2 (${folder}):`, data.url);
        return data.url;
      }
    }

    console.warn('[R2 Storage] Réponse API inattendue, utilisation du fallback URL locale.');
    return payload.dataUrl;

  } catch (err) {
    console.error('[R2 Storage Upload Error]:', err);
    // Fallback gracieux en DataURL pour ne jamais bloquer l'expérience utilisateur
    if (typeof fileOrBlob === 'string') return fileOrBlob;
    try {
      return await blobToDataUrl(fileOrBlob);
    } catch {
      return null;
    }
  }
}
