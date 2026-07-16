"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "framer-motion"

import { cn } from "@/lib/utils"

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: string
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.35"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <span
        className="flex max-w-md flex-wrap text-base font-medium md:text-lg lg:text-xl"
        style={{ fontFamily: "var(--font-silkscreen), sans-serif" }}
      >
        {words.map((word, i) => {
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </span>
    </div>
  )
}

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
