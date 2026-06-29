"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProjetosError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Registra o console.error detalhado como solicitado
    console.error("Erro crítico no módulo de Projetos:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white border border-red-200 rounded-xl shadow-sm">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="text-red-500" size={32} />
      </div>
      <h2 className="text-xl font-bold text-stone-900 mb-2">Ops! Algo deu errado.</h2>
      <p className="text-stone-500 text-center max-w-md mb-6">
        Ocorreu um erro inesperado ao renderizar o módulo de projetos. O erro já foi registrado no console e o painel principal continua funcionando.
      </p>
      <Button onClick={() => reset()} className="gap-2" variant="outline">
        <RefreshCcw size={16} />
        Tentar Novamente
      </Button>
    </div>
  )
}
