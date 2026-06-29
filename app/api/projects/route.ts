import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

// Função simples de slugify
function slugify(text: string) {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { created_at: "desc" },
      include: {
        images: {
          orderBy: { display_order: "asc" },
        },
      },
    })
    return NextResponse.json(projects)
  } catch {
    return NextResponse.json({ error: "Erro ao buscar projetos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nome, cidade, descricao, featured, images } = body

    if (!nome || !cidade) {
      return NextResponse.json({ error: "Nome e cidade são obrigatórios" }, { status: 400 })
    }

    let slug = slugify(nome)
    
    // Garantir slug único
    let slugExists = await prisma.project.findUnique({ where: { slug } })
    let counter = 1
    while (slugExists) {
      slug = `${slugify(nome)}-${counter}`
      slugExists = await prisma.project.findUnique({ where: { slug } })
      counter++
    }

    const cover_image = images && images.length > 0 ? images[0].image_url : null

    const project = await prisma.project.create({
      data: {
        nome,
        slug,
        cidade,
        descricao: descricao || "",
        featured: featured || false,
        cover_image,
        images: {
          create: images?.map((img: { image_url: string }, index: number) => ({
            image_url: img.image_url,
            display_order: index,
          })) || [],
        },
      },
      include: {
        images: true,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json({ error: "Erro ao criar projeto" }, { status: 500 })
  }
}
