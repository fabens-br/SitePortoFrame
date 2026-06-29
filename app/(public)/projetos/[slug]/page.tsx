import { Metadata } from "next"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"
import { Container } from "@/components/layout/container"
import { ProjectGallery } from "./components/ProjectGallery"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await prisma.project.findUnique({ where: { slug } })

  if (!project) return { title: "Projeto não encontrado" }

  return {
    title: `${project.nome} | Projetos Porto Frame`,
    description: project.descricao || `Conheça o projeto ${project.nome} localizado em ${project.cidade}.`,
    openGraph: {
      images: project.cover_image ? [project.cover_image] : [],
    }
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { display_order: "asc" } },
    }
  })

  if (!project) notFound()

  return (
    <article className="pb-32 bg-white">
      {/* Cover */}
      <div className="relative w-full h-[60vh] md:h-[80vh] bg-stone-900 overflow-hidden">
        {project.cover_image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={project.cover_image} 
            alt={project.nome} 
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full bg-stone-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <Container className="absolute inset-0 flex flex-col justify-end pb-16 z-10">
          <Link href="/projetos" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors w-fit">
            <ArrowLeft size={16} />
            <span className="text-sm font-semibold uppercase tracking-widest">Voltar para Projetos</span>
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            {project.nome}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium flex items-center gap-3">
            <span className="w-8 h-[2px] bg-primary"></span>
            {project.cidade}
          </p>
        </Container>
      </div>

      <Container className="mt-16 md:mt-24 max-w-4xl">
        {project.descricao && (
          <div className="prose prose-stone prose-lg max-w-none text-muted-foreground leading-relaxed">
            {project.descricao.split('\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        <ProjectGallery images={project.images} />
      </Container>
    </article>
  )
}
