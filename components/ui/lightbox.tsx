"use client"

import { useState, useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

type LightboxProps = {
  images: string[]
  initialIndex: number
  onClose: () => void
}

export function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") showNext()
      if (e.key === "ArrowLeft") showPrev()
    }
    
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)
    
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose, showNext, showPrev])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-in fade-in duration-300">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
      >
        <X size={32} />
      </button>

      {images.length > 1 && (
        <button 
          onClick={showPrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
        >
          <ChevronLeft size={48} />
        </button>
      )}

      {images.length > 1 && (
        <button 
          onClick={showNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
        >
          <ChevronRight size={48} />
        </button>
      )}

      <div className="relative w-full max-w-6xl max-h-[85vh] px-16 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={images[currentIndex]} 
          alt={`Imagem ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain select-none animate-in fade-in zoom-in-95 duration-300"
        />
        
        {images.length > 1 && (
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-widest">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-0" onClick={onClose} />
    </div>
  )
}
