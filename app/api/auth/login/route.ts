import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Credenciais hardcoded temporárias (Fase 10)
    if (username === "admin" && password === "admin") {
      const response = NextResponse.json({ success: true })
      
      response.cookies.set({
        name: "porto_frame_admin_token",
        value: "authenticated",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 semana
        path: "/",
      })

      return response
    }

    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 })
  } catch {
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 })
  }
}
