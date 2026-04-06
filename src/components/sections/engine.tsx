import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"
import { ScrollReveal } from "@/components/scroll-reveal"

const rows = [
  {
    num: "/01/",
    title: "Parallel race",
    body: "HTTP starts at t=0, a headless browser starts at t=3s, a stealth engine sits behind both. First valid HTML wins — everyone else gets cancelled mid-flight. Easy sites return in under a second because the browser never spins up.",
    tags: ["HTTP", "curl-impersonate", "Chromium", "Firefox", "Stealth engine"],
  },
  {
    num: "/02/",
    title: "Self-learning strategy cache",
    body: "The platform writes per-domain memory to Redis on every scrape. Next request to the same domain skips straight to the strategy that won last time. Hard-site detection is emergent — no hand-maintained block lists.",
    tags: ["Per-domain cache", "24h TTL", "EMA latency", "Zero config"],
  },
  {
    num: "/03/",
    title: "Structured output",
    body: "Markdown, clean HTML, raw HTML, links, screenshots, or JSON extracted by an LLM against a schema you define. Robots.txt respected by default. Webhooks and NDJSON streaming for long jobs.",
    tags: ["Markdown", "JSON schema", "Screenshots", "Webhooks", "NDJSON"],
  },
]

export function Engine() {
  return (
    <>
      <SectionHead label="/ Engine">
        <SectionH2>
          Five engines race.
          <br />
          <em>First valid result</em> wins.
        </SectionH2>
        <SectionSub>
          No single scraper handles every site. DataBlue runs HTTP and browser
          strategies in parallel, cancels the losers, and remembers what worked
          per domain.
        </SectionSub>
      </SectionHead>

      {rows.map((row, i) => (
        <ScrollReveal key={i} stagger={i + 1}>
          <div
            className={[
              "group relative grid grid-cols-1 gap-4 px-6 py-8 pl-[30px]",
              "md:grid-cols-[120px_1fr_1fr]",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted/30",
              i < rows.length - 1 ? "border-b border-border" : "",
            ].join(" ")}
          >
            {/* Left blue accent bar on hover */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] origin-top scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

            {/* Number */}
            <div className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {row.num}
            </div>

            {/* Title */}
            <div className="font-[family-name:var(--font-dot)] text-[22px] leading-[1.15] tracking-normal transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
              {row.title}
            </div>

            {/* Body + tags */}
            <div className="text-[15px] text-muted-foreground">
              {row.body}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {row.tags.map((tag) => (
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
