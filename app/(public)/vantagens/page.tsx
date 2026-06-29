import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Benefits } from "@/components/sections/home/benefits"
import { Comparison } from "@/components/sections/home/comparison"

export const metadata: Metadata = {
  title: "Vantagens do Wood Frame | Por que escolher este sistema?",
  description: "Da velocidade de execução ao conforto térmico inigualável, descubra todas as vantagens de construir sua casa em Wood Frame.",
}

export default function VantagensPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px]">
      <Container className="max-w-4xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Vantagens e <span className="text-primary">Benefícios.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed text-center">
          O Wood Frame não é apenas &quot;uma forma diferente&quot; de construir. É uma evolução tecnológica projetada para entregar eficiência, segurança e muito mais conforto.
        </p>
      </Container>
      
      {/* Reutilizando os componentes já criados na Home */}
      <Benefits />
      <Comparison />
    </div>
  )
}
