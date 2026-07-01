import { put, del } from "@vercel/blob";
import sharp from "sharp";

export interface ProcessedImage {
  url: string;
  pathname: string;
  filename: string;
  mimeType: string;
  size: number;
  width: number;
  height: number;
}

export interface ImageVariations {
  thumb: ProcessedImage;
  w800: ProcessedImage;
  w1600: ProcessedImage;
}

export async function processAndUploadImage(file: File, projectSlug: string): Promise<ImageVariations> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
  const originalName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-]/g, "");
  const baseFilename = `${originalName}-${uniqueSuffix}`;

  console.log(`[PROJECT_AUDIT] Iniciando processamento de imagem: ${file.name}`);
  const startTime = Date.now();

  // Process variants
  const [thumbBuffer, w800Buffer, w1600Buffer] = await Promise.all([
    sharp(buffer).webp({ quality: 80 }).resize({ width: 400, withoutEnlargement: true }).toBuffer(),
    sharp(buffer).webp({ quality: 85 }).resize({ width: 800, withoutEnlargement: true }).toBuffer(),
    sharp(buffer).webp({ quality: 85 }).resize({ width: 1600, withoutEnlargement: true }).toBuffer()
  ]);

  console.log(`[PROJECT_AUDIT] Upload para Vercel Blob: ${file.name}`);
  
  // Upload variants
  const [thumbBlob, w800Blob, w1600Blob] = await Promise.all([
    put(`projects/${projectSlug}/${baseFilename}-thumb.webp`, thumbBuffer, { access: 'public', contentType: 'image/webp' }),
    put(`projects/${projectSlug}/${baseFilename}-800.webp`, w800Buffer, { access: 'public', contentType: 'image/webp' }),
    put(`projects/${projectSlug}/${baseFilename}-1600.webp`, w1600Buffer, { access: 'public', contentType: 'image/webp' })
  ]);

  // Extract metadata (width, height, size) from the sharp buffers
  const [thumbMeta, w800Meta, w1600Meta] = await Promise.all([
    sharp(thumbBuffer).metadata(),
    sharp(w800Buffer).metadata(),
    sharp(w1600Buffer).metadata()
  ]);

  console.log(`[PROJECT_AUDIT] Imagem processada e upload concluído em ${Date.now() - startTime}ms`);

  return {
    thumb: {
      url: thumbBlob.url,
      pathname: thumbBlob.pathname,
      filename: `${baseFilename}-thumb.webp`,
      mimeType: 'image/webp',
      size: thumbMeta.size || 0,
      width: thumbMeta.width || 400,
      height: thumbMeta.height || 0
    },
    w800: {
      url: w800Blob.url,
      pathname: w800Blob.pathname,
      filename: `${baseFilename}-800.webp`,
      mimeType: 'image/webp',
      size: w800Meta.size || 0,
      width: w800Meta.width || 800,
      height: w800Meta.height || 0
    },
    w1600: {
      url: w1600Blob.url,
      pathname: w1600Blob.pathname,
      filename: `${baseFilename}-1600.webp`,
      mimeType: 'image/webp',
      size: w1600Meta.size || 0,
      width: w1600Meta.width || 1600,
      height: w1600Meta.height || 0
    }
  };
}

export async function deleteBlobs(pathnames: string[]) {
  if (!pathnames || pathnames.length === 0) return;
  try {
    await del(pathnames);
    console.log(`[PROJECT_AUDIT] Blobs removidos: ${pathnames.length}`);
  } catch (error) {
    console.error(`[PROJECT_AUDIT] Erro ao remover blobs:`, error);
  }
}
