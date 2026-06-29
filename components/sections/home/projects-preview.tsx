import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import prisma from "@/lib/prisma"

export async function ProjectsPreview() {
  const projects = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { created_at: "desc" },
    take: 3,
  })

  return (
    <section className="py-24 md:py-32 bg-stone-50">
      <Container className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
              Projetos que inspiram <br className="hidden md:block" />
              <span className="text-primary">confiança.</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              A arquitetura que você sempre sonhou, com a velocidade e segurança que só o Wood Frame pode oferecer.
            </p>
          </div>
          <Link href="/projetos" className="hidden md:flex">
            <Button variant="outline" className="gap-2 group">
              Ver Galeria Completa
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center p-12 text-muted-foreground">
            Nenhum projeto em destaque cadastrado no momento.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 md:gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/projetos/${project.slug}`} className="group cursor-pointer flex flex-col gap-5">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-white shadow-sm group-hover:shadow-xl transition-all duration-500">
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
        
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/projetos" className="w-full">
            <Button variant="outline" className="w-full gap-2 group">
              Ver Galeria Completa
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}
