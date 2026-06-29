"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable"
import { SortableImage } from "./SortableImage"
import { UploadCloud, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

type ProjectFormProps = {
  initialData?: {
    id?: string
    nome: string
    cidade: string
    descricao: string
    featured: boolean
    images?: { id: string; image_url: string }[]
  }
  isEdit?: boolean
}

type ImageItem = {
  id: string
  image_url: string
}

export function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState(initialData?.nome || "")
  const [cidade, setCidade] = useState(initialData?.cidade || "")
  const [descricao, setDescricao] = useState(initialData?.descricao || "")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [images, setImages] = useState<ImageItem[]>(
    initialData?.images?.map((img) => ({
      id: img.id || Math.random().toString(),
      image_url: img.image_url,
    })) || []
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id)
        const newIndex = items.findIndex((i) => i.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    
    setLoading(true)
    const files = Array.from(e.target.files)
    
    for (const file of files) {
      const formData = new FormData()
      formData.append("file", file)
      
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
        const data = await res.json()
        
        if (data.url) {
          setImages(prev => [...prev, { id: Math.random().toString(), image_url: data.url }])
        }
      } catch (error) {
        console.error("Upload error:", error)
      }
    }
    setLoading(false)
  }

  const handleRemoveImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      nome,
      cidade,
      descricao,
      featured,
      images,
    }

    try {
      const url = isEdit ? `/api/projects/${initialData?.id}` : "/api/projects"
      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push("/admin/projetos")
        router.refresh()
      } else {
        alert("Erro ao salvar projeto")
      }
    } catch (error) {
      console.error(error)
      alert("Erro de conexão")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8 pb-20">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/admin/projetos">
          <Button type="button" variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft size={20} />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-stone-900">Nome do Projeto *</label>
          <input 
            type="text" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-stone-50 focus:bg-white transition-colors"
            placeholder="Ex: Casa Trancoso"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-stone-900">Cidade *</label>
          <input 
            type="text" 
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-stone-50 focus:bg-white transition-colors"
            placeholder="Ex: Trancoso - BA"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-semibold text-stone-900">Descrição Curta</label>
          <textarea 
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-stone-50 focus:bg-white transition-colors resize-none"
            placeholder="Conte um pouco sobre as características arquitetônicas do projeto..."
          />
        </div>

        <div className="md:col-span-2 pt-2 border-t border-stone-100 flex items-center gap-3">
          <input 
            type="checkbox" 
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary"
          />
          <label htmlFor="featured" className="text-sm font-medium text-stone-900 cursor-pointer">
            ⭐ Destacar este projeto na Home (Será exibido na vitrine principal)
          </label>
        </div>
      </div>

      {/* Galeria Drag and Drop */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div>
          <h3 className="text-lg font-bold text-stone-900">Galeria de Imagens</h3>
          <p className="text-sm text-muted-foreground mt-1">A primeira imagem será automaticamente definida como a capa. Arraste para reordenar.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={images.map(i => i.id)} strategy={rectSortingStrategy}>
              {images.map((img, index) => (
                <SortableImage 
                  key={img.id} 
                  id={img.id} 
                  url={img.image_url} 
                  isCover={index === 0} 
                  onRemove={handleRemoveImage} 
                />
              ))}
            </SortableContext>
          </DndContext>

          {/* Upload Button */}
          <div className="relative border-2 border-dashed border-stone-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors aspect-[4/3] min-h-[128px]">
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              disabled={loading}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-500 pointer-events-none">
              <UploadCloud size={24} className="mb-2" />
              <span className="text-xs font-semibold uppercase tracking-wider text-center px-2">Adicionar<br/>Imagens</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t border-stone-200 pt-6">
        <Link href="/admin/projetos">
          <Button type="button" variant="outline" className="h-12 px-6">Cancelar</Button>
        </Link>
        <Button type="submit" className="h-12 px-8" disabled={loading}>
          {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
          {loading ? "Salvando..." : "Salvar Projeto"}
        </Button>
      </div>
    </form>
  )
}
