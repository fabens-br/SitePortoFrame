import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Biblioteca Wood Frame | Artigos e Manuais Técnicos",
  description: "Acesse materiais técnicos, artigos, normas da ABNT e estudos de caso sobre a aplicação do Wood Frame no Brasil.",
}

export default function BibliotecaPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-24">
      <Container className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Biblioteca <span className="text-primary">Wood Frame.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed text-center mb-16">
          Central de conhecimento aberta. Acreditamos que a educação do mercado eleva o padrão de exigência e, consequentemente, a qualidade das obras.
        </p>

        {/* Placeholder para Lista de Artigos / Downloads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer group flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg text-primary">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Guia Definitivo Wood Frame (PDF)</h3>
              <p className="text-sm text-muted-foreground">Download gratuito do material completo detalhando o processo construtivo.</p>
            </div>
          </div>
          <div className="p-6 border border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer group flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-lg text-primary">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">Norma ABNT NBR 15575</h3>
              <p className="text-sm text-muted-foreground">Artigo técnico: Como o sistema supera os requisitos da norma de desempenho.</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
