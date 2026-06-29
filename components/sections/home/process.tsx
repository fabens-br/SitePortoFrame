import { Container } from "@/components/layout/container"
import { Check } from "lucide-react"

const steps = [
 {
 title: "1. Viabilidade e Orçamento",
 description: "Análise técnica do seu terreno ou projeto arquitetônico, com entrega de orçamento preciso e transparente. Sem surpresas."
 },
 {
 title: "2. Engenharia e Compatibilização",
 description: "Seu projeto arquitetônico é transformado em um modelo estrutural 3D. Tudo é compatibilizado (hidráulica, elétrica e estrutura) no software."
 },
 {
 title: "3. Aprovação e Financiamento",
 description: "Assessoria completa para aprovação em condomínios, prefeituras e estruturação do financiamento via Caixa Econômica Federal."
 },
 {
 title: "4. Engenharia de Precisão",
 description: "As paredes são montadas diretamente no local da obra, seguindo um rigoroso processo técnico de medição, corte e montagem. Cada etapa é executada com precisão milimétrica e controle de qualidade, garantindo perfeito alinhamento estrutural, elevado padrão construtivo e máxima confiabilidade."
 },
 {
 title: "5. Montagem Rápida",
 description: "Com a estrutura preparada e os componentes previamente planejados, a montagem evolui de forma rápida, limpa e organizada. Esse método reduz desperdícios, otimiza o cronograma da obra e proporciona mais eficiência, segurança e previsibilidade durante toda a execução."
 },
 {
 title: "6. Acabamento e Entrega",
 description: "Finalização com revestimentos de alto padrão, instalação de esquadrias e entrega das chaves com todas as garantias legais."
 }
]

export function Process() {
 return (
 <section className="py-24 md:py-32 bg-stone-50 overflow-hidden relative">
 <Container className="relative z-10">
 <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
 <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
 O fluxo de uma <br className="hidden md:block" />
 <span className="text-primary">obra inteligente.</span>
 </h2>
 <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
 Previsibilidade do primeiro contato à entrega das chaves. 
 Construir não precisa ser sinônimo de dor de cabeça.
 </p>
 </div>

 <div className="max-w-4xl mx-auto relative">
 {/* Linha vertical (Desktop) */}
 <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
 
 <div className="flex flex-col gap-12">
 {steps.map((step, idx) => {
 const isEven = idx % 2 === 0
 return (
 <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
 
 {/* Ponto Central Timeline */}
 <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-background border-4 border-primary items-center justify-center z-10 shadow-sm">
 <Check size={16} className="text-primary font-bold" />
 </div>
 
 {/* Espaço Vazio para o lado oposto no Desktop */}
 <div className="hidden md:block w-5/12" />
 
 {/* Card do Passo */}
 <div className="w-full md:w-5/12 text-center md:text-left p-6 md:p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-all duration-300">
 <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
 <p className="text-muted-foreground leading-relaxed">
 {step.description}
 </p>
 </div>
 </div>
 )
 })}
 </div>
 </div>
 </Container>
 </section>
 )
}
