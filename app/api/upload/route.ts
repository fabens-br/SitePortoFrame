import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import sharp from "sharp"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Diretórios base
    const uploadDir = path.join(process.cwd(), "public", "uploads", "projects")
    const thumbDir = path.join(uploadDir, "thumbs")

    // Garantir que diretórios existam
    await fs.mkdir(uploadDir, { recursive: true })
    await fs.mkdir(thumbDir, { recursive: true })

    // Gerar nome único
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const originalName = file.name.replace(/\.[^/.]+$/, "") // remove extensão
    const filename = `${originalName}-${uniqueSuffix}.webp`
    const filepath = path.join(uploadDir, filename)
    const thumbpath = path.join(thumbDir, filename)

    // Converter e otimizar para WebP (Imagem principal)
    await sharp(buffer)
      .webp({ quality: 85 })
      .resize({ width: 1920, withoutEnlargement: true }) // limite máximo de largura
      .toFile(filepath)

    // Gerar Thumbnail WebP
    await sharp(buffer)
      .webp({ quality: 80 })
      .resize({ width: 400, withoutEnlargement: true }) // miniatura
      .toFile(thumbpath)

    const url = `/uploads/projects/${filename}`
    const thumbUrl = `/uploads/projects/thumbs/${filename}`

    return NextResponse.json({ success: true, url, thumbUrl })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Erro ao processar imagem" }, { status: 500 })
  }
}
