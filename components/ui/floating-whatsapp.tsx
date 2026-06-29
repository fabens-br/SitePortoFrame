"use client"

import * as React from "react"
import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/config/site"

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    // Atrasar a exibição inicial para não competir com a atenção do Hero
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <a
      href={`https://wa.me/${siteConfig.contact.phone.replace("+", "")}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[99] bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 flex items-center justify-center animate-in slide-in-from-bottom-10 fade-in group"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle size={32} />
      {/* Tooltip escondido que aparece no hover (apenas desktop) */}
      <span className="absolute right-full mr-4 bg-background text-foreground text-sm font-semibold py-2 px-4 rounded-lg shadow-md border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block whitespace-nowrap">
        Fale com um Especialista
      </span>
    </a>
  )
}
