import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
  title: "Sobre a Porto Frame | Construtora em Wood Frame no Sul da Bahia",
  description: "Conheça nossa história, visão e a equipe de especialistas responsáveis por trazer a mais alta tecnologia construtiva para Porto Seguro e região.",
}

export default function SobrePage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-24">
      <Container className="max-w-3xl flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Nossa História. <br />
          <span className="text-primary">Nossa Engenharia.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-12 text-center max-w-2xl">
          A Porto Frame nasceu da necessidade de modernizar a construção civil no Litoral Sul da Bahia. 
          Substituímos o improviso artesanal pela precisão industrial.
        </p>
        
        {/* Futuramente: Timeline de história, Valores, Equipe */}
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-4">A Especialização</h2>
            <p className="text-muted-foreground leading-relaxed">
              Diferente de construtoras generalistas, nós respiramos Wood Frame. 
              Todo o nosso corpo técnico é especializado exclusivamente na construção a seco estrutural, 
              garantindo que cada obra siga rigorosamente as normas de desempenho e segurança.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Nossa Missão no Sul da Bahia</h2>
            <p className="text-muted-foreground leading-relaxed">
              Trancoso, Arraial d&apos;Ajuda e Porto Seguro possuem características climáticas únicas: maresia intensa, umidade e calor. 
              Nossa missão é entregar casas que não apenas resistam a esses fatores, mas que proporcionem conforto térmico absoluto e durabilidade secular.
            </p>
          </section>
        </div>
      </Container>
    </div>
  )
}
