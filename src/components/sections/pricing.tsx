"use client"

import * as React from "react"
import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"
import { ScrollReveal } from "@/components/scroll-reveal"

type BillingCycle = "monthly" | "annual"

const tiers = [
  {
    id: "free",
    name: "FREE",
    price: { monthly: "₹0", annual: "₹0" },
    subtitle: { monthly: "forever", annual: "forever" },
    credits: "500 credits / mo",
    featured: false,
    features: [
      { key: "Credits", val: "500 / month" },
      { key: "Concurrency", val: "2 workers" },
      { key: "Rate limit", val: "10 req / min" },
      { key: "Pages / crawl", val: "100" },
      { key: "Monitors", val: "1" },
      { key: "API keys", val: "1" },
    ],
    tags: ["REST", "Python SDK"],
    cta: "Start free",
    ctaHref: "/signup",
  },
  {
    id: "pro",
    name: "PRO",
    price: { monthly: "₹2,499", annual: "₹2,082" },
    subtitle: { monthly: "~$30 / month", annual: "~$25 / month" },
    credits: "25,000 credits / mo",
    badge: "● MOST POPULAR",
    featured: true,
    features: [
      { key: "Credits", val: "25,000 / month" },
      { key: "Concurrency", val: "10 workers" },
      { key: "Rate limit", val: "60 req / min" },
      { key: "Pages / crawl", val: "10,000" },
      { key: "Monitors", val: "25" },
      { key: "API keys", val: "5" },
    ],
    tags: ["REST", "Python SDK", "Webhooks", "SSE"],
    cta: "Get Pro",
    ctaHref: "/signup?plan=pro",
  },
  {
    id: "scale",
    name: "SCALE",
    price: { monthly: "₹12,499", annual: "₹10,416" },
    subtitle: { monthly: "~$150 / month", annual: "~$125 / month" },
    credits: "250,000 credits / mo",
    featured: false,
    features: [
      { key: "Credits", val: "250,000 / month" },
      { key: "Concurrency", val: "50 workers" },
      { key: "Rate limit", val: "300 req / min" },
      { key: "Pages / crawl", val: "100,000" },
      { key: "Monitors", val: "250" },
      { key: "API keys", val: "25" },
    ],
    tags: ["REST", "Python SDK", "Webhooks", "SSE", "Priority queue"],
    cta: "Get Scale",
    ctaHref: "/signup?plan=scale",
  },
  {
    id: "enterprise",
    name: "ENTERPRISE",
    price: { monthly: "Custom", annual: "Custom" },
    subtitle: { monthly: "talk to us", annual: "talk to us" },
    credits: "Unlimited",
    featured: false,
    features: [
      { key: "Credits", val: "Unlimited" },
      { key: "Concurrency", val: "Custom" },
      { key: "Rate limit", val: "Custom" },
      { key: "Pages / crawl", val: "Unlimited" },
      { key: "Monitors", val: "Custom" },
      { key: "API keys", val: "Custom" },
    ],
    tags: ["SLA", "Dedicated infra", "Custom contract", "SSO"],
    cta: "Contact sales",
    ctaHref: "/contact",
  },
]

const notes = [
  "Credits roll over within your billing period. Unused credits do not accumulate across periods.",
  "Overage available on Pro and Scale at ₹0.10 per 100 additional credits. No surprise bills — cap optional.",
  "All plans include TLS, GDPR-compliant data handling, and SOC 2 Type II (in progress).",
]

