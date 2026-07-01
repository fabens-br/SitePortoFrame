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
    published?: boolean
    status?: string
    images?: { id: string; image_url: string }[]
  }
  isEdit?: boolean
}

type FormImage = {
  id: string
  url: string
  file?: File
  isNew: boolean
}

export function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [nome, setNome] = useState(initialData?.nome || "")
  const [cidade, setCidade] = useState(initialData?.cidade || "")
  const [descricao, setDescricao] = useState(initialData?.descricao || "")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [published, setPublished] = useState(initialData?.published ?? true)
  const [status, setStatus] = useState(initialData?.status || "PUBLISHED")
  const [images, setImages] = useState<FormImage[]>(
    initialData?.images?.map((img) => ({
      id: img.id,
      url: img.image_url,
      isNew: false
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return
    
    const files = Array.from(e.target.files)
    const newImages = files.map(file => ({
      id: `new-${Math.random().toString(36).substr(2, 9)}`,
      url: URL.createObjectURL(file),
      file,
      isNew: true
    }))
    
    setImages(prev => [...prev, ...newImages])
    // clear input
    e.target.value = ''
  }

  const handleRemoveImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      const removed = prev.find(img => img.id === id);
      if (removed?.isNew && removed.url) {
        URL.revokeObjectURL(removed.url); // free memory
      }
      return filtered;
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("cidade", cidade);
    formData.append("descricao", descricao);
    formData.append("featured", featured.toString());
    formData.append("published", published.toString());
    formData.append("status", status);

    const existingImages: { id: string; url: string }[] = [];
    const layoutOrder: string[] = [];
    let newFileIndex = 0;

    images.forEach((img) => {
      if (img.isNew && img.file) {
        formData.append("images", img.file); // Para rota POST unificada
        formData.append("newImages", img.file); // Para rota PUT (isEdit)
        layoutOrder.push(`new-${newFileIndex}`);
        newFileIndex++;
      } else {
        existingImages.push({ id: img.id, url: img.url });
        layoutOrder.push(`old-${img.id}`);
      }
    });

    formData.append("existingImages", JSON.stringify(existingImages));
    formData.append("layoutOrder", JSON.stringify(layoutOrder));

    try {
      const url = isEdit ? `/api/projects/${initialData?.id}` : "/api/projects"
      const method = isEdit ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        body: formData,
      })

      if (res.ok) {
        router.push("/admin/projetos")
        router.refresh()
      } else {
        const err = await res.json()
        alert(`Erro ao salvar projeto: ${err.error || "Desconhecido"}`)
      }
    } catch (error) {
      console.error(error)
      alert("Erro de conexão. Verifique o console.")
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

        <div className="space-y-2">
          <label className="text-sm font-semibold text-stone-900">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-stone-50 focus:bg-white transition-colors"
          >
            <option value="DRAFT">Rascunho (DRAFT)</option>
            <option value="PUBLISHED">Publicado (PUBLISHED)</option>
            <option value="ARCHIVED">Arquivado (ARCHIVED)</option>
          </select>
        </div>

        <div className="flex flex-col gap-3 justify-center pt-2">
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary"
            />
            <label htmlFor="published" className="text-sm font-medium text-stone-900 cursor-pointer">
              Exibir publicamente no site
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-5 h-5 rounded border-stone-300 text-primary focus:ring-primary"
            />
            <label htmlFor="featured" className="text-sm font-medium text-stone-900 cursor-pointer">
              ⭐ Destacar na Home
            </label>
          </div>
        </div>
      </div>

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
                  url={img.url} 
                  isCover={index === 0} 
                  onRemove={handleRemoveImage} 
                />
              ))}
            </SortableContext>
          </DndContext>

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
