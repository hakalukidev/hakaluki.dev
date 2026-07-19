"use client"

import {
  Fragment,
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
  decor?: ReactNode[]
}

export const TextReveal: FC<TextRevealProps> = ({ children, className, decor }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.35"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  const decorAfterWord = new Map<number, ReactNode[]>()
  if (decor && decor.length > 0) {
    const step = words.length / (decor.length + 1)
    let lastIndex = -1
    decor.forEach((node, i) => {
      const idealIndex = clampIndex(Math.round(step * (i + 1)) - 1, words.length - 1)
      const wordIndex = clampIndex(Math.max(idealIndex, lastIndex + 1), words.length - 1)
      lastIndex = wordIndex
      const existing = decorAfterWord.get(wordIndex)
      if (existing) {
        existing.push(node)
      } else {
        decorAfterWord.set(wordIndex, [node])
      }
    })
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <span
        className="flex max-w-md flex-wrap items-center text-base font-medium md:text-lg lg:text-xl"
        style={{ fontFamily: "var(--font-silkscreen), sans-serif" }}
      >
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Fragment key={i}>
              <Word progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
              {decorAfterWord.get(i)}
            </Fragment>
          )
        })}
      </span>
    </div>
  )
}

const clampIndex = (value: number, max: number) => Math.min(max, Math.max(0, value))

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="relative mx-1 lg:mx-1.5">
      <span
        className="absolute opacity-30"
        style={{ color: "var(--text-faint)" }}
      >
        {children}
      </span>
      <motion.span style={{ opacity: opacity, color: "var(--text-strong)" }}>
        {children}
      </motion.span>
    </span>
  )
}
