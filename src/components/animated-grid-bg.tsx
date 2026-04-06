"use client"

import { useEffect, useRef } from "react"

/**
 * Animated dot-grid background — matches the DataBlue Dot font aesthetic.
 * Canvas-based with mouse-reactive glow and accent blue radial wash.
 */
export function AnimatedGridBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    const DOT_SPACING = 28
    const DOT_RADIUS = 1.5
    const GLOW_RADIUS = 220
    const WAVE_SPEED = 0.0006

    function resize() {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas!.parentElement!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse.current.x = e.clientX - rect.left
      mouse.current.y = e.clientY - rect.top
    }

    function handleMouseLeave() {
      mouse.current.x = -1000
      mouse.current.y = -1000
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height)

      const isDark = document.documentElement.classList.contains("dark")

      // ── Accent radial wash behind the grid ──
      const washGrad = ctx!.createRadialGradient(
        width * 0.5, height * 0.35, 0,
        width * 0.5, height * 0.35, width * 0.5
      )
      if (isDark) {
        washGrad.addColorStop(0, "rgba(106, 130, 255, 0.06)")
        washGrad.addColorStop(0.5, "rgba(106, 130, 255, 0.02)")
        washGrad.addColorStop(1, "transparent")
      } else {
        washGrad.addColorStop(0, "rgba(26, 60, 255, 0.04)")
        washGrad.addColorStop(0.5, "rgba(26, 60, 255, 0.015)")
        washGrad.addColorStop(1, "transparent")
      }
      ctx!.fillStyle = washGrad
      ctx!.fillRect(0, 0, width, height)

      // ── Dot grid ──
      const cols = Math.ceil(width / DOT_SPACING) + 1
      const rows = Math.ceil(height / DOT_SPACING) + 1
      const mx = mouse.current.x
      const my = mouse.current.y
      const baseColor = isDark ? "255,255,255" : "10,10,10"
      const accentColor = isDark ? "106,130,255" : "26,60,255"

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * DOT_SPACING
          const y = row * DOT_SPACING

          // Wave animation — two overlapping sine waves
          const wave1 = Math.sin(time * WAVE_SPEED + col * 0.12 + row * 0.08) * 0.5 + 0.5
          const wave2 = Math.sin(time * WAVE_SPEED * 1.3 + col * 0.08 - row * 0.15) * 0.5 + 0.5
          const wave = wave1 * 0.6 + wave2 * 0.4

          // Distance to mouse
          const dx = x - mx
          const dy = y - my
          const dist = Math.sqrt(dx * dx + dy * dy)

          // Mouse glow factor
          const glow = Math.max(0, 1 - dist / GLOW_RADIUS)
          const glowEased = glow * glow // Quadratic falloff

          // Center proximity factor (dots near center are slightly more visible)
          const cx = Math.abs(x - width * 0.5) / (width * 0.5)
          const cy = Math.abs(y - height * 0.4) / (height * 0.5)
          const centerFade = Math.max(0, 1 - (cx * cx + cy * cy) * 0.4)

          // Final opacity
          const baseOpacity = (0.05 + wave * 0.06) * (0.5 + centerFade * 0.5)
          const opacity = baseOpacity + glowEased * 0.5

          // Radius
          const radius = DOT_RADIUS + glowEased * 2.5

          // Color — transition from neutral to accent near mouse
          const color = glowEased > 0.05 ? accentColor : baseColor

          ctx!.beginPath()
          ctx!.arc(x, y, radius, 0, Math.PI * 2)
          ctx!.fillStyle = `rgba(${color}, ${opacity})`
          ctx!.fill()

          // Glow ring around dots near mouse
          if (glowEased > 0.2) {
            ctx!.beginPath()
            ctx!.arc(x, y, radius + 3, 0, Math.PI * 2)
            ctx!.fillStyle = `rgba(${accentColor}, ${glowEased * 0.08})`
            ctx!.fill()
          }
        }
      }

      // ── Mouse spotlight glow ──
      if (mx > 0 && my > 0) {
        const spotGrad = ctx!.createRadialGradient(mx, my, 0, mx, my, GLOW_RADIUS)
        spotGrad.addColorStop(0, isDark ? "rgba(106,130,255,0.05)" : "rgba(26,60,255,0.035)")
        spotGrad.addColorStop(1, "transparent")
        ctx!.fillStyle = spotGrad
        ctx!.fillRect(mx - GLOW_RADIUS, my - GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2)
      }

      raf.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)
    raf.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-auto absolute inset-0 z-0"
    />
  )
}
