"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, DoubleQuotesL } from "react-coolicons"
import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "DataBlue cut our scraping pipeline from 3 days of maintenance per week to basically zero. The structured JSON output is exactly what we need — we pipe it straight into our data warehouse.",
    author: "Arjun Mehta",
    role: "Head of Data Engineering",
    company: "Lenscraft Analytics",
  },
  {
    id: 2,
    quote:
      "We tried four scraping services before DataBlue. The others kept breaking on JavaScript-heavy pages. DataBlue just works. The AI extraction schema is genuinely magical.",
    author: "Priya Nair",
    role: "CTO",
    company: "Stackwise",
  },
  {
    id: 3,
    quote:
      "Our competitive pricing monitor runs 24/7 across 80k product pages. DataBlue handles anti-bot in the background — we haven't had a single blocked request in six months.",
    author: "Marcus Liu",
    role: "Lead Engineer",
    company: "Pricetrack.io",
  },
  {
    id: 4,
    quote:
      "The webhook support alone makes DataBlue worth it. We get notified the moment a page changes, no polling, no wasted credits. This is what a modern scraping API should look like.",
    author: "Shreya Kapoor",
    role: "Product Lead",
    company: "Monitex",
  },
  {
    id: 5,
    quote:
      "DataBlue's crawl API let us index our client's entire documentation site in under two minutes. Clean Markdown output, perfectly structured. Our LLM pipeline loved it.",
    author: "Tom Bauer",
    role: "AI Engineer",
    company: "ContextLayer",
  },
  {
    id: 6,
    quote:
      "We extract structured data from thousands of e-commerce listings daily. DataBlue's schema-based extraction means we don't write a single XPath or CSS selector. It's a superpower.",
    author: "Divya Srinivasan",
    role: "Data Product Manager",
    company: "CatalogHQ",
  },
  {
    id: 7,
    quote:
      "Migrated from a self-hosted Scrapy cluster to DataBlue in a weekend. Dramatically lower infra cost, better success rates, and the team can focus on actual product work again.",
    author: "Ravi Anand",
    role: "VP Engineering",
    company: "Glassboard",
  },
]

const N = TESTIMONIALS.length

// picsum seeds for center track images
const SEEDS = [1, 42, 7, 99, 23, 56, 81]

// How many image tiles in each side track (decorative)
const SIDE_TILES = 12

function wrap(n: number, total: number) {
  return ((n % total) + total) % total
}