export function Pricing() {
  const [billing, setBilling] = React.useState<BillingCycle>("monthly")

  // Refs for sliding pill toggle
  const btnRefs = React.useRef<Map<BillingCycle, HTMLButtonElement>>(new Map())
  const [pillStyle, setPillStyle] = React.useState<{ x: number; w: number }>({
    x: 0,
    w: 0,
  })

  React.useEffect(() => {
    const btn = btnRefs.current.get(billing)
    if (btn) {
      setPillStyle({ x: btn.offsetLeft, w: btn.offsetWidth })
    }
  }, [billing])

  return (
    <>
      <SectionHead label="/ Pricing">
        <SectionH2>
          Simple, <em>credit-based</em> pricing
        </SectionH2>
        <SectionSub>
          One credit = one scrape. No seat fees, no per-seat minimums, no
          surprise invoices. Scale up or down any time.
        </SectionSub>
      </SectionHead>

      <div className="px-6 pb-10">
        {/* Billing toggle */}
        <div className="mt-8 flex items-center gap-4">
          <div className="relative flex items-center rounded-full bg-muted p-0.5">
            {/* Sliding pill */}
            <div
              aria-hidden
              className="absolute top-0.5 bottom-0.5 rounded-full bg-foreground transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                transform: `translateX(${pillStyle.x}px)`,
                width: `${pillStyle.w}px`,
              }}
            />
            {(["monthly", "annual"] as BillingCycle[]).map((cycle) => {
              const isActive = billing === cycle
              return (
                <button
                  key={cycle}
                  ref={(el) => {
                    if (el) btnRefs.current.set(cycle, el)
                    else btnRefs.current.delete(cycle)
                  }}
                  type="button"
                  onClick={() => setBilling(cycle)}
                  className={[
                    "relative z-10 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors duration-200 select-none",
                    isActive
                      ? "text-background"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {cycle}
                </button>
              )
            })}
          </div>

          {/* 2 months free badge */}
          <span
            className={[
              "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-300",
              billing === "annual"
                ? "border-[#1a3cff]/40 bg-[#1a3cff]/8 text-[#1a3cff] dark:border-[#6a82ff]/40 dark:bg-[#6a82ff]/10 dark:text-[#6a82ff] opacity-100 translate-y-0"
                : "border-border text-muted-foreground opacity-50",
            ].join(" ")}
          >
            2 months free
          </span>
        </div>

        {/* Tier grid */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, idx) => {
            const isFeatured = tier.featured
            return (
              <ScrollReveal key={tier.id} stagger={idx + 1}>
              <div
                className={[
                  "relative flex flex-col rounded-2xl border p-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isFeatured
                    ? "border-foreground bg-foreground text-background shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
                    : "border-border bg-card text-foreground hover:border-foreground/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
                ].join(" ")}
              >
                {/* Badge */}
                {tier.badge && (
                  <span
                    className={[
                      "mb-3 inline-flex self-start items-center rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                      isFeatured
                        ? "bg-background text-foreground"
                        : "bg-muted text-muted-foreground",
                    ].join(" ")}
                  >
                    {tier.badge}
                  </span>
                )}

                {/* Tier name */}
                <p
                  className={[
                    "font-mono text-xs uppercase tracking-widest",
                    isFeatured ? "text-background/70" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {tier.name}
                </p>

                {/* Price */}
                <p
                  className={[
                    "mt-2 font-[family-name:var(--font-dot)] leading-none",
                    isFeatured ? "text-background" : "text-foreground",
                  ].join(" ")}
                  style={{ fontSize: "clamp(28px, 2.8vw, 40px)" }}
                >
                  {tier.price[billing]}
                </p>

                {/* Subtitle */}
                <p
                  className={[
                    "mt-1 font-mono text-xs",
                    isFeatured ? "text-background/55" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {tier.subtitle[billing]}
                </p>

                {/* Divider */}
                <div
                  className={[
                    "my-5 h-px",
                    isFeatured ? "bg-background/20" : "bg-border",
                  ].join(" ")}
                />

                {/* Feature rows */}
                <div className="flex flex-col gap-2.5 flex-1">
                  {tier.features.map((feat) => (
                    <div
                      key={feat.key}
                      className="flex items-baseline justify-between gap-2"
                    >
                      <span
                        className={[
                          "font-mono text-xs",
                          isFeatured
                            ? "text-background/55"
                            : "text-muted-foreground",
                        ].join(" ")}
                      >
                        {feat.key}
                      </span>
                      <span
                        className={[
                          "font-mono text-xs text-right",
                          isFeatured ? "text-background" : "text-foreground",
                        ].join(" ")}
                      >
                        {feat.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {tier.tags.map((tag) => (
                    <span
                      key={tag}
                      className={[
                        "rounded-full border px-2.5 py-0.5 font-mono text-[10px]",
                        isFeatured
                          ? "border-background/25 text-background/70"
                          : "border-border text-muted-foreground",
                      ].join(" ")}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA button */}
                <a
                  href={tier.ctaHref}
                  className={[
                    "mt-5 inline-flex items-center justify-center rounded-full px-5 py-2.5 font-mono text-xs uppercase tracking-wide transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-85 active:scale-[0.97]",
                    isFeatured
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background",
                  ].join(" ")}
                >
                  {tier.cta}
                </a>
              </div>
              </ScrollReveal>
            )
          })}
        </div>

        {/* Notes */}
        <ul className="mt-8 flex flex-col gap-2">
          {notes.map((note, i) => (
            <li
              key={i}
              className="font-mono text-xs text-muted-foreground leading-relaxed"
            >
              <span className="mr-2 text-muted-foreground/50">//</span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
