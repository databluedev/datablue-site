"use client"

import * as React from "react"
import { useThemeTransition } from "@/lib/use-theme-transition"
import { Sun, Moon, ArrowRightMd } from "react-coolicons"

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useThemeTransition()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="flex h-8 w-8 items-center justify-center rounded-full border border-current/15 text-inherit opacity-50 transition-colors hover:bg-current/10"
      >
        <Sun className="size-3.5" />
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-current/15 text-inherit opacity-50 transition-colors hover:bg-current/10"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-3.5" />
      ) : (
        <Moon className="size-3.5" />
      )}
    </button>
  )
}

const FOOTER_LINKS = {
  Product: [
    { label: "Scrape API", href: "/docs/scrape" },
    { label: "Crawl API", href: "/docs/crawl" },
    { label: "Search API", href: "/docs/search" },
    { label: "AI Extraction", href: "/docs/extract" },
    { label: "Monitoring", href: "/docs/monitor" },
    { label: "Webhooks", href: "/docs/webhooks" },
    { label: "Pricing", href: "/pricing" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Status", href: "https://status.datablue.dev" },
  ],
  Social: [
    { label: "Twitter / X", href: "https://x.com/databluedev" },
    { label: "GitHub", href: "https://github.com/datablue" },
    { label: "Discord", href: "https://discord.gg/datablue" },
    { label: "LinkedIn", href: "https://linkedin.com/company/datablue" },
    { label: "YouTube", href: "https://youtube.com/@databluedev" },
  ],
}

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <footer className="bg-transparent pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-inherit">
        {/* ── Top two-column row ── */}
        <div className="grid grid-cols-1 gap-12 py-14 lg:grid-cols-[360px_1fr]">
          {/* Left: newsletter */}
          <div>
            {/* Logo */}
            <a href="/" className="inline-flex select-none">
              <span className="font-[family-name:var(--font-dot)] text-xl font-normal tracking-tight text-inherit">
                DATA
              </span>
              <span className="font-[family-name:var(--font-dot)] text-xl font-normal tracking-tight text-[#1a3cff] dark:text-[#6a82ff]">
                BLUE
              </span>
            </a>

            <h4 className="mt-5 font-[family-name:var(--font-dot)] text-lg text-inherit">
              Shipping notes
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-inherit opacity-50">
              Changelog drops, API updates, and the occasional essay on web
              scraping at scale. No marketing. Unsubscribe anytime.
            </p>

            {subscribed ? (
              <p className="mt-4 font-mono text-xs text-inherit opacity-50">
                ✓ You&apos;re on the list.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mt-5 flex items-center gap-0 overflow-hidden rounded-full border border-current/15 bg-transparent focus-within:ring-2 focus-within:ring-ring/40 transition-shadow"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  aria-label="Email for newsletter"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-inherit placeholder:text-inherit opacity-50/50 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80 active:scale-95 mr-0.5"
                >
                  <ArrowRightMd className="size-3.5" />
                </button>
              </form>
            )}
          </div>

          {/* Right: 3 sub-columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {(Object.entries(FOOTER_LINKS) as [string, { label: string; href: string }[]][]).map(
              ([section, links]) => (
                <div key={section}>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-inherit opacity-50">
                    /{section}/
                  </p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-inherit opacity-50 transition-colors hover:text-inherit/90"
                          target={link.href.startsWith("http") ? "_blank" : undefined}
                          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col items-start gap-3 border-t border-current/15 py-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: copyright */}
          <p className="font-mono text-[11px] text-inherit opacity-50">
            © 2026 DataBlue &nbsp;·&nbsp; SQUADCUBE SOLUTIONS PRIVATE LIMITED
          </p>

          {/* Right: system status + theme toggle */}
          <div className="flex items-center gap-4">
            <a
              href="https://status.datablue.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[11px] text-inherit opacity-50 transition-colors hover:text-inherit/90"
            >
              {/* Green pulse dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              All systems normal
            </a>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  )
}
