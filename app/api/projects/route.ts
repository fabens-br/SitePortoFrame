import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { processAndUploadImage, deleteBlobs } from "@/lib/upload"
import { revalidatePath, revalidateTag } from "next/cache"

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
  const startTime = Date.now();
  console.log(`[PROJECT_AUDIT] Iniciando criação de projeto`);
  
  const uploadedPathnames: string[] = [];

  try {
    const formData = await request.formData();
    const nome = formData.get("nome") as string;
    const cidade = formData.get("cidade") as string;
    const descricao = formData.get("descricao") as string;
    const featured = formData.get("featured") === 'true';
    const published = formData.get("published") === 'true';
    const status = (formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "PUBLISHED";
    
    if (!nome || !cidade) {
      return NextResponse.json({ error: "Nome e cidade são obrigatórios" }, { status: 400 })
    }

    let slug = slugify(nome)
    let slugExists = await prisma.project.findUnique({ where: { slug } })
    let counter = 1
    while (slugExists) {
      slug = `${slugify(nome)}-${counter}`
      slugExists = await prisma.project.findUnique({ where: { slug } })
      counter++
    }

    // Processar imagens do form-data
    const files = formData.getAll("images") as File[];
    const processedImagesData = [];

    if (files && files.length > 0) {
      console.log(`[PROJECT_AUDIT] Processando ${files.length} imagens...`);
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file instanceof File) {
          try {
            const variations = await processAndUploadImage(file, slug);
            
            // Registramos os blobs para eventual rollback
            uploadedPathnames.push(
              variations.thumb.pathname,
              variations.w800.pathname,
              variations.w1600.pathname
            );

            // A versão principal será a w1600
            processedImagesData.push({
              image_url: variations.w1600.url,
              pathname: variations.w1600.pathname,
              filename: variations.w1600.filename,
              mimeType: variations.w1600.mimeType,
              size: variations.w1600.size,
              width: variations.w1600.width,
              height: variations.w1600.height,
              display_order: i
            });
          } catch (uploadError) {
            console.error(`[PROJECT_AUDIT] Erro no upload da imagem ${file.name}:`, uploadError);
            throw new Error(`Falha no upload da imagem ${file.name}`);
          }
        }
      }
    }

    const cover_image = processedImagesData.length > 0 ? processedImagesData[0].image_url : null;

    console.log(`[PROJECT_AUDIT] Salvando no MongoDB...`);
    const project = await prisma.project.create({
      data: {
        nome,
        slug,
        cidade,
        descricao: descricao || "",
        featured,
        published,
        status,
        cover_image,
        images: {
          create: processedImagesData
        },
      },
      include: {
        images: true,
      },
    })

    console.log(`[PROJECT_AUDIT] Projeto criado com sucesso. Inserindo invalidação de cache...`);
    revalidateTag("projects");
    revalidatePath("/");
    revalidatePath("/projetos");

    const totalTime = Date.now() - startTime;
    console.log(`[PROJECT_AUDIT] Operação finalizada em ${totalTime}ms`);

    return NextResponse.json(project)
  } catch (error) {
    console.error("[PROJECT_AUDIT] Erro crítico na criação do projeto:", error)
    
    // Rollback manual do upload
    if (uploadedPathnames.length > 0) {
      console.log(`[PROJECT_AUDIT] Executando rollback. Removendo ${uploadedPathnames.length} blobs do Vercel...`);
      await deleteBlobs(uploadedPathnames);
    }

    return NextResponse.json({ error: "Erro ao criar projeto" }, { status: 500 })
  }
}
