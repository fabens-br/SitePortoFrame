import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "O que é Wood Frame | Entenda o Sistema Construtivo",
  description: "Descubra como funciona o Wood Frame, o sistema construtivo mais utilizado em países desenvolvidos e que revoluciona a forma de construir no Brasil.",
}

export default function WoodFramePage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-24">
      <Container className="max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          O que é <span className="text-primary">Wood Frame?</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-16 text-center max-w-2xl mx-auto">
          O sistema construtivo que domina 90% das casas nos Estados Unidos, Canadá e Suécia, 
          agora ao seu alcance com padrão europeu de engenharia.
        </p>

        {/* Estrutura visual didática será renderizada aqui */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-muted rounded-2xl aspect-video overflow-hidden relative">
            {/* Imagem do esqueleto da casa */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1541888079549-9eb10834ba78?auto=format&fit=crop&q=80&w=800" 
              alt="Estrutura de Madeira Wood Frame" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4">A Estrutura Primária</h3>
            <p className="text-muted-foreground leading-relaxed">
              O &quot;esqueleto&quot; da casa é formado por perfis de madeira estrutural (Pinus autoclavado). 
              Esta madeira recebe um tratamento químico industrial sob alta pressão, tornando-se 
              imune a cupins, brocas e apodrecimento, com durabilidade secular comprovada.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
