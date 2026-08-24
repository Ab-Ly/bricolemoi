// Vercel Serverless Function: Upload Direct Média vers Cloudflare R2 (Stockage 0€ Egress)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID || "e327e1ad7dc1227cc1d7b88cd42c49f0";
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || "a27831bad83c8d5eef881966abdaa17c";
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || "de121a68fdb914c87de659d616c66d62c309964c8ef55f7ed3ce3b85c165acfa";
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || "bricolemoi-media";
const R2_PUBLIC_DOMAIN = (process.env.R2_PUBLIC_DOMAIN || process.env.VITE_R2_PUBLIC_DOMAIN || "https://pub-e32b5a8e3eb24da59b44606366d761d7.r2.dev").replace(/\/$/, "");

// Initialisation du client S3 pour Cloudflare R2
const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY
  }
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb"
    }
  }
};

export default async function handler(req, res) {
  // En-têtes CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { 
      dataUrl, 
      base64, 
      folder = "interventions", 
      contentType = "image/webp" 
    } = req.body || {};

    if (!dataUrl && !base64) {
      return res.status(400).json({ success: false, error: "Missing dataUrl or base64 payload" });
    }

    let buffer;
    let detectedContentType = contentType;

    if (dataUrl && dataUrl.startsWith("data:")) {
      const parts = dataUrl.split(",");
      const mimeMatch = parts[0].match(/:(.*?);/);
      if (mimeMatch) {
        detectedContentType = mimeMatch[1];
      }
      buffer = Buffer.from(parts[1], "base64");
    } else if (base64) {
      buffer = Buffer.from(base64, "base64");
    } else {
      return res.status(400).json({ success: false, error: "Invalid data format" });
    }

    // Déterminer l'extension appropriée
    let ext = "webp";
    if (detectedContentType.includes("jpeg") || detectedContentType.includes("jpg")) ext = "jpg";
    else if (detectedContentType.includes("png")) ext = "png";
    else if (detectedContentType.includes("webm")) ext = "webm";
    else if (detectedContentType.includes("ogg")) ext = "ogg";
    else if (detectedContentType.includes("mp4") || detectedContentType.includes("m4a")) ext = "m4a";
    else if (detectedContentType.includes("audio")) ext = "webm";

    // Générer une clé d'objet unique et sécurisée
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 9);
    const sanitizedFolder = String(folder).replace(/[^a-zA-Z0-9_-]/g, "");
    const key = `${sanitizedFolder}/${timestamp}-${randomSuffix}.${ext}`;

    // Commande de téléversement vers Cloudflare R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: detectedContentType,
      CacheControl: "public, max-age=31536000, immutable"
    });

    await s3Client.send(command);

    const publicUrl = `${R2_PUBLIC_DOMAIN}/${key}`;

    return res.status(200).json({
      success: true,
      url: publicUrl,
      key,
      size: buffer.length,
      contentType: detectedContentType
    });

  } catch (error) {
    console.error("[API Upload-Media R2 Error]:", error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || "Failed to upload file to Cloudflare R2" 
    });
  }
}
