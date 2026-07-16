"use client"

import { memo } from "react"

import { cn } from "@/lib/utils"

export interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export const AuroraText = memo(function AuroraText({
  children,
  className,
  colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
  speed = 1,
}: AuroraTextProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className="animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
          animationDuration: `${10 / speed}s`,
        }}
      >
        {children}
      </span>
    </span>
  )
})
