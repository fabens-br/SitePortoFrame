"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ProjectForm } from "../../components/ProjectForm"

export default function EditarProjetoPage() {
  const params = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data)
        }
      } catch (error) {
        console.error("Erro ao carregar", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [params.id])

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Carregando dados do projeto...</div>
  }

  if (!project) {
    return <div className="p-8 text-center text-red-500">Projeto não encontrado.</div>
  }

  return (
    <div className="mx-auto">
      <ProjectForm isEdit={true} initialData={project} />
    </div>
  )
}
