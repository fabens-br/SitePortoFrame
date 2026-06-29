import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { display_order: "asc" },
        },
      },
    })

    if (!project) return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 })

    return NextResponse.json(project)
  } catch {
    return NextResponse.json({ error: "Erro ao buscar projeto" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { nome, cidade, descricao, featured, images } = body

    const cover_image = images && images.length > 0 ? images[0].image_url : null

    // Atualiza o projeto
    await prisma.project.update({
      where: { id },
      data: {
        nome,
        cidade,
        descricao,
        featured,
        cover_image,
      },
    })

    // Atualizar imagens (apagar antigas e criar novas para manter a ordem facilmente)
    await prisma.projectImage.deleteMany({
      where: { project_id: id },
    })

    if (images && images.length > 0) {
      await prisma.projectImage.createMany({
        data: images.map((img: { image_url: string }, index: number) => ({
          project_id: id,
          image_url: img.image_url,
          display_order: index,
        })),
      })
    }

    const updatedProject = await prisma.project.findUnique({
      where: { id },
      include: {
        images: { orderBy: { display_order: "asc" } },
      },
    })

    return NextResponse.json(updatedProject)
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Erro ao atualizar projeto" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Delete cascading está ativado no schema, portanto apagará as project_images automaticamente
    await prisma.project.delete({
      where: { id },
    })

    // Nota: Em um sistema robusto, deveríamos apagar os arquivos físicos do diretório public/uploads aqui.
    // Para simplificar o MVP e não correr risco de apagar arquivos errados, omitiremos a deleção do disco por enquanto.

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Erro ao excluir projeto" }, { status: 500 })
  }
}
