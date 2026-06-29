"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle2, XCircle } from "lucide-react"

// Esquema de validação com Zod
const contactFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  message: z.string().optional(),
  botField: z.string().optional(), // Honeypot
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)
    setIsError(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Falha no envio")
      }

      setIsSuccess(true)
      reset()
      
      // Esconder mensagem de sucesso após alguns segundos
      setTimeout(() => setIsSuccess(false), 6000)
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-xl border border-green-200 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 size={48} className="text-green-600 mb-4" />
        <h4 className="text-xl font-bold mb-2 text-green-800">✅ Solicitação enviada com sucesso!</h4>
        <p className="text-green-700">
          Recebemos sua solicitação.<br/>
          Nossa equipe analisará as informações e entrará em contato em breve.
        </p>
        <Button variant="outline" className="mt-6 border-green-300 text-green-700 hover:bg-green-100" onClick={() => setIsSuccess(false)}>
          Enviar nova mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Honeypot anti-spam (invisível para o usuário) */}
      <div className="hidden" aria-hidden="true">
        <input type="text" {...register("botField")} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm font-semibold">Nome Completo</label>
        <input 
          id="name"
          type="text" 
          placeholder="Ex: João Silva" 
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          {...register("name")}
        />
        {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold">E-mail</label>
          <input 
            id="email"
            type="email" 
            placeholder="joao@exemplo.com" 
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            {...register("email")}
          />
          {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-semibold">Telefone / WhatsApp</label>
          <input 
            id="phone"
            type="tel" 
            placeholder="(00) 00000-0000" 
            className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            {...register("phone")}
          />
          {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="projectType" className="text-sm font-semibold">Tipo de Projeto</label>
        <select 
          id="projectType"
          className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
          {...register("projectType")}
        >
          <option value="">Selecione o tipo de projeto...</option>
          <option value="construcao-terreno-proprio">Construção em Terreno Próprio</option>
          <option value="terreno-e-construcao">Aquisição de Terreno + Construção</option>
          <option value="projeto-comercial">Projeto Comercial / Pousada</option>
          <option value="outro">Outro</option>
        </select>
        {errors.projectType && <span className="text-xs text-destructive">{errors.projectType.message}</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-semibold">Detalhes do Projeto (Opcional)</label>
        <textarea 
          id="message"
          rows={4}
          placeholder="Conte-nos um pouco mais sobre o que você deseja construir..." 
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y"
          {...register("message")}
        />
      </div>

      {isError && (
        <div className="flex items-center gap-3 p-4 bg-destructive/10 text-destructive rounded-md border border-destructive/20 animate-in fade-in">
          <XCircle size={20} />
          <span className="text-sm font-medium">❌ Não foi possível enviar sua solicitação. Tente novamente em alguns instantes.</span>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full font-bold gap-2 mt-2" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Solicitar Orçamento Especializado"}
        {!isSubmitting && <Send size={18} />}
      </Button>
      
      <p className="text-xs text-center text-muted-foreground mt-2">
        Ao enviar, você concorda com nossa <a href="/politica-de-privacidade" className="underline hover:text-primary">Política de Privacidade</a>.
      </p>
    </form>
  )
}

