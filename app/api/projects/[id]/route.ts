import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { processAndUploadImage, deleteBlobs } from "@/lib/upload"
import { revalidatePath, revalidateTag } from "next/cache"

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
  const startTime = Date.now();
  const { id } = await params
  console.log(`[PROJECT_AUDIT] Iniciando edição do projeto ID: ${id}`);
  
  const uploadedPathnames: string[] = [];

  try {
    const formData = await request.formData();
    const nome = formData.get("nome") as string;
    const cidade = formData.get("cidade") as string;
    const descricao = formData.get("descricao") as string;
    const featured = formData.get("featured") === 'true';
    const published = formData.get("published") === 'true';
    const status = (formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED";
    const existingImagesJson = formData.get("existingImages") as string;
    
    // Parse existing images array: [{ id, url, display_order }]
    const existingImages = existingImagesJson ? JSON.parse(existingImagesJson) : [];
    
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });

    const files = formData.getAll("newImages") as File[];
    const processedNewImagesData = [];

    if (files && files.length > 0) {
      console.log(`[PROJECT_AUDIT] Processando ${files.length} NOVAS imagens...`);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file instanceof File) {
          try {
            const variations = await processAndUploadImage(file, project.slug);
            uploadedPathnames.push(
              variations.thumb.pathname,
              variations.w800.pathname,
              variations.w1600.pathname
            );
            processedNewImagesData.push({
              image_url: variations.w1600.url,
              pathname: variations.w1600.pathname,
              filename: variations.w1600.filename,
              mimeType: variations.w1600.mimeType,
              size: variations.w1600.size,
              width: variations.w1600.width,
              height: variations.w1600.height,
            });
          } catch {
            throw new Error(`Falha no upload da imagem ${file.name}`);
          }
        }
      }
    }

    const layoutOrderJson = formData.get("layoutOrder") as string;
    const layoutOrder: string[] = layoutOrderJson ? JSON.parse(layoutOrderJson) : [];

    const oldDbImages = await prisma.projectImage.findMany({ where: { project_id: id } });
    const oldImagesToKeepIds = existingImages.map((img: { id: string }) => img.id);
    const oldImagesToDelete = oldDbImages.filter(img => !oldImagesToKeepIds.includes(img.id));

    const pathnamesToDelete: string[] = [];
    oldImagesToDelete.forEach(img => {
      if (img.pathname) pathnamesToDelete.push(img.pathname);
    });

    if (pathnamesToDelete.length > 0) {
      console.log(`[PROJECT_AUDIT] Excluindo ${pathnamesToDelete.length} blobs antigos órfãos`);
      await deleteBlobs(pathnamesToDelete);
    }

    await prisma.projectImage.deleteMany({ where: { project_id: id } });

    const finalImagesData = [];
    let cover_image = null;

    for (let i = 0; i < layoutOrder.length; i++) {
      const key = layoutOrder[i];
      if (key.startsWith("old-")) {
        const oldId = key.replace("old-", "");
        const oldImg = oldDbImages.find(img => img.id === oldId);
        if (oldImg) {
          finalImagesData.push({
            project_id: id,
            image_url: oldImg.image_url,
            pathname: oldImg.pathname,
            filename: oldImg.filename,
            mimeType: oldImg.mimeType,
            size: oldImg.size,
            width: oldImg.width,
            height: oldImg.height,
            display_order: i
          });
          if (i === 0) cover_image = oldImg.image_url;
        }
      } else if (key.startsWith("new-")) {
        const newIndex = parseInt(key.replace("new-", ""), 10);
        const newImgData = processedNewImagesData[newIndex];
        if (newImgData) {
          finalImagesData.push({
            project_id: id,
            ...newImgData,
            display_order: i
          });
          if (i === 0) cover_image = newImgData.image_url;
        }
      }
    }

    if (finalImagesData.length > 0) {
      await prisma.projectImage.createMany({
        data: finalImagesData
      });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        nome,
        cidade,
        descricao,
        featured,
        published,
        status,
        cover_image
      },
      include: {
        images: { orderBy: { display_order: 'asc' } }
      }
    });

    console.log(`[PROJECT_AUDIT] Projeto editado com sucesso. Invalidação de cache...`);
    revalidateTag("projects");
    revalidatePath("/");
    revalidatePath("/projetos");

    console.log(`[PROJECT_AUDIT] Edição concluída em ${Date.now() - startTime}ms`);
    return NextResponse.json(updatedProject);

  } catch (error) {
    console.error("[PROJECT_AUDIT] Erro crítico na edição do projeto:", error)
    if (uploadedPathnames.length > 0) {
      await deleteBlobs(uploadedPathnames);
    }
    return NextResponse.json({ error: "Erro ao atualizar projeto" }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log(`[PROJECT_AUDIT] Iniciando exclusão do projeto ID: ${id}`);
    
    const project = await prisma.project.findUnique({
      where: { id },
      include: { images: true }
    });

    if (!project) return NextResponse.json({ error: "Projeto não encontrado" }, { status: 404 });

    // Excluir blobs
    const pathnamesToDelete = project.images.filter(img => img.pathname).map(img => img.pathname as string);
    if (pathnamesToDelete.length > 0) {
      await deleteBlobs(pathnamesToDelete);
    }
    
    // Delete cascading
    await prisma.project.delete({
      where: { id },
    })

    console.log(`[PROJECT_AUDIT] Projeto excluído com sucesso.`);
    revalidateTag("projects");
    revalidatePath("/");
    revalidatePath("/projetos");

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`[PROJECT_AUDIT] Erro na exclusão:`, error);
    return NextResponse.json({ error: "Erro ao excluir projeto" }, { status: 500 })
  }
}
