"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { Menu, X } from "lucide-react"
import logoImg from "@/public/images/logo.png"

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Executa a checagem imediatamente após a hidratação
    handleScroll()
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevenir scroll quando menu mobile está aberto
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 isolate">
      {/* Camada de Fundo Isolada (Backdrop e Transparência) */}
      <div 
        className={cn(
          "absolute inset-0 -z-10 transition-all duration-300 ease-out",
          isScrolled 
            ? "bg-[rgba(248,248,246,0.82)] backdrop-blur-[18px] border-b border-[rgba(0,0,0,0.06)] shadow-[0_8px_30px_rgba(0,0,0,0.08)]" 
            : "bg-transparent border-transparent shadow-none"
        )}
      />

      <Container className={cn("flex items-center justify-between transition-all duration-700 relative z-10", isScrolled ? "py-3" : "py-5")}>
        <Link href="/" className="relative z-50 flex items-center gap-2 group">
          <Image 
            src={logoImg}
            alt="Porto Frame Logo" 
            priority
            unoptimized
            className={cn(
              "block object-contain object-left h-[55px] md:h-[68px] lg:h-[85px] w-auto origin-left transition-transform duration-300 ease-out",
              isScrolled ? "scale-[1.41]" : "scale-[1.66]"
            )}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-10">
          <Link href="/sobre" className={cn("font-medium tracking-wide transition-colors uppercase text-[14px] hover:text-primary", isScrolled ? "text-[#2E241F]" : "text-stone-900")}>
            Sobre
          </Link>
          <Link href="/wood-frame" className={cn("font-medium tracking-wide transition-colors uppercase text-[14px] hover:text-primary", isScrolled ? "text-[#2E241F]" : "text-stone-900")}>
            Wood Frame
          </Link>
          <Link href="/projetos" className={cn("font-medium tracking-wide transition-colors uppercase text-[14px] hover:text-primary", isScrolled ? "text-[#2E241F]" : "text-stone-900")}>
            Projetos
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center">
          <Link href="/contato">
            <Button variant="default" size="lg" className="font-bold transition-all duration-300 px-8 h-12 text-[13px] uppercase tracking-widest rounded-full hover:-translate-y-1 relative overflow-hidden group shadow-md hover:shadow-lg shadow-primary/20 hover:shadow-primary/30">
              <span className="relative z-10">Solicitar Orçamento</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0"></div>
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={cn("lg:hidden p-2 relative z-50 transition-colors", isScrolled ? "text-[#2E241F]" : "text-stone-900")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Container>

      {/* Mobile Navigation Full Screen */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-background flex flex-col p-6 lg:hidden transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="flex flex-col gap-6 items-center pt-32">
          <Link href="/sobre" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            Sobre a Porto Frame
          </Link>
          <Link href="/wood-frame" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            O que é Wood Frame
          </Link>
          <Link href="/vantagens" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            Vantagens
          </Link>
          <Link href="/projetos" className="text-2xl font-medium" onClick={() => setIsMobileMenuOpen(false)}>
            Projetos
          </Link>
          <Link href="/contato" className="w-full max-w-xs mt-8" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="default" size="lg" className="w-full text-lg h-14">
              Solicitar Orçamento
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
