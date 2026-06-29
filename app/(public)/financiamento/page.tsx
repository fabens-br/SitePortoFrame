import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Financing } from "@/components/sections/home/financing"

export const metadata: Metadata = {
  title: "Financiamento de Obras em Wood Frame | Porto Frame",
  description: "Aprenda como financiar a construção da sua casa em Wood Frame pela Caixa Econômica e principais bancos. Nós auxiliamos em todo o processo burocrático.",
}

export default function FinanciamentoPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px]">
      <Container className="max-w-4xl mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Construção <span className="text-primary">100% Financiável.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed text-center">
          O sistema é amplamente aprovado pelos principais bancos do país. Nós auxiliamos na aprovação de crédito para aquisição de terreno e construção.
        </p>
      </Container>
      
      {/* Reutilizando o componente de Financiamento da Home */}
      <Financing />
    </div>
  )
}
