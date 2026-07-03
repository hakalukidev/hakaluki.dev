"use client"

import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type DotBrandTextProps = {
  className?: string
}

const brandLetters = "hakaluki.dev".split("")

export function DotBrandText({ className }: DotBrandTextProps) {
  return (
    <span className={cn("dot-brand-text", className)} aria-label="hakaluki.dev">
      <span className="dot-brand-mark" aria-hidden="true">
        &lt;
      </span>
      {brandLetters.map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={cn(
            "dot-brand-letter",
            index === 0 && "dot-brand-letter-accent",
            letter === "." && "dot-brand-letter-dot"
          )}
          style={{ "--letter-index": index } as CSSProperties}
          aria-hidden="true"
        >
          {letter}
        </span>
      ))}
      <span className="dot-brand-mark dot-brand-mark-end" aria-hidden="true">
        /&gt;
      </span>
      <span className="dot-brand-cursor" aria-hidden="true" />
    </span>
  )
}
