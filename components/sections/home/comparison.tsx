import { Container } from "@/components/layout/container"
import { CheckCircle2, MinusCircle } from "lucide-react"

const features = [
 { name: "Tempo de Execução", woodFrame: "Meses", alvenaria: "Anos" },
 { name: "Precisão Construtiva", woodFrame: "Milimétrica (Software)", alvenaria: "Centimétrica (Artesanal)" },
 { name: "Conforto Térmico", woodFrame: "Excelente (Multicamadas)", alvenaria: "Baixo a Médio" },
 { name: "Geração de Entulho", woodFrame: "Quase Nula (Sistema a Seco)", alvenaria: "Alta" },
 { name: "Risco de Trincas", woodFrame: "Baixíssimo (Flexível)", alvenaria: "Alto (Rígido)" },
 { name: "Manutenção", woodFrame: "Simples (Placas Acessíveis)", alvenaria: "Complexa (Quebra-quebra)" },
]

export function Comparison() {
 return (
 <section className="py-24 md:py-32 bg-stone-50">
 <Container className="max-w-4xl">
 <div className="text-center mb-16 md:mb-20">
 <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
 A decisão informada é a <span className="text-primary">melhor decisão.</span>
 </h2>
 <p className="text-lg text-muted/80 max-w-2xl mx-auto">
 Entenda as diferenças técnicas estruturais e tome uma decisão baseada em fatos e engenharia.
 </p>
 </div>

  <div className="rounded-[36px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-[rgba(255,255,255,0.05)]" style={{ background: "linear-gradient(180deg, #1B1715, #221C19)" }}>
  <div className="grid grid-cols-3 p-8 border-b border-[rgba(255,255,255,0.06)] font-semibold text-[13px] uppercase tracking-widest text-white/40 bg-black/10">
  <div className="col-span-1 flex items-center">Característica Técnica</div>
  <div className="col-span-1 text-center text-primary/80">Wood Frame</div>
  <div className="col-span-1 text-center">Alvenaria</div>
  </div>
  
  <div className="divide-y divide-[rgba(255,255,255,0.06)]">
  {features.map((feature, idx) => (
  <div key={idx} className="grid grid-cols-3 p-8 items-center hover:bg-[rgba(255,255,255,0.03)] transition-colors duration-300">
  <div className="col-span-1 font-medium text-white/90 text-base">{feature.name}</div>
  <div className="col-span-1 flex flex-col items-center gap-2 text-center text-primary">
  <CheckCircle2 size={28} className="text-primary drop-shadow-sm" />
  <span className="text-[15px] font-bold tracking-wide">{feature.woodFrame}</span>
  </div>
  <div className="col-span-1 flex flex-col items-center gap-2 text-center text-stone-400">
  <MinusCircle size={20} className="text-stone-500/70" />
  <span className="text-[13px] font-light">{feature.alvenaria}</span>
  </div>
  </div>
  ))}
  </div>
  </div>
 </Container>
 </section>
 )
}
