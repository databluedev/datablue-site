"use client"

import { useEffect, useState } from "react"

const CARDS = [
  {
    id: 1,
    content: `{ "title": "Widget Pro",\n  "price": 49.99,\n  "in_stock": true }`,
    label: "JSON",
    position: "left-[4%] top-[18%]",
    delay: 0,
    rotate: "-2deg",
  },
  {
    id: 2,
    content: `# Product Page\n## Features\n- 5-engine race\n- Self-learning cache`,
    label: "Markdown",
    position: "right-[3%] top-[25%]",
    delay: 400,
    rotate: "1.5deg",
  },
  {
    id: 3,
    content: `200 OK · 340ms\ncredits_used: 1\nengine: "http"\ncached: true`,
    label: "Response",
    position: "left-[6%] bottom-[22%]",
    delay: 800,
    rotate: "1deg",
  },
  {
    id: 4,
    content: `urls_found: 1,847\ndepth: 3\ntime: 12.4s\nformat: "sitemap"`,
    label: "Crawl",
    position: "right-[5%] bottom-[18%]",
    delay: 1200,
    rotate: "-1.5deg",
  },
]

export function FloatingDataCards() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block" aria-hidden>
      {CARDS.map((card) => (
        <div
          key={card.id}
          className={`absolute ${card.position} w-[190px] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
          style={{
            opacity: mounted ? 0.55 : 0,
            transform: mounted
              ? `translateY(0) rotate(${card.rotate})`
              : `translateY(20px) rotate(${card.rotate})`,
            transitionDelay: `${card.delay}ms`,
            animation: mounted ? `float-${card.id} 6s ease-in-out infinite ${card.delay}ms` : "none",
          }}
        >
          <div className="rounded-lg border border-border/60 bg-card/80 backdrop-blur-sm p-3 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-[#1a3cff] dark:bg-[#6a82ff]" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                {card.label}
              </span>
            </div>
            <pre className="font-mono text-[10px] leading-[1.5] text-muted-foreground/70 whitespace-pre-wrap">
              {card.content}
            </pre>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(-1deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0) rotate(1.5deg); }
          50% { transform: translateY(-10px) rotate(2.5deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-14px) rotate(0deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0) rotate(-1.5deg); }
          50% { transform: translateY(-8px) rotate(-0.5deg); }
        }
      `}</style>
    </div>
  )
}
