import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck, Clock, Shield, Leaf, ThermometerSun } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { SocialProof } from "@/components/sections/home/social-proof"

export function Hero() {
  return (
    <section className="relative bg-background">
      <div className="relative min-h-[90vh] flex items-center pt-[130px] lg:pt-[150px] pb-24 md:pb-32 overflow-hidden">
      {/* Background glow to make it premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50 to-white z-0" />
      <Container className="animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-both">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* 40% Text Content */}
          <div className="lg:col-span-5 flex flex-col gap-10 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <div className="flex items-center gap-3 text-primary bg-primary/10 w-fit px-5 py-2.5 rounded-full border border-primary/20 backdrop-blur-sm">
              <ShieldCheck size={18} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary">Tecnologia & Engenharia</span>
            </div>
            
            <h1 className="text-[3.5rem] lg:text-[4.5rem] font-extrabold text-foreground tracking-[-0.03em] leading-[1.05]">
              Construímos <br className="hidden md:block" /> mais do que casas. <br />
              <span className="text-primary">Construímos confiança.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200 fill-mode-both">
              O futuro da construção civil chegou ao Sul da Bahia. Precisão industrial, 
              conforto absoluto e obras até 60% mais rápidas com Wood Frame.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              <Link href="/contato" className="w-full sm:w-auto group">
                <Button size="lg" className="text-[15px] uppercase tracking-widest font-bold gap-3 w-full sm:w-auto h-14 px-8 shadow-md hover:shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 rounded-full">
                  Solicitar Orçamento
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* 60% Image Content */}
          <div className="lg:col-span-7 relative w-full h-[450px] sm:h-[550px] lg:h-[700px] rounded-[2rem] overflow-hidden shadow-2xl group animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both border border-border/10">
            
            <Image
              src="/images/hero-background.jpg"
              alt="Construção de Alto Padrão em Wood Frame"
              fill
              priority
              className="object-cover object-[center_30%] md:object-[center_35%] lg:object-[center_40%] group-hover:scale-105 transition-transform duration-1000 saturate-[1.1] contrast-[1.05]"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            
            {/* Overlay muito discreto para garantir legibilidade dos selos sem escurecer a foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 mix-blend-multiply opacity-80" />
            
            {/* Sleek Floating Indicators Bar */}
            <div className="absolute bottom-6 inset-x-4 sm:inset-x-8 bg-black/40 backdrop-blur-md border border-white/20 p-4 sm:px-6 sm:py-5 rounded-3xl flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-around text-white shadow-2xl gap-4 sm:gap-2">
              
              <div className="flex items-center gap-3 w-[45%] sm:w-auto">
                <Clock className="text-primary shrink-0" size={24} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-none">60%</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/70 mt-1">Mais Rápido</span>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              
              <div className="flex items-center gap-3 w-[45%] sm:w-auto">
                <Shield className="text-primary shrink-0" size={24} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-none">100%</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/70 mt-1">Financiável</span>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              
              <div className="flex items-center gap-3 w-[45%] sm:w-auto">
                <Leaf className="text-primary shrink-0" size={24} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-none">Zero</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/70 mt-1">Desperdício</span>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-8 bg-white/20" />
              
              <div className="flex items-center gap-3 w-[45%] sm:w-auto">
                <ThermometerSun className="text-primary shrink-0" size={24} strokeWidth={1.5} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight leading-none">A+</span>
                  <span className="text-[9px] uppercase tracking-widest text-white/70 mt-1">Isolamento</span>
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </Container>
      </div>
      
      {/* Floating Social Proof Bar */}
      <div className="relative z-30 -mt-20 sm:-mt-24 lg:-mt-16">
        <SocialProof />
      </div>
    </section>
  )
}
