import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import { Phone, Mail, MapPin } from "lucide-react"
import { ContactForm } from "@/components/forms/contact-form"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: `Contato ${siteConfig.name} | Solicite seu Orçamento`,
  description: "Fale com nossos especialistas em engenharia e solicite um orçamento sem compromisso para sua obra no Sul da Bahia.",
}

export default function ContatoPage() {
  return (
    <div className="flex flex-col w-full pt-[160px] lg:pt-[176px] pb-24">
      <Container className="max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground text-center">
          Dê o próximo passo com <br className="hidden md:block" />
          <span className="text-primary">segurança.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-16">
          Preencha o formulário abaixo e um especialista em Wood Frame entrará em contato para entender a viabilidade do seu projeto.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Informações de Contato Direto */}
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              <div className="flex flex-col gap-6">
                <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="block text-sm text-muted-foreground">Telefone / WhatsApp</span>
                    <span className="font-bold text-foreground">{siteConfig.contact.phoneDisplay}</span>
                  </div>
                </a>
                
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="block text-sm text-muted-foreground">E-mail</span>
                    <span className="font-bold text-foreground">{siteConfig.contact.email}</span>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="block text-sm text-muted-foreground">Atendimento</span>
                    <span className="font-bold text-foreground">{siteConfig.contact.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Área Reservada para o Formulário RHF + Zod */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Solicitar Orçamento / Contato</h3>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  )
}
