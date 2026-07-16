"use client"

import React, { useEffect, useMemo, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 40 }}
      layout
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps {
  children: ReactNode
  className?: string
  delay?: number
}

export const AnimatedList = React.memo(function AnimatedList({
  children,
  className,
  delay = 1000,
}: AnimatedListProps) {
  const [index, setIndex] = useState(0)
  const items = useMemo(() => React.Children.toArray(children), [children])

  useEffect(() => {
    if (index >= items.length - 1) return

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1)
    }, delay)

    return () => clearTimeout(timeout)
  }, [index, delay, items.length])

  const visibleItems = items.slice(0, index + 1)

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <AnimatePresence initial={false}>
        {visibleItems.map((item) => (
          <AnimatedListItem key={(item as React.ReactElement).key}>
            {item}
          </AnimatedListItem>
        ))}
      </AnimatePresence>
    </div>
  )
})
