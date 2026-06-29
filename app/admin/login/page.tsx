"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        setError("Credenciais inválidas.")
      }
    } catch {
      setError("Ocorreu um erro ao tentar fazer login.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-stone-200/50 border border-stone-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Porto<span className="text-primary">Frame</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2 uppercase tracking-widest font-semibold">Backoffice Auth</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg text-center font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">Usuário</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-stone-50 focus:bg-white"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-stone-50 focus:bg-white"
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
            {loading ? "Autenticando..." : "Entrar no Sistema"}
          </Button>
        </form>
      </div>
    </div>
  )
}
