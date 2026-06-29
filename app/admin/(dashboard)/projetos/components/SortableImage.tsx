"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { X, GripVertical } from "lucide-react"

interface SortableImageProps {
  id: string
  url: string
  isCover: boolean
  onRemove: (id: string) => void
}

export function SortableImage({ id, url, isCover, onRemove }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-xl overflow-hidden group bg-stone-100 border-2 ${
        isCover ? "border-primary shadow-sm" : "border-transparent"
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="Galeria" className="w-full h-32 object-cover" />
      
      {/* Overlay de arraste e opções */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex flex-col justify-between p-2">
        
        {/* Top bar */}
        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity">
          <div 
            {...attributes} 
            {...listeners}
            className="p-1 bg-white/90 rounded-md cursor-grab active:cursor-grabbing text-stone-700 hover:text-primary transition-colors"
          >
            <GripVertical size={16} />
          </div>
          
          <button
            type="button"
            onClick={() => onRemove(id)}
            className="p-1 bg-white/90 rounded-md text-red-500 hover:bg-red-50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Bottom bar */}
        {isCover && (
          <div className="bg-primary text-white text-[10px] font-bold uppercase tracking-wider text-center py-1 rounded-md opacity-100">
            Capa do Projeto
          </div>
        )}
      </div>
    </div>
  )
}