export function Testimonials() {
  const [page, setPage] = React.useState(0)
  const [animating, setAnimating] = React.useState(true)
  const [hovered, setHovered] = React.useState(false)
  const [textVisible, setTextVisible] = React.useState(true)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  const currentIndex = wrap(page, N)

  const stopTimer = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startTimer = React.useCallback(() => {
    stopTimer()
    intervalRef.current = setInterval(() => {
      advance(1)
    }, 1600)
  }, [stopTimer]) // eslint-disable-line react-hooks/exhaustive-deps

  function advance(dir: 1 | -1) {
    setTextVisible(false)
    setTimeout(() => {
      setPage((p) => {
        const next = p + dir
        // Snap back if drifted past threshold to avoid infinite scroll drift
        if (next > N * 3) {
          setAnimating(false)
          setTimeout(() => setAnimating(true), 50)
          return wrap(next, N)
        }
        if (next < -N * 3) {
          setAnimating(false)
          setTimeout(() => setAnimating(true), 50)
          return wrap(next, N)
        }
        return next
      })
      setTextVisible(true)
    }, 200)
  }

  React.useEffect(() => {
    if (!hovered) startTimer()
    else stopTimer()
    return stopTimer
  }, [hovered, startTimer, stopTimer])

  // Track distances
  const CARD_HEIGHT = 220 // px per card including gap
  const STAGGER = 40

  const centerY = -(page * CARD_HEIGHT)
  const leftY = page * CARD_HEIGHT - STAGGER
  const rightY = page * CARD_HEIGHT + STAGGER

  const transition = animating
    ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
    : "none"

  const t = TESTIMONIALS[currentIndex]

  return (
    <>
      <SectionHead label="/ Voices">
        <SectionH2>
          What teams are
          <br />
          <em>building</em>
        </SectionH2>
        <SectionSub>
          Real teams, real pipelines. Here&apos;s what they&apos;re shipping with DataBlue.
        </SectionSub>
      </SectionHead>

      <div
        className="relative overflow-hidden px-6 pb-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:gap-0">
          {/* ── Left 50%: 3-track image columns ── */}
          <div className="relative flex-1 lg:max-w-[50%]">
            <div
              className="relative flex gap-3 overflow-hidden"
              style={{ height: 520 }}
            >
              {/* Top/bottom mask */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--background) 0%, transparent 18%, transparent 82%, var(--background) 100%)",
                }}
              />

              {/* Left decorative track */}
              <div className="relative flex-1 overflow-hidden">
                <div
                  style={{ transform: `translateY(${leftY}px)`, transition, willChange: "transform" }}
                  className="flex flex-col gap-3"
                >
                  {Array.from({ length: SIDE_TILES }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[196px] flex-shrink-0 rounded-xl border border-border bg-muted"
                    />
                  ))}
                </div>
              </div>

              {/* Center real-image track */}
              <div className="relative w-[46%] flex-shrink-0 overflow-hidden">
                <div
                  style={{ transform: `translateY(${centerY}px)`, transition, willChange: "transform" }}
                  className="flex flex-col gap-3"
                >
                  {/* Render enough copies to allow infinite feel */}
                  {[...SEEDS, ...SEEDS, ...SEEDS].map((seed, i) => (
                    <div
                      key={i}
                      className="h-[196px] flex-shrink-0 overflow-hidden rounded-xl border border-border"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://picsum.photos/seed/db${seed}/600/600?grayscale`}
                        alt=""
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right decorative track */}
              <div className="relative flex-1 overflow-hidden">
                <div
                  style={{ transform: `translateY(${rightY}px)`, transition, willChange: "transform" }}
                  className="flex flex-col gap-3"
                >
                  {Array.from({ length: SIDE_TILES }).map((_, i) => (
                    <div
                      key={i}
                      className="h-[196px] flex-shrink-0 rounded-xl border border-border bg-muted/60"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right 50%: Quote panel ── */}
          <div className="flex flex-1 flex-col justify-center lg:pl-16">
            {/* Quote icon */}
            <DoubleQuotesL
              className="mb-6 text-foreground opacity-40"
              width={36}
              height={36}
              aria-hidden
            />

            {/* Quote text */}
            <div
              className="transition-all duration-200"
              style={{
                opacity: textVisible ? 1 : 0,
                transform: textVisible
                  ? "translateY(0) "
                  : "translateY(8px)",
                filter: textVisible ? "blur(0px)" : "blur(4px)",
              }}
            >
              <p
                className="font-[family-name:var(--font-dot)] leading-relaxed text-foreground"
                style={{ fontSize: "clamp(17px, 1.6vw, 22px)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author row */}
              <div className="mt-8 flex items-center gap-4">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/av${t.id}/80/80?grayscale`}
                    alt={t.author}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-mono text-sm font-medium text-foreground">
                    {t.author}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Prev / Next + counter */}
            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={() => advance(-1)}
                aria-label="Previous testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted hover:border-foreground/25 active:scale-[0.92]"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => advance(1)}
                aria-label="Next testimonial"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted hover:border-foreground/25 active:scale-[0.92]"
              >
                <ChevronRight className="size-4" />
              </button>

              {/* Dot indicators */}
              <div className="ml-2 flex items-center gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => {
                      setTextVisible(false)
                      setTimeout(() => {
                        setPage(i)
                        setTextVisible(true)
                      }, 200)
                    }}
                    className={[
                      "rounded-full transition-all duration-300",
                      i === currentIndex
                        ? "h-1.5 w-4 bg-foreground"
                        : "h-1.5 w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60",
                    ].join(" ")}
                  />
                ))}
              </div>

              <span className="ml-auto font-mono text-xs text-muted-foreground">
                {String(currentIndex + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
