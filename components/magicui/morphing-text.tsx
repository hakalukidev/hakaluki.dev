"use client"

import { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const MORPH_TIME = 1.2
const COOLDOWN_TIME = 0.8

function useMorphingText(texts: string[], colors?: string[]) {
  const textIndexRef = useRef(0)
  const morphRef = useRef(0)
  const cooldownRef = useRef(0)
  const timeRef = useRef<number>(0)

  const text1Ref = useRef<HTMLSpanElement>(null)
  const text2Ref = useRef<HTMLSpanElement>(null)

  const setStyles = useCallback(
    (fraction: number) => {
      const current1 = text1Ref.current
      const current2 = text2Ref.current
      if (!current1 || !current2) return

      const index1 = textIndexRef.current % texts.length
      const index2 = (textIndexRef.current + 1) % texts.length

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`
      current2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`

      const invertedFraction = 1 - fraction
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`
      current1.style.opacity = `${Math.pow(invertedFraction, 0.4) * 100}%`

      current1.textContent = texts[index1]
      current2.textContent = texts[index2]

      if (colors) {
        current1.style.color = colors[index1 % colors.length]
        current2.style.color = colors[index2 % colors.length]
      }
    },
    [texts, colors]
  )

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current
    cooldownRef.current = 0

    let fraction = morphRef.current / MORPH_TIME

    if (fraction > 1) {
      cooldownRef.current = COOLDOWN_TIME
      fraction = 1
    }

    setStyles(fraction)

    if (fraction === 1) {
      textIndexRef.current++
    }
  }, [setStyles])

  const doCooldown = useCallback(() => {
    morphRef.current = 0
    const current1 = text1Ref.current
    const current2 = text2Ref.current
    if (current1 && current2) {
      current2.style.filter = "none"
      current2.style.opacity = "100%"
      current1.style.filter = "none"
      current1.style.opacity = "0%"
    }
  }, [])

  useEffect(() => {
    let animationFrameId: number
    timeRef.current = performance.now()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const now = performance.now()
      const dt = (now - timeRef.current) / 1000
      timeRef.current = now

      cooldownRef.current -= dt

      if (cooldownRef.current <= 0) doMorph()
      else doCooldown()
    }

    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [doMorph, doCooldown])

  return { text1Ref, text2Ref }
}

export interface MorphingTextProps {
  /** Phrases to morph between, in order. */
  texts: string[]
  /** Optional color per phrase (cycles if shorter than `texts`). */
  colors?: string[]
  className?: string
}

export function MorphingText({ texts, colors, className }: MorphingTextProps) {
  const { text1Ref, text2Ref } = useMorphingText(texts, colors)
  const longest = texts.reduce((a, b) => (b.length > a.length ? b : a), "")

  return (
    <span
      className={cn(
        "relative inline-block align-middle filter-[url(#morph-threshold)_blur(0.6px)]",
        className
      )}
    >
      <span className="invisible whitespace-nowrap">{longest}</span>
      <span ref={text1Ref} className="absolute inset-0" />
      <span ref={text2Ref} className="absolute inset-0" />
      <svg className="absolute h-0 w-0">
        <defs>
          <filter id="morph-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </span>
  )
}
