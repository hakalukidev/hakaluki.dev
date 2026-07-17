"use client"

import React, { MouseEvent, useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { useSound } from "@/lib/sound-context"

interface RippleButtonOwnProps {
  rippleColor?: string
  duration?: string
  className?: string
  children?: React.ReactNode
}

type RippleButtonAsButton = RippleButtonOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href"> & { href?: undefined }

type RippleButtonAsAnchor = RippleButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string }

export type RippleButtonProps = RippleButtonAsButton | RippleButtonAsAnchor

export const RippleButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  RippleButtonProps
>(
  (
    {
      className,
      children,
      rippleColor = "#ffffff",
      duration = "600ms",
      onClick,
      onMouseEnter,
      href,
      ...props
    },
    ref
  ) => {
    const { play } = useSound()
    const [buttonRipples, setButtonRipples] = useState<
      Array<{ x: number; y: number; size: number; key: number }>
    >([])

    const createRipple = (
      event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      const target = event.currentTarget
      const rect = target.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = event.clientX - rect.left - size / 2
      const y = event.clientY - rect.top - size / 2

      const newRipple = { x, y, size, key: Date.now() }
      setButtonRipples((prevRipples) => [...prevRipples, newRipple])
    }

    const handleClick = (
      event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
    ) => {
      createRipple(event)
      play("click")
      onClick?.(event)
    }

    const handleMouseEnter = (
      event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>
    ) => {
      play("hover")
      onMouseEnter?.(event)
    }

    useEffect(() => {
      let timeout: ReturnType<typeof setTimeout> | null = null

      if (buttonRipples.length > 0) {
        const lastRipple = buttonRipples[buttonRipples.length - 1]
        timeout = setTimeout(() => {
          setButtonRipples((prevRipples) =>
            prevRipples.filter((ripple) => ripple.key !== lastRipple.key)
          )
        }, parseInt(duration))
      }

      return () => {
        if (timeout !== null) {
          clearTimeout(timeout)
        }
      }
    }, [buttonRipples, duration])

    const content = (
      <>
        <div className="relative z-10">{children}</div>
        <span className="pointer-events-none absolute inset-0">
          {buttonRipples.map((ripple) => (
            <span
              className="animate-rippling bg-background absolute rounded-full opacity-30"
              key={ripple.key}
              style={
                {
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  top: `${ripple.y}px`,
                  left: `${ripple.x}px`,
                  backgroundColor: rippleColor,
                  transform: `scale(0)`,
                  "--duration": duration,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </>
    )

    const sharedClassName = cn(
      "relative flex cursor-pointer items-center justify-center overflow-hidden text-center",
      className
    )

    if (href) {
      return (
        <a
          href={href}
          className={sharedClassName}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          ref={ref as React.Ref<HTMLAnchorElement>}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        className={sharedClassName}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  }
)

RippleButton.displayName = "RippleButton"
