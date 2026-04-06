"use client"

import * as React from "react"
import { Mail, BookOpen, ChatCircleDots, ArrowRightMd, Check } from "react-coolicons"
import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"
import { ScrollReveal } from "@/components/scroll-reveal"

const INFO_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@datablue.dev",
    href: "mailto:hello@datablue.dev",
  },
  {
    icon: BookOpen,
    label: "Documentation",
    value: "docs.datablue.dev",
    href: "https://docs.datablue.dev",
  },
  {
    icon: ChatCircleDots,
    label: "Sales",
    value: "sales@datablue.dev",
    href: "mailto:sales@datablue.dev",
  },
]

const PLANS = ["Free", "Pro", "Scale", "Enterprise"] as const
type Plan = (typeof PLANS)[number]

const USE_CASES = [
  "Web scraping",
  "Structured extraction",
  "Platform data APIs",
  "Monitoring & alerts",
  "Dedicated deployment",
] as const
type UseCase = (typeof USE_CASES)[number]

export function Contact() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [company, setCompany] = React.useState("")
  const [plan, setPlan] = React.useState<Plan>("Pro")
  const [useCases, setUseCases] = React.useState<Set<UseCase>>(new Set())
  const [message, setMessage] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  // Sliding pill for plan selector
  const planRefs = React.useRef<Map<Plan, HTMLButtonElement>>(new Map())
  const [pillStyle, setPillStyle] = React.useState<{ x: number; w: number }>({
    x: 0,
    w: 0,
  })

  React.useEffect(() => {
    const btn = planRefs.current.get(plan)
    if (btn) {
      setPillStyle({ x: btn.offsetLeft, w: btn.offsetWidth })
    }
  }, [plan])

  function toggleUseCase(uc: UseCase) {
    setUseCases((prev) => {
      const next = new Set(prev)
      if (next.has(uc)) next.delete(uc)
      else next.add(uc)
      return next
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <SectionHead label="/ Contact">
        <SectionH2>
          Let&apos;s <em>talk shop.</em>
        </SectionH2>
        <SectionSub>
          Tell us what you&apos;re building and we&apos;ll find the right fit — or get a
          free API key and start in minutes.
        </SectionSub>
      </SectionHead>

      <div className="px-6 pb-10">
        {/* Info cards */}
        <ScrollReveal>
        <div className="mt-8 grid grid-cols-1 gap-0 overflow-hidden rounded-xl border border-border sm:grid-cols-3">
          {INFO_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <a
                key={card.label}
                href={card.href}
                className={[
                  "group flex items-center gap-4 bg-card p-6 transition-colors hover:bg-muted",
                  i < INFO_CARDS.length - 1
                    ? "border-b border-border sm:border-b-0 sm:border-r"
                    : "",
                ].join(" ")}
              >
                {/* Blue-washed icon circle */}
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                  <Icon className="size-4 text-foreground" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {card.label}
                  </p>
                  <p className="mt-0.5 font-mono text-sm text-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-[#1a3cff] dark:group-hover:text-[#6a82ff] group-hover:translate-x-0.5">
                    {card.value}
                  </p>
                </div>
              </a>
            )
          })}
        </div>
        </ScrollReveal>

        {/* Contact form */}
        <ScrollReveal stagger={2} variant="scale">
        <div className="mt-6 rounded-xl border border-border bg-card p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-muted">
                <Check className="size-6" />
              </div>
              <h3 className="font-[family-name:var(--font-dot)] text-2xl text-foreground">
                Message sent.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ll get back to you within one business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Row 1: Name / Email / Company */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    id: "name",
                    label: "Name",
                    value: name,
                    onChange: setName,
                    type: "text",
                    placeholder: "Ada Lovelace",
                    required: true,
                  },
                  {
                    id: "email",
                    label: "Email",
                    value: email,
                    onChange: setEmail,
                    type: "email",
                    placeholder: "ada@example.com",
                    required: true,
                  },
                  {
                    id: "company",
                    label: "Company",
                    value: company,
                    onChange: setCompany,
                    type: "text",
                    placeholder: "Acme Corp",
                    required: false,
                  },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.id}
                      className="font-mono text-xs text-muted-foreground"
                    >
                      {field.label}
                      {field.required && (
                        <span className="ml-0.5 text-foreground">*</span>
                      )}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:ring-2 focus:ring-ring/40 focus:border-foreground/25 focus:shadow-[0_0_0_3px_rgba(26,60,255,0.06)]"
                    />
                  </div>
                ))}
              </div>

              {/* Plan radio pills */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-muted-foreground">
                  Plan
                </label>
                <div className="relative inline-flex items-center self-start rounded-full bg-muted p-0.5">
                  {/* Sliding background pill */}
                  <div
                    aria-hidden
                    className="absolute top-0.5 bottom-0.5 rounded-full bg-foreground transition-all duration-[420ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      transform: `translateX(${pillStyle.x}px)`,
                      width: `${pillStyle.w}px`,
                    }}
                  />
                  {PLANS.map((p) => {
                    const isActive = plan === p
                    return (
                      <button
                        key={p}
                        ref={(el) => {
                          if (el) planRefs.current.set(p, el)
                          else planRefs.current.delete(p)
                        }}
                        type="button"
                        onClick={() => setPlan(p)}
                        className={[
                          "relative z-10 rounded-full px-4 py-1.5 font-mono text-xs transition-colors duration-200 select-none",
                          isActive
                            ? "text-background"
                            : "text-muted-foreground hover:text-foreground",
                        ].join(" ")}
                      >
                        {p}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Use case checkbox pills */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs text-muted-foreground">
                  Use case{" "}
                  <span className="text-muted-foreground/50">(select all that apply)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {USE_CASES.map((uc) => {
                    const checked = useCases.has(uc)
                    return (
                      <button
                        key={uc}
                        type="button"
                        onClick={() => toggleUseCase(uc)}
                        className={[
                          "rounded-full border px-4 py-1.5 font-mono text-xs transition-all duration-200 select-none",
                          checked
                            ? "border-foreground bg-foreground text-background"
                            : "border-border bg-transparent text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                        ].join(" ")}
                      >
                        {checked && (
                          <span className="mr-1.5 inline-block">✓</span>
                        )}
                        {uc}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Message textarea */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="font-mono text-xs text-muted-foreground"
                >
                  What are you building?{" "}
                  <span className="text-foreground">*</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project, data sources, volume, and any constraints..."
                  required
                  rows={5}
                  className="resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:ring-2 focus:ring-ring/40 focus:border-foreground/25 focus:shadow-[0_0_0_3px_rgba(26,60,255,0.06)]"
                />
              </div>

              {/* Submit */}
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 font-mono text-sm text-background transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-85 active:scale-[0.97]"
                >
                  Send message
                  <ArrowRightMd className="size-3.5" />
                </button>
                <p className="text-xs text-muted-foreground">
                  We respond within one business day.
                </p>
              </div>
            </form>
          )}
        </div>
        </ScrollReveal>
      </div>
    </>
  )
}
