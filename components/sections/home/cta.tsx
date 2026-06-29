import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, Phone } from "lucide-react"
import { ImageFallback } from "@/components/ui/image-fallback"
import Link from "next/link"
import { siteConfig } from "@/config/site"

export function Cta() {
 return (
 <section className="relative py-20 lg:py-28 overflow-hidden bg-stone-950">
 {/* Background Image */}
 <div className="absolute inset-0 z-0">
 <ImageFallback
 src="/images/cta-background.jpg"
 alt=""
 fill
 className="object-cover opacity-40"
 sizes="100vw"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-900/40 mix-blend-multiply" />
 </div>

 <Container className="relative z-10">
 <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
 <span className="text-primary font-bold uppercase tracking-[0.25em] text-[11px] mb-8 py-1.5 px-4 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm">
 O Próximo Passo
 </span>
 <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-white leading-[1.1]">
 Pronto para transformar sua visão em <span className="text-primary font-light italic">realidade?</span>
 </h2>
 <p className="text-lg md:text-xl text-stone-300 max-w-2xl mb-12 leading-relaxed font-light">
 Nossos especialistas estão à disposição para projetar e construir sua residência de alto padrão no Sul da Bahia com a eficiência tecnológica do Wood Frame.
 </p>
 
 <div className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
 <Link href="/contato" className="w-full sm:w-auto">
 <Button size="lg" className="w-full text-base gap-3 h-14 px-8 font-bold shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
 Solicitar Orçamento
 <ArrowRight size={18} />
 </Button>
 </Link>
 <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, '')}`} className="w-full sm:w-auto">
 <Button size="lg" variant="outline" className="w-full text-base bg-transparent text-white border-white/30 hover:bg-white hover:text-stone-950 gap-3 h-14 px-8 transition-all duration-300 hover:-translate-y-1">
 <Phone size={20} />
 <div className="flex flex-col items-start leading-none text-left">
   <span className="text-[10px] uppercase tracking-widest opacity-70 mb-1">Fale Conosco</span>
   <span className="font-bold text-[15px]">{siteConfig.contact.phoneDisplay}</span>
 </div>
 </Button>
 </a>
 </div>
 </div>
 </Container>
 </section>
 )
}
