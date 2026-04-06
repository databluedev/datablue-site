"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  stagger?: number
  variant?: "up" | "scale" | "left" | "right"
  threshold?: number
}

export function ScrollReveal({
  children,
  className,
  stagger,
  variant = "up",
  threshold = 0.08,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [inView, setInView] = useState(false)

  // Only hide content after client hydration (SSR renders visible)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const el = ref.current
    if (!el) return

    // If element is already in viewport on mount, reveal immediately
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Small delay for stagger effect even on initial visible elements
      const delay = stagger ? stagger * 60 : 0
      setTimeout(() => setInView(true), delay)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted, threshold, stagger])

  const variantClass =
    variant === "scale"
      ? "reveal-scale"
      : variant === "left"
        ? "reveal-left"
        : variant === "right"
          ? "reveal-right"
          : "reveal"

  return (
    <div
      ref={ref}
      className={cn(
        // Only apply hidden state after mount (SSR renders visible)
        mounted && !inView && variantClass,
        mounted && inView && `${variantClass} in-view`,
        stagger && `stagger-${stagger}`,
        className
      )}
    >
      {children}
    </div>
  )
}
