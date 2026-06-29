import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Process } from "@/components/sections/home/process"

export const metadata: Metadata = {
  title: "Como Construímos | Processo Construtivo Wood Frame",
  description: "Entenda o passo a passo da nossa metodologia construtiva: da aprovação arquitetônica e fabricação industrial até a rápida montagem no terreno.",
}

export default function ComoConstruimosPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px]">
      <Container className="max-w-4xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Como <span className="text-primary">Construímos.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed text-center">
          Transparência total. Saiba exatamente o que acontece em cada etapa do seu investimento.
        </p>
      </Container>
      
      {/* Reutilizando o componente de Processo da Home */}
      <Process />
    </div>
  )
}
