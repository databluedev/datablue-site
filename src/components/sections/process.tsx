import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"
import { ScrollReveal } from "@/components/scroll-reveal"

const steps = [
  {
    num: "/01/",
    title: "Sign up",
    body: "Create an account in 30 seconds. 500 free credits per month. No card required. Get an API key immediately.",
    tags: ["Free tier", "No card", "30 seconds", "Instant API key"],
  },
  {
    num: "/02/",
    title: "Configure",
    body: "REST or Python SDK — your pick. Specify URL, output format, schema, or crawl depth. The platform handles proxies, retries, anti-bot detection, and result caching.",
    tags: ["REST API", "Python SDK", "Auto-proxy", "Retry logic"],
  },
  {
    num: "/03/",
    title: "Get data",
    body: "Clean JSON, Markdown, or HTML back in under a second. Real-time SSE for async jobs, webhooks for production pipelines, NDJSON streaming for crawls.",
    tags: ["JSON", "Markdown", "Webhooks", "SSE", "NDJSON"],
  },
]

export function Process() {
  return (
    <>
      <SectionHead label="/ Process">
        <SectionH2>
          Three steps.
          <br />
          <em>No sales calls.</em>
        </SectionH2>
        <SectionSub>
          Sign up, configure your first request, and get clean data back — no
          onboarding calls, no procurement hoops.
        </SectionSub>
      </SectionHead>

      {steps.map((step, i) => (
        <ScrollReveal key={i} stagger={i + 1}>
          <div
            className={[
              "group relative grid grid-cols-1 gap-4 px-6 py-8 pl-[30px]",
              "md:grid-cols-[120px_1fr_1fr]",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted/30",
              i < steps.length - 1 ? "border-b border-border" : "",
            ].join(" ")}
          >
            {/* Left accent bar on hover */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

            {/* Number */}
            <div className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {step.num}
            </div>

            {/* Title */}
            <div className="font-[family-name:var(--font-dot)] text-[22px] leading-[1.15] tracking-normal transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              {step.title}
            </div>

            {/* Body + tags */}
            <div className="text-[15px] text-muted-foreground">
              {step.body}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {step.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-2.5 py-0.5 font-mono text-[10px] text-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-foreground/25 hover:bg-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </>
  )
}
