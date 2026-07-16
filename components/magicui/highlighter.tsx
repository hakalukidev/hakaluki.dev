"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { annotate } from "rough-notation"
import type { RoughAnnotation } from "rough-notation/lib/model"
import { useInView } from "framer-motion"

interface HighlighterProps {
  children: ReactNode
  action?: "highlight" | "underline" | "box" | "circle" | "strike-through" | "crossed-off" | "bracket"
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const annotationRef = useRef<RoughAnnotation | null>(null)
  const isInView = useInView(elementRef, {
    once: true,
    margin: "-10%",
  })

  const shouldShow = isView ? isInView : true

  useEffect(() => {
    if (!shouldShow) return

    const element = elementRef.current
    if (!element) return

    let cancelled = false
    let rafId: number
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null

    // The element may still be mid-transform (e.g. a parent's
    // whileInView slide/fade animation) when it first enters the
    // viewport. Drawing immediately snapshots a stale position, so wait
    // for its bounding rect to stop moving before annotating it.
    let lastRect = element.getBoundingClientRect()
    let stableFrames = 0
    let framesElapsed = 0
    const MAX_SETTLE_FRAMES = 90 // ~1.5s at 60fps safety cap
    const settleThenShow = () => {
      if (cancelled) return
      const rect = element.getBoundingClientRect()
      const isStable =
        Math.round(rect.x) === Math.round(lastRect.x) &&
        Math.round(rect.y) === Math.round(lastRect.y) &&
        Math.round(rect.width) === Math.round(lastRect.width) &&
        Math.round(rect.height) === Math.round(lastRect.height)
      lastRect = rect
      stableFrames = isStable ? stableFrames + 1 : 0
      framesElapsed++

      if (stableFrames < 3 && framesElapsed < MAX_SETTLE_FRAMES) {
        rafId = requestAnimationFrame(settleThenShow)
        return
      }

      annotation = annotate(element, {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      })
      annotationRef.current = annotation
      annotation.show()

      resizeObserver = new ResizeObserver(() => {
        annotation?.hide()
        annotation?.show()
      })
      resizeObserver.observe(element)
    }

    rafId = requestAnimationFrame(settleThenShow)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      resizeObserver?.disconnect()
      annotation?.remove()
    }
  }, [shouldShow, action, color, strokeWidth, animationDuration, iterations, padding, multiline])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}
