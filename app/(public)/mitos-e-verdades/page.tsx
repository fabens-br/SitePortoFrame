import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Objections } from "@/components/sections/home/objections"

export const metadata: Metadata = {
  title: "Mitos e Verdades sobre Wood Frame | Porto Frame",
  description: "Cupim? Incêndio? Apodrecimento? Esclareça todas as suas dúvidas e medos técnicos sobre o sistema Wood Frame de forma transparente e fundamentada.",
}

export default function MitosPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px]">
      <Container className="max-w-4xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Mitos <span className="text-primary">e Verdades.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed text-center">
          A resistência ao novo geralmente vem da falta de informação. Nós trazemos as normas técnicas e a ciência dos materiais para a mesa.
        </p>
      </Container>
      
      {/* Reutilizando o componente de Objeções (que pode ser expandido aqui futuramente) */}
      <Objections />
    </div>
  )
}
