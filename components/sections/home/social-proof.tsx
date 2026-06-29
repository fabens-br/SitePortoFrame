import { Container } from "@/components/layout/container"
import { Ruler, Award, Shield, Leaf, Landmark, ShieldCheck } from "lucide-react"

export function SocialProof() {
  return (
    <Container className="px-4">
      <div 
        className="w-full max-w-[1150px] mx-auto rounded-[32px] border border-white/5 shadow-2xl p-6 lg:py-8 lg:px-10"
        style={{ background: "linear-gradient(180deg, #1A1714, #211C18)" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-nowrap items-center justify-between gap-8 lg:gap-4 xl:gap-8">
          
          <div className="group flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 sm:gap-4 transition-transform duration-300 hover:-translate-y-1 cursor-default">
            <Ruler className="text-primary group-hover:brightness-125 transition-all duration-300 ease-out shrink-0" size={28} strokeWidth={1.5} />
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-bold text-[13px] tracking-wide text-white uppercase">Engenharia</span>
              <span className="text-[11px] lg:text-[12px] text-stone-400 font-light mt-0.5">Precisão Industrial</span>
            </div>
          </div>

          <div className="group flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 sm:gap-4 transition-transform duration-300 hover:-translate-y-1 cursor-default">
            <Award className="text-primary group-hover:brightness-125 transition-all duration-300 ease-out shrink-0" size={28} strokeWidth={1.5} />
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-bold text-[13px] tracking-wide text-white uppercase">Certificações</span>
              <span className="text-[11px] lg:text-[12px] text-stone-400 font-light mt-0.5">Normas Técnicas</span>
            </div>
          </div>

          <div className="group flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 sm:gap-4 transition-transform duration-300 hover:-translate-y-1 cursor-default">
            <Shield className="text-primary group-hover:brightness-125 transition-all duration-300 ease-out shrink-0" size={28} strokeWidth={1.5} />
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-bold text-[13px] tracking-wide text-white uppercase">Segurança</span>
              <span className="text-[11px] lg:text-[12px] text-stone-400 font-light mt-0.5">Alto Desempenho</span>
            </div>
          </div>

          <div className="group flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 sm:gap-4 transition-transform duration-300 hover:-translate-y-1 cursor-default">
            <Leaf className="text-primary group-hover:brightness-125 transition-all duration-300 ease-out shrink-0" size={28} strokeWidth={1.5} />
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-bold text-[13px] tracking-wide text-white uppercase">Sustentabilidade</span>
              <span className="text-[11px] lg:text-[12px] text-stone-400 font-light mt-0.5">Construção a Seco</span>
            </div>
          </div>

          <div className="group flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 sm:gap-4 transition-transform duration-300 hover:-translate-y-1 cursor-default">
            <Landmark className="text-primary group-hover:brightness-125 transition-all duration-300 ease-out shrink-0" size={28} strokeWidth={1.5} />
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-bold text-[13px] tracking-wide text-white uppercase">Financiamento</span>
              <span className="text-[11px] lg:text-[12px] text-stone-400 font-light mt-0.5">100% Financiável</span>
            </div>
          </div>

          <div className="group flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-3 sm:gap-4 transition-transform duration-300 hover:-translate-y-1 cursor-default">
            <ShieldCheck className="text-primary group-hover:brightness-125 transition-all duration-300 ease-out shrink-0" size={28} strokeWidth={1.5} />
            <div className="flex flex-col text-center sm:text-left">
              <span className="font-bold text-[13px] tracking-wide text-white uppercase">Estrutural</span>
              <span className="text-[11px] lg:text-[12px] text-stone-400 font-light mt-0.5">Durabilidade Superior</span>
            </div>
          </div>

        </div>
      </div>
    </Container>
  )
}
