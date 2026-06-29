import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Building, Landmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Financing() {
 return (
 <section className="py-24 md:py-32 bg-stone-50">
 <Container className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
 
 {/* Content */}
 <div className="flex flex-col">
 <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
 Sua obra financiada <br />
 <span className="text-primary">pelos principais bancos.</span>
 </h2>
 <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 leading-relaxed">
 O sistema Wood Frame é homologado pela Caixa Econômica Federal e aceito por todas as principais instituições financeiras do Brasil. Nossa equipe cuida de toda a viabilidade técnica para a aprovação do seu crédito.
 </p>

 <div className="space-y-6 mb-10">
 <div className="flex gap-4 items-start">
 <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
 <Landmark size={24} />
 </div>
 <div>
 <h4 className="font-bold text-lg mb-1">Aquisição de Terreno + Construção</h4>
 <p className="text-muted-foreground">Financie a compra do lote e a execução completa da obra em um único contrato.</p>
 </div>
 </div>

 <div className="flex gap-4 items-start">
 <div className="bg-primary/10 p-3 rounded-lg text-primary shrink-0">
 <Building size={24} />
 </div>
 <div>
 <h4 className="font-bold text-lg mb-1">Construção em Terreno Próprio</h4>
 <p className="text-muted-foreground">Já possui o lote? Financie 100% do custo da execução da obra com taxas subsidiadas.</p>
 </div>
 </div>
 </div>

 <Link href="/contato">
 <Button size="lg" className="w-full sm:w-fit text-base px-8 h-14">
 Falar com um Consultor
 </Button>
 </Link>
 </div>

 {/* Visual / Image */}
 <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video lg:aspect-[4/3] bg-white flex flex-col items-center justify-center">
 
 <Image
 src="/images/credito.png"
 alt="Sua obra financiada pelos principais bancos"
 fill
 sizes="(max-width: 1024px) 100vw, 50vw"
 className="object-cover object-center"
 />
 
 {/* Decoração da Imagem */}
 <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/95 backdrop-blur text-stone-900 p-6 rounded-3xl shadow-xl z-30 max-w-xs hidden md:block border border-white/20">
 <div className="flex items-center gap-3 mb-2">
 <Building className="text-primary" size={24} />
 <span className="font-bold">Aprovação Segura</span>
 </div>
 <p className="text-sm text-muted-foreground leading-relaxed">
 Nossa equipe cuida de todos os trâmites burocráticos e documentações necessárias para a aprovação do seu crédito.
 </p>
 </div>
 </div>
 </div>
 </Container>
 </section>
 )
}
