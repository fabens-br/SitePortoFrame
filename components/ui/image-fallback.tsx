"use client"

import * as React from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"

/**
 * ImageFallback
 * 
 * Client Component isolado para gerenciar eventos de onLoad e onError do Next/Image.
 * Evita erros de runtime no Next.js 15 (Server Components não aceitam event handlers).
 * Utilizado para esconder skeletons e placeholders caso a imagem não exista.
 */
export function ImageFallback({ className, alt, ...props }: ImageProps) {
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  // Se a imagem falhar ao carregar (ex: placeholder inexistente), não renderiza a tag
  if (hasError) return null

  return (
    <Image
      alt={alt || ""}
      {...props}
      className={cn(
        className,
        "transition-opacity duration-700",
        isLoaded ? "opacity-100" : "opacity-0"
      )}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
    />
  )
}
