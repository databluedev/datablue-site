"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ScrollMorphFooter({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const containerRef = React.useRef<HTMLDivElement>(null)
  const pathRef = React.useRef<SVGPathElement>(null)
  const clipPathRef = React.useRef<SVGPathElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const velocityRef = React.useRef(0)
  const lastScrollRef = React.useRef(0)
  const lastTimeRef = React.useRef(Date.now())
  const springCurveRef = React.useRef(0)
  const rafRef = React.useRef<number>(0)

  React.useEffect(() => {
    const stiffness = 0.04
    const damping = 0.82
    const maxCurve = 60

    function onScroll() {
      const now = Date.now()
      const dt = Math.max(1, now - lastTimeRef.current)
      const scrollY = window.scrollY
      const delta = scrollY - lastScrollRef.current
      velocityRef.current = Math.max(-3, Math.min(3, delta / dt))
      lastScrollRef.current = scrollY
      lastTimeRef.current = now
    }

    function animate() {
      const el = containerRef.current
      const path = pathRef.current
      const clipPath = clipPathRef.current
      const content = contentRef.current
      if (!el || !path || !clipPath || !content) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const raw = (windowH - rect.top) / (windowH * 0.75)
      const progress = Math.max(0, Math.min(1, raw))

      // Spring velocity curve
      const target = velocityRef.current * maxCurve
      springCurveRef.current += (target - springCurveRef.current) * stiffness
      springCurveRef.current *= damping
      velocityRef.current *= 0.95
      const velCurve = springCurveRef.current

      // Curve position: rises from 100 (bottom) to 25 (75% coverage)
      const curveY = 100 - progress * 75
      const baseCurve = Math.max(0, 12 * (1 - progress * 0.8))
      const totalCurve = baseCurve + velCurve * (1 - progress * 0.5)

      const edgeY = curveY + Math.abs(totalCurve) * 0.2
      const peak = curveY - totalCurve

      const d = `M 0 ${edgeY} Q 50 ${peak} 100 ${edgeY} L 100 100 L 0 100 Z`
      path.setAttribute("d", d)
      clipPath.setAttribute("d", d)

      // Content opacity
      const contentOpacity = Math.max(0, (progress - 0.35) / 0.65)
      const contentTranslate = Math.max(0, (1 - contentOpacity) * 40)
      content.style.opacity = String(contentOpacity)
      content.style.transform = `translateY(${contentTranslate}px)`

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "100vh", marginTop: "-25vh" }}
    >
      {/* Continuation of Shell layout lines */}
      <div className="absolute inset-0 mx-auto max-w-[1280px] pointer-events-none" style={{ zIndex: 30 }}>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-border" />
      </div>

      <div className="sticky top-0 h-screen w-full" style={{ zIndex: 20 }}>
        {/* SVG shape — visual black curve */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          <path
            ref={pathRef}
            d="M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z"
            fill={mounted && resolvedTheme === "dark" ? "white" : "black"}
          />
        </svg>

        {/* Footer content — clipped to the SVG shape */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <clipPath id="footer-clip" clipPathUnits="objectBoundingBox" transform="scale(0.01)">
              <path
                ref={clipPathRef}
                d="M 0 100 Q 50 100 100 100 L 100 100 L 0 100 Z"
              />
            </clipPath>
          </defs>
        </svg>

        <div
          ref={contentRef}
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: "url(#footer-clip)",
            opacity: 0,
            pointerEvents: "auto",
          }}
        >
          <div className={`absolute bottom-0 left-0 right-0 ${mounted && resolvedTheme === "dark" ? "text-black" : "text-white"}`} style={{ maxHeight: "75vh" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
