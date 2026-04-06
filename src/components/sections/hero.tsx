"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import { ArrowRightMd } from "react-coolicons"
import { ScrollReveal } from "@/components/scroll-reveal"

const ColorBends = dynamic(() => import("@/components/ColorBends"), { ssr: false })

type SearchMode = "scrape" | "crawl" | "search" | "map"

const modes: { id: SearchMode; label: string; placeholder: string }[] = [
  {
    id: "scrape",
    label: "scrape",
    placeholder: "https://example.com/products/widget-pro",
  },
  {
    id: "crawl",
    label: "crawl",
    placeholder: "https://docs.example.com/ — crawl the entire site",
  },
  {
    id: "search",
    label: "search",
    placeholder: "best noise-cancelling headphones under $200",
  },
  {
    id: "map",
    label: "map",
    placeholder: "https://example.com/ — map all URLs",
  },
]

export function Hero() {
  const [activeMode, setActiveMode] = React.useState<SearchMode>("scrape")
  const [inputValue, setInputValue] = React.useState("")

  const buttonRefs = React.useRef<Map<SearchMode, HTMLButtonElement>>(new Map())
  const [pillStyle, setPillStyle] = React.useState<{ x: number; w: number }>({
    x: 0,
    w: 0,
  })

  React.useEffect(() => {
    const btn = buttonRefs.current.get(activeMode)
    if (btn) {
      setPillStyle({ x: btn.offsetLeft, w: btn.offsetWidth })
    }
  }, [activeMode])

  const currentMode = modes.find((m) => m.id === activeMode)!

  return (
    <section className="relative min-h-[100dvh] overflow-hidden border-b border-border">
      {/* ColorBends background */}
      <div className="absolute inset-0 z-0 w-full h-full" aria-hidden>
        <ColorBends
          className=""
          rotation={45}
          speed={0.2}
          colors={["#5227FF", "#FF9FFC", "#7cff67"]}
          transparent
          autoRotate={0}
          scale={1}
          frequency={1}
          warpStrength={1.1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 60%, var(--background) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 pt-20 pb-32 text-center">

        {/* Eyebrow */}
        <ScrollReveal stagger={1}>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-muted-foreground transition-all duration-300 hover:border-foreground/20 hover:shadow-[0_0_20px_rgba(26,60,255,0.06)]">
            <span className="size-1.5 rounded-full bg-foreground gentle-pulse" />
            Start free — 500 credits every month
          </p>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal stagger={2}>
          <h1
            className="font-[family-name:var(--font-dot)] leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(32px, 4.2vw, 60px)" }}
          >
            <span className="block text-foreground">Unstoppable scraping.</span>
            <span className="block text-[#1a3cff] dark:text-[#6a82ff]">
              UNBEATABLE PRICES.
            </span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal stagger={3}>
          <p className="mt-6 max-w-[680px] text-base leading-relaxed text-muted-foreground sm:text-lg">
            The cheapest and most reliable web scraping API.
            Clean structured data from any website — no selectors, no maintenance.
          </p>
        </ScrollReveal>

        {/* Search bar */}
        <ScrollReveal stagger={4} variant="scale" className="w-full">
          <div className="mt-10 w-full max-w-[900px] mx-auto">
            {/* Mode tabs — above the bar */}
            <div className="relative inline-flex items-center gap-1 mb-5">
              <div
                aria-hidden
                className="absolute rounded-full border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  left: `${pillStyle.x}px`,
                  width: `${pillStyle.w}px`,
                  top: 0,
                  bottom: 0,
                }}
              />
              {modes.map((mode) => {
                const isActive = mode.id === activeMode
                return (
                  <button
                    key={mode.id}
                    ref={(el) => {
                      if (el) buttonRefs.current.set(mode.id, el)
                      else buttonRefs.current.delete(mode.id)
                    }}
                    type="button"
                    onClick={() => setActiveMode(mode.id)}
                    className={[
                      "relative z-10 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {mode.label}
                  </button>
                )
              })}
            </div>

            {/* Search input — big with shadow */}
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 focus-within:shadow-[0_8px_40px_rgba(0,0,0,0.14)] dark:focus-within:shadow-[0_8px_40px_rgba(0,0,0,0.5)] hover:border-foreground/15">
              <span
                aria-hidden
                className="flex-shrink-0 font-[family-name:var(--font-mono)] text-base text-foreground/40 animate-[blink_1.1s_step-end_infinite]"
                style={{ lineHeight: 1 }}
              >
                {">_"}
              </span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentMode.placeholder}
                className="min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 outline-none"
                aria-label={`${activeMode} URL or query`}
              />
              <button
                type="submit"
                aria-label="Submit"
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-foreground text-background transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-80 active:scale-[0.94]"
              >
                <ArrowRightMd className="size-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA buttons */}
        <ScrollReveal stagger={5}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-85 active:scale-[0.97]"
            >
              Start scraping for free
              <ArrowRightMd className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted hover:border-foreground/20 active:scale-[0.97]"
            >
              See pricing
            </a>
          </div>
        </ScrollReveal>

        {/* Trust strip */}
        <ScrollReveal stagger={6}>
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-5 sm:gap-6 max-w-4xl w-full">
            {[
              { value: "22+", label: "Structured APIs" },
              { value: "7", label: "Platforms" },
              { value: "500", label: "Free credits / mo" },
              { value: "30s", label: "To get started" },
              { value: "₹0", label: "Forever free" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 py-3">
                <span className="font-[family-name:var(--font-dot)] text-2xl sm:text-3xl text-foreground">{stat.value}</span>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
