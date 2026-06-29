import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "Termos de Uso | Porto Frame",
  description: "Termos e condições de uso do website Porto Frame.",
  robots: "noindex, nofollow"
}

export default function TermosPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-24">
      <Container className="max-w-3xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-foreground text-center">Termos de Uso</h1>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar o site da Porto Frame, você concorda em cumprir estes termos de serviço, 
            todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, 
            está proibido de usar ou acessar este site.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">2. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo presente neste site, incluindo mas não se limitando a textos, gráficos, logotipos, ícones, 
            imagens, clipes de áudio e software, é propriedade da Porto Frame ou de seus fornecedores de conteúdo 
            e protegido por leis de direitos autorais.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">3. Isenção de Responsabilidade</h2>
          <p>
            Os materiais no site da Porto Frame são fornecidos &quot;como estão&quot;. A Porto Frame não oferece garantias, expressas 
            ou implícitas, e, por este meio, isenta e nega todas as outras garantias. Os dados técnicos de desempenho e 
            custos apresentados são estimativas e médias de mercado, sujeitos a variações de acordo com cada projeto específico.
          </p>
        </div>
      </Container>
    </div>
  )
}
