import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Faq } from "@/components/sections/home/faq"

export const metadata: Metadata = {
  title: "Perguntas Frequentes sobre Wood Frame | Porto Frame FAQ",
  description: "Central de dúvidas. Encontre respostas completas e técnicas sobre custos, manutenção, isolamento acústico e térmico do sistema Wood Frame.",
}

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-24">
      <Container className="max-w-4xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Central de <span className="text-primary">Dúvidas.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed text-center">
          Transparência é o nosso principal material de construção.
        </p>
      </Container>
      
      {/* Reutilizando o componente de Faq da Home */}
      <Faq />
    </div>
  )
}
