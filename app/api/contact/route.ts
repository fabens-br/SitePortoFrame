import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import prisma from "@/lib/prisma"
import { z } from "zod"
const contactSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10),
  projectType: z.string().min(1),
  message: z.string().optional(),
  // Honeypot field
  botField: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // 1. Validar Anti-spam (Honeypot)
    if (body.botField && body.botField.length > 0) {
      // Se preenchido, é um bot. Simulamos sucesso silencioso.
      return NextResponse.json({ success: true })
    }

    // 2. Validar payload via Zod
    const validatedData = contactSchema.parse(body)
    const { name, email, phone, projectType, message } = validatedData

    // Sanitizar (trim) - O Zod já garante que são strings, o trim pode ser manual aqui:
    const sanitizedName = name.trim()
    const sanitizedEmail = email.trim()
    const sanitizedPhone = phone.trim()
    const sanitizedProjectType = projectType.trim()
    const sanitizedMessage = message?.trim() || ""

    // 3. Extrair metadados
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "0.0.0.0"
    const userAgent = req.headers.get("user-agent") || "Unknown"
    
    const now = new Date()
    // Utilizando o locale brasileiro
    const dateStr = now.toLocaleDateString("pt-BR")
    const timeStr = now.toLocaleTimeString("pt-BR")

    // 4. Salvar Lead no Banco de Dados
    await prisma.lead.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        phone: sanitizedPhone,
        project_type: sanitizedProjectType,
        message: sanitizedMessage,
        ip: ip,
        user_agent: userAgent,
      }
    })

    // 5. Enviar E-mail via Resend
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #D9772B; padding: 24px; text-align: center;">
          <h2 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">
            Novo Pedido de Orçamento
          </h2>
        </div>
        
        <div style="padding: 32px; background-color: #fafafa;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Nome:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${sanitizedName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>E-mail:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${sanitizedEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Telefone:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${sanitizedPhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Tipo do Projeto:</strong></td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${sanitizedProjectType}</td>
            </tr>
          </table>

          <div style="margin-top: 24px;">
            <strong style="display: block; margin-bottom: 8px;">Detalhes:</strong>
            <div style="background-color: #ffffff; padding: 16px; border: 1px solid #eee; border-radius: 6px; min-height: 80px; white-space: pre-wrap;">
${sanitizedMessage || "Nenhum detalhe adicional fornecido."}
            </div>
          </div>
        </div>

        <div style="background-color: #1c1917; color: #a8a29e; padding: 24px; font-size: 12px; line-height: 1.6;">
          <p style="margin: 0 0 16px 0; text-align: center; color: #ffffff; font-weight: bold;">
            Porto Frame - Sistema Construtivo Inteligente
          </p>
          <table style="width: 100%;">
            <tr>
              <td><strong>Data:</strong> ${dateStr}</td>
              <td><strong>Hora:</strong> ${timeStr}</td>
            </tr>
            <tr>
              <td><strong>IP:</strong> ${ip}</td>
              <td><strong>User Agent:</strong> ${userAgent}</td>
            </tr>
          </table>
        </div>
      </div>
    `

    // Ocultar a falta de SMTP_USER se estiver num dev sem configuração, para que a inserção no banco funcione
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      if (!process.env.EMAIL_TO) {
        throw new Error("A variável de ambiente EMAIL_TO precisa estar configurada.")
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE !== "false", // default to true
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: process.env.SMTP_USER, // O próprio e-mail autenticado
        to: process.env.EMAIL_TO,
        subject: "🏡 Novo Pedido de Orçamento - Porto Frame",
        html: htmlContent,
      })
    } else {
      console.log("SMTP_USER não configurado. Simulando envio do e-mail.")
      console.log("Conteúdo:", htmlContent)
    }

    return NextResponse.json({ success: true, message: "Orçamento solicitado com sucesso." }, { status: 200 })

  } catch (error) {
    console.error("Erro ao enviar formulário de contato:", error)
    
    // Tratamento básico para erros do Zod ou outros
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: "Dados inválidos." }, { status: 400 })
    }

    return NextResponse.json(
      { success: false, message: "Não foi possível enviar sua solicitação." }, 
      { status: 500 }
    )
  }
}
