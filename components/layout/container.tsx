import * as React from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export function Container({ className, as: Component = "div", ...props }: ContainerProps) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-12", className)}
      {...props}
    />
  )
}
