"use client"

import { useTheme } from "next-themes"
import { useCallback } from "react"

export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = useCallback(
    (e: React.MouseEvent) => {
      const isDark = resolvedTheme === "dark"
      const newTheme = isDark ? "light" : "dark"

      const x = e.clientX
      const y = e.clientY

      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )

      if (
        !document.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        setTheme(newTheme)
        return
      }

      const isShrink = isDark // dark→light = shrink

      // Inject styles BEFORE transition captures snapshots
      const style = document.createElement("style")
      style.id = "vt-theme"

      if (isShrink) {
        // Dark→Light: old (dark) on top, shrinks away
        style.textContent = `
          ::view-transition-old(root) { z-index: 9999 !important; }
          ::view-transition-new(root) { z-index: 1 !important; }
        `
      } else {
        // Light→Dark: new (dark) on top, but starts HIDDEN at click point
        // This prevents the 1-frame flash of the dark theme
        style.textContent = `
          ::view-transition-new(root) {
            z-index: 9999 !important;
            clip-path: circle(0px at ${x}px ${y}px);
          }
          ::view-transition-old(root) { z-index: 1 !important; }
        `
      }

      document.head.appendChild(style)

      const transition = document.startViewTransition!(() => {
        setTheme(newTheme)
      })

      transition.ready.then(() => {
        const small = `circle(0px at ${x}px ${y}px)`
        const big = `circle(${maxRadius}px at ${x}px ${y}px)`

        if (!isShrink) {
          document.documentElement.animate(
            { clipPath: [small, big] },
            {
              duration: 1800,
              easing: "cubic-bezier(0.85, 0, 0.15, 1)",
              pseudoElement: "::view-transition-new(root)",
              fill: "both",
            }
          )
        } else {
          document.documentElement.animate(
            { clipPath: [big, small] },
            {
              duration: 1800,
              easing: "cubic-bezier(0.85, 0, 0.15, 1)",
              pseudoElement: "::view-transition-old(root)",
              fill: "both",
            }
          )
        }
      })

      transition.finished.then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const el = document.getElementById("vt-theme")
            if (el) el.remove()
          })
        })
      })
    },
    [resolvedTheme, setTheme]
  )

  return { resolvedTheme, toggleTheme }
}
