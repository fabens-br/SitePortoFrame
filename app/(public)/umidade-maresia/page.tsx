import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Droplets, Wind, Timer } from "lucide-react"

export const metadata: Metadata = {
  title: "Umidade e Maresia | Proteção e Durabilidade",
  description: "Descubra como o sistema Wood Frame da Porto Frame protege sua residência contra a umidade e maresia, ideal para construções litorâneas.",
}

export default function UmidadeMaresiaPage() {
  return (
    <div className="flex flex-col w-full">
      {/* SEÇÃO HERO */}
      <section className="pt-[160px] lg:pt-[176px] pb-20 md:pb-32 bg-stone-50 overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Imagem */}
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] lg:aspect-square w-full shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/images/estrutura_wood_real.png" 
                alt="Detalhes da estrutura de Wood Frame e proteção contra umidade" 
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
            
            {/* Conteúdo */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-stone-900 uppercase">
                Umidade e Maresia:<br />
                <span className="text-primary text-2xl md:text-4xl lg:text-4xl mt-2 block">Tecnologia preparada para o litoral</span>
              </h1>
              <p className="text-lg md:text-xl text-stone-600 leading-relaxed mb-10">
                Construir próximo ao mar exige um sistema construtivo desenvolvido para enfrentar um dos ambientes mais agressivos da construção civil. A combinação entre umidade elevada, maresia e variações climáticas acelera a deterioração de materiais convencionais. O sistema Wood Frame da Porto Frame foi projetado para oferecer proteção, durabilidade e desempenho mesmo em regiões litorâneas.
              </p>
              <div>
                <Link href="/contato">
                  <Button size="lg" className="px-8 h-14 text-sm font-bold uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    Solicitar Orçamento
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SEÇÃO 2 - Como o sistema protege sua residência? */}
      <section className="py-24 bg-white">
        <Container className="max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-8 tracking-tight">
            Como o sistema protege sua residência?
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-stone-600 leading-relaxed mx-auto">
            <p>
              Cada camada da parede exerce uma função específica para impedir que a umidade comprometa a estrutura.
            </p>
            <p>
              O sistema combina madeira estrutural tratada em autoclave, placas OSB estruturais, membrana hidrófuga e revestimento externo ventilado (Siding). Essa composição cria uma barreira eficiente contra a água da chuva e a maresia, enquanto permite que a parede &quot;respire&quot;, eliminando o vapor interno e reduzindo significativamente o risco de condensação, mofo e infiltrações.
            </p>
          </div>
        </Container>
      </section>

      {/* SEÇÃO 3 - 4 Cards */}
      <section className="py-24 bg-stone-50">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Madeira Tratada</h3>
              <p className="text-stone-600 leading-relaxed">
                Madeira estrutural tratada em autoclave contra fungos, umidade e organismos biológicos.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Droplets className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Membrana Hidrófuga</h3>
              <p className="text-stone-600 leading-relaxed">
                Impede a entrada de água externa enquanto permite a saída da umidade interna da parede.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Wind className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Ventilação da Fachada</h3>
              <p className="text-stone-600 leading-relaxed">
                O revestimento cria uma câmara ventilada que auxilia na secagem natural da estrutura.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-stone-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Timer className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-4">Durabilidade</h3>
              <p className="text-stone-600 leading-relaxed">
                Sistema desenvolvido para proporcionar desempenho e longa vida útil mesmo em regiões litorâneas.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* SEÇÃO 4 - Ideal para cidades litorâneas */}
      <section className="py-24 bg-white">
        <Container className="max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-stone-900 mb-8 tracking-tight">
            Ideal para cidades litorâneas
          </h2>
          <div className="space-y-6 text-lg md:text-xl text-stone-600 leading-relaxed mx-auto">
            <p>
              A tecnologia Wood Frame é amplamente utilizada em países como Estados Unidos, Canadá, Japão e diversos países da Europa, onde construções convivem diariamente com chuva intensa, neve, alta umidade e ambientes costeiros.
            </p>
            <p>
              Quando executado corretamente e utilizando materiais certificados, o sistema apresenta excelente desempenho em regiões com maresia, oferecendo conforto térmico, eficiência construtiva e elevada durabilidade.
            </p>
          </div>
        </Container>
      </section>

      {/* SEÇÃO FINAL - CTA */}
      <section className="py-32 bg-stone-900 text-white">
        <Container className="max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight text-white">
            Construa com segurança mesmo próximo ao mar.
          </h2>
          <p className="text-xl text-stone-300 leading-relaxed mb-12 max-w-3xl mx-auto">
            A Porto Frame desenvolve projetos utilizando materiais certificados e técnicas construtivas modernas para oferecer uma residência preparada para enfrentar os desafios do clima litorâneo com qualidade, conforto e durabilidade.
          </p>
          <Link href="/contato">
            <Button size="lg" variant="default" className="px-10 h-16 text-sm md:text-base font-bold uppercase tracking-widest rounded-full shadow-[0_0_40px_rgba(217,119,43,0.3)] hover:shadow-[0_0_60px_rgba(217,119,43,0.5)] transition-all hover:-translate-y-1">
              Solicitar Orçamento
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  )
}
