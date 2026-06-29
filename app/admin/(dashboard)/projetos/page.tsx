"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Star, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type Project = {
  id: string
  nome: string
  cidade: string
  cover_image: string | null
  featured: boolean
}

export default function ProjetosListPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch("/api/projects")
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || "Erro HTTP ao buscar projetos.")
      }
      
      if (!Array.isArray(data)) {
        throw new Error("Formato inválido: a API não retornou uma lista de projetos.")
      }
      
      setProjects(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Erro crítico ao buscar projetos:", err.message)
        setError(err.message)
      } else {
        console.error("Erro crítico ao buscar projetos:", err)
        setError("Erro desconhecido ao carregar projetos.")
      }
      setProjects([]) // Garante que nunca seja null ou object
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, nome: string) => {
    if (confirm(`Deseja realmente excluir o projeto "${nome}"?`)) {
      try {
        await fetch(`/api/projects/${id}`, { method: "DELETE" })
        fetchProjects() // refresh list
      } catch {
        alert("Erro ao excluir projeto")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link href="/admin/projetos/novo">
          <Button className="gap-2">
            <Plus size={16} />
            Novo Projeto
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-stone-500">Carregando projetos...</div>
        ) : error ? (
          <div className="p-12 text-center text-red-500 flex flex-col items-center">
            <h3 className="font-semibold text-lg mb-2">Falha no carregamento</h3>
            <p className="text-sm mb-4">{error}</p>
            <Button variant="outline" onClick={fetchProjects}>Tentar Novamente</Button>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-stone-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="text-stone-300" size={32} />
            </div>
            <h3 className="font-semibold text-lg text-stone-900 mb-1">Nenhum projeto cadastrado.</h3>
            <p className="text-sm">Clique em Novo Projeto para começar.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col sm:flex-row gap-4 p-4 items-center hover:bg-stone-50 transition-colors">
                <div className="h-16 w-24 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0 relative">
                  {project.cover_image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={project.cover_image} alt={project.nome} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300 text-xs">Sem Foto</div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-stone-900 truncate">{project.nome}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-stone-500 truncate">{project.cidade}</p>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider">
                        <Star size={10} className="fill-orange-700" />
                        Destaque
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/projetos/${project.id}/editar`}>
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-stone-600 hover:text-primary">
                      <Edit size={14} />
                      <span className="hidden sm:inline">Editar</span>
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50 px-2"
                    onClick={() => handleDelete(project.id, project.nome)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
