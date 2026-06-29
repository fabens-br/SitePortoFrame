import { Container } from "@/components/layout/container"
import { Clock, ThermometerSun, Leaf, Volume2, ShieldCheck, Ruler } from "lucide-react"

const benefits = [
 {
 title: "Obra 60% Mais Rápida",
 description: "Componentes pré-fabricados com precisão milimétrica permitem a montagem da casa em poucas semanas, não em anos.",
 icon: Clock,
 },
 {
 title: "Conforto Térmico A+",
 description: "Paredes multicamadas com isolamento em lã de vidro ou PET garantem temperatura agradável o ano todo e economia de energia com ar-condicionado.",
 icon: ThermometerSun,
 },
 {
 title: "Isolamento Acústico",
 description: "Bloqueio superior de ruídos externos e entre cômodos, proporcionando paz absoluta mesmo em áreas movimentadas.",
 icon: Volume2,
 },
 {
 title: "Sustentabilidade Real",
 description: "Uso de madeira de reflorestamento e processo a seco que reduz drasticamente o consumo de água e a geração de entulho.",
 icon: Leaf,
 },
 {
 title: "Precisão Industrial",
 description: "Esqueça paredes tortas e retrabalhos. O sistema é calculado em software de engenharia e montado sem improvisos.",
 icon: Ruler,
 },
 {
 title: "Segurança Estrutural",
 description: "Estrutura leve porém extremamente flexível, suportando intempéries rigorosas de forma mais eficiente que estruturas rígidas.",
 icon: ShieldCheck,
 }
]

export function Benefits() {
 return (
 <section className="pt-10 md:pt-16 pb-24 md:pb-32 bg-stone-50">
 <Container className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
 <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
 <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
 A tecnologia por trás do <br className="hidden md:block" />
 <span className="text-primary">alto padrão.</span>
 </h2>
 <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
 O Wood Frame não é apenas uma alternativa construtiva. 
 É a evolução lógica da engenharia para quem exige qualidade, previsibilidade e conforto superior.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
 {benefits.map((item, i) => (
 <div key={i} className="flex gap-4 group hover:-translate-y-1 transition-transform duration-300">
 <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
 <item.icon size={24} />
 </div>
 <div>
 <h3 className="text-xl font-bold mb-2 text-foreground">{item.title}</h3>
 <p className="text-muted-foreground leading-relaxed">
 {item.description}
 </p>
 </div>
 </div>
 ))}
 </div>
 </Container>
 </section>
 )
}
