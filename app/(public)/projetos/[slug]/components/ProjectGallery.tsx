"use client"

import { useState } from "react"
import { Lightbox } from "@/components/ui/lightbox"
import { Image as ImageIcon } from "lucide-react"

type ProjectGalleryProps = {
  images: { id: string, image_url: string }[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const openLightbox = (index: number) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
  }

  if (images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
        {images.map((img, index) => (
          <div 
            key={img.id} 
            onClick={() => openLightbox(index)}
            className="relative aspect-square cursor-pointer rounded-2xl overflow-hidden bg-stone-100 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.image_url} 
              alt="Galeria" 
              className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <ImageIcon size={32} className="text-white drop-shadow-md" />
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox 
          images={images.map(i => i.image_url)}
          initialIndex={photoIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  )
}
