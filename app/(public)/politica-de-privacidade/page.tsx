import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "Política de Privacidade | Porto Frame",
  description: "Entenda como a Porto Frame coleta, utiliza e protege as suas informações e dados pessoais.",
  robots: "noindex, nofollow"
}

export default function PoliticaPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-24">
      <Container className="max-w-3xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-foreground text-center">Política de Privacidade</h1>
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">1. Coleta de Informações</h2>
          <p>
            Coletamos informações que você nos fornece diretamente ao preencher formulários de contato em nosso site, 
            incluindo nome, e-mail, telefone e informações sobre o projeto desejado.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">2. Uso das Informações</h2>
          <p>
            As informações coletadas são utilizadas exclusivamente para:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4">
            <li>Responder a solicitações de orçamento e dúvidas técnicas;</li>
            <li>Melhorar a experiência de navegação e atendimento;</li>
            <li>Envio de comunicações institucionais relevantes (mediante consentimento).</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">3. Proteção de Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados pessoais contra acesso, 
            alteração, divulgação ou destruição não autorizada.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">4. Compartilhamento</h2>
          <p>
            Não vendemos, trocamos ou transferimos para terceiros as suas informações pessoalmente identificáveis. 
            Isso não inclui parceiros de hospedagem de sites e outros parceiros que nos auxiliam na operação do site, 
            desde que essas partes concordem em manter essas informações confidenciais.
          </p>
        </div>
      </Container>
    </div>
  )
}
