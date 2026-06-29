import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "O que é Wood Frame | Entenda o Sistema Construtivo",
  description: "Descubra como funciona o Wood Frame, o sistema construtivo mais utilizado em países desenvolvidos e que revoluciona a forma de construir no Brasil.",
}

export default function WoodFramePage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-24">
      <Container className="max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          O que é <span className="text-primary">Wood Frame?</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-20 text-center max-w-2xl mx-auto">
          O sistema construtivo que domina 90% das casas nos Estados Unidos, Canadá e Suécia, 
          agora ao seu alcance com padrão europeu de engenharia.
        </p>

        {/* Estrutura visual didática será renderizada aqui */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7 bg-muted/30 rounded-3xl min-h-[400px] lg:min-h-[600px] overflow-hidden relative flex items-center justify-center p-8">
            {/* Imagem do esqueleto da casa */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/images/estrutura_wood.png" 
              alt="Estrutura em Wood Frame com identificação das camadas construtivas" 
              className="w-full h-full object-contain object-center scale-110"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-8 tracking-tight">A Estrutura Primária</h3>
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg leading-8">
                A base do sistema Wood Frame é formada por montantes e travessas de madeira estrutural de reflorestamento (Pinus autoclavado), dimensionados por cálculo de engenharia para distribuir com precisão todas as cargas da edificação.
              </p>
              <p className="text-muted-foreground text-lg leading-8">
                Antes da fabricação, cada peça recebe tratamento industrial em autoclave sob alta pressão, tornando-a altamente resistente à ação de cupins, fungos e ao apodrecimento. O resultado é uma estrutura leve, extremamente resistente e dimensionalmente estável, capaz de suportar décadas de uso com elevado desempenho estrutural.
              </p>
              <p className="text-muted-foreground text-lg leading-8">
                Cada painel é produzido com precisão milimétrica, garantindo alinhamento perfeito, redução de desperdícios e uma montagem rápida e segura, seguindo padrões amplamente utilizados nos Estados Unidos, Canadá e Europa.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
