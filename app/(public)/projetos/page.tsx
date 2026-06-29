import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Image as ImageIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Projetos em Wood Frame | Portfólio Porto Frame",
  description: "Explore nossa galeria de projetos e descubra a flexibilidade arquitetônica do sistema Wood Frame em residências de alto padrão.",
}

export const revalidate = 60 // Revalidate cache every minute

export default async function ProjetosPage() {
  const projects = await prisma.project.findMany({
    orderBy: { created_at: "desc" },
  })

  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-32">
      <Container className="max-w-4xl mb-24">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Nossos <span className="text-primary">Projetos.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed text-center">
          Inspire-se. Não há limites arquitetônicos para o Wood Frame. Do clássico ao contemporâneo, executamos qualquer design com perfeição estrutural.
        </p>
      </Container>
      
      <Container>
        {projects.length === 0 ? (
          <div className="text-center p-20 bg-stone-50 rounded-3xl text-muted-foreground">
            Ainda não há projetos cadastrados na galeria.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project) => (
              <Link key={project.id} href={`/projetos/${project.slug}`} className="group cursor-pointer flex flex-col gap-5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  {project.cover_image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={project.cover_image} 
                      alt={project.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground/30">
                      <ImageIcon size={32} strokeWidth={1} className="mb-2" />
                      <span className="text-[10px] uppercase font-bold tracking-widest">Sem Imagem</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.nome}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <span>{project.cidade}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
