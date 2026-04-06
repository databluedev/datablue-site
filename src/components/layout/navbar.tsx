"use client"

import * as React from "react"
import { useThemeTransition } from "@/lib/use-theme-transition"
import { Sun, Moon, HamburgerMd, ChevronDown } from "react-coolicons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

/* ── Nav structure ── */

interface DropdownItem {
  label: string
  description: string
  href: string
}

interface NavLink {
  label: string
  href: string
  dropdown?: DropdownItem[]
}

const navLinks: NavLink[] = [
  {
    label: "Products",
    href: "#products",
    dropdown: [
      { label: "Scrape API", description: "Extract data from any webpage", href: "/docs/scrape" },
      { label: "Crawl API", description: "Walk entire domains at scale", href: "/docs/crawl" },
      { label: "Search API", description: "Web search with instant scraping", href: "/docs/search" },
      { label: "Map API", description: "Fast URL discovery across a domain", href: "/docs/map" },
      { label: "AI Extraction", description: "Schema-guided LLM extraction", href: "/docs/extract" },
    ],
  },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Resources",
    href: "#resources",
    dropdown: [
      { label: "Blog", description: "Engineering deep-dives and updates", href: "/blog" },
      { label: "Changelog", description: "What we shipped recently", href: "/changelog" },
      { label: "Status", description: "Uptime and incident history", href: "https://status.datablue.dev" },
      { label: "Discord", description: "Join our developer community", href: "https://discord.gg/datablue" },
    ],
  },
]

/* ── Dropdown component ── */

function NavDropdown({ items, open }: { items: DropdownItem[]; open: boolean }) {
  return (
    <div
      className={[
        "absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1 pointer-events-none",
      ].join(" ")}
    >
      <div className="w-[320px] rounded-2xl border border-border bg-card backdrop-blur-xl shadow-[0_12px_48px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_48px_rgba(0,0,0,0.4)] p-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors duration-150 hover:bg-muted group"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            </div>
            <ChevronDown className="size-4 -rotate-90 text-muted-foreground/50 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground/60" />
          </a>
        ))}
      </div>
    </div>
  )
}

/* ── Theme toggle ── */

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
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground"
      >
        <Sun className="size-4" />
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-150 hover:bg-muted hover:text-foreground"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </button>
  )
}

/* ── Navbar ── */

export function Navbar() {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleEnter(label: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpenDropdown(label)
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4">
      <div className="flex h-[60px] w-full max-w-[1100px] items-center justify-between rounded-2xl border border-border bg-background px-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
        {/* Left: Logo */}
        <a href="/" className="flex-shrink-0 select-none">
          <span className="font-[family-name:var(--font-dot)] text-xl font-normal tracking-tight text-foreground">
            DATA
          </span>
          <span className="font-[family-name:var(--font-dot)] text-xl font-normal tracking-tight text-[#1a3cff] dark:text-[#6a82ff]">
            BLUE
          </span>
        </a>

        {/* Center: Nav links with dropdowns */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => link.dropdown && handleEnter(link.label)}
              onMouseLeave={handleLeave}
            >
              <a
                href={link.dropdown ? undefined : link.href}
                className={[
                  "flex items-center gap-1 px-3.5 py-2 text-sm text-muted-foreground rounded-lg transition-all duration-150 select-none",
                  openDropdown === link.label
                    ? "text-foreground bg-muted"
                    : "hover:text-foreground hover:bg-muted",
                ].join(" ")}
              >
                {link.label}
                {link.dropdown && (
                  <ChevronDown
                    className={[
                      "size-3.5 transition-transform duration-200",
                      openDropdown === link.label ? "rotate-180" : "",
                    ].join(" ")}
                  />
                )}
              </a>
              {link.dropdown && (
                <NavDropdown items={link.dropdown} open={openDropdown === link.label} />
              )}
            </div>
          ))}
        </nav>

        {/* Right: Search, social icons, theme, auth */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Sign in — desktop */}
          <a
            href="/signin"
            className="hidden md:inline-flex items-center justify-center h-9 px-4 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors duration-150"
          >
            Sign in
          </a>

          {/* Get API key — desktop */}
          <a
            href="/signup"
            className="hidden md:inline-flex items-center justify-center h-9 px-5 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-85 transition-all duration-150"
          >
            Get API key
          </a>

          {/* Mobile burger */}
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden" />
              }
            >
              <HamburgerMd className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 sm:max-w-72 pt-12">
              <SheetHeader className="px-6 pb-4">
                <SheetTitle className="font-[family-name:var(--font-dot)] text-lg">
                  <span className="text-foreground">DATA</span>
                  <span className="text-[#1a3cff] dark:text-[#6a82ff]">BLUE</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <div key={link.label}>
                      <p className="px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground mt-3">
                        {link.label}
                      </p>
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="flex flex-col px-3 py-2.5 text-base text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150"
                        >
                          <span>{item.label}</span>
                          <span className="text-xs text-muted-foreground/60">{item.description}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center px-3 py-2.5 text-base text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </nav>
              <div className="flex flex-col gap-3 px-4 mt-6">
                <a
                  href="/signin"
                  className="flex items-center justify-center h-10 px-4 text-sm border border-border rounded-full hover:bg-muted transition-colors duration-150"
                >
                  Sign in
                </a>
                <a
                  href="/signup"
                  className="flex items-center justify-center h-10 px-4 text-sm font-medium rounded-full bg-foreground text-background hover:opacity-80 transition-opacity duration-150"
                >
                  Get API key
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
