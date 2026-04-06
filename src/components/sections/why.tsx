import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"
import { ScrollReveal } from "@/components/scroll-reveal"

const points = [
  {
    number: "/01/",
    body: "5-engine race cuts latency by dispatching Chromium, raw HTTP, cached, proxy-rotated, and AI-extraction strategies in parallel. You always get the fastest valid result — not the slowest fallback.",
  },
  {
    number: "/02/",
    body: "Self-learning strategy cache remembers which engine succeeded per domain. Cold-start overhead disappears after the first request. Warm-path p50 latency is under 400 ms for supported targets.",
  },
  {
    number: "/03/",
    body: "22 structured data APIs across 7 platforms — product listings, job boards, social profiles, SERP results, review aggregators, and more — with typed response schemas and zero selector maintenance.",
  },
  {
    number: "/04/",
    body: "AI-first Python SDK with 113 typed field descriptions baked into the library. Your IDE autocompletes the right field name; the API returns a validated Pydantic model. No doc-tab required.",
  },
]

export function Why() {
  return (
    <>
      <SectionHead label="/ Differentiators">
        <SectionH2>
          Why teams pick <em>DataBlue</em>
        </SectionH2>
        <SectionSub>
          No testimonials yet — we&apos;d rather ship than fake social proof.
        </SectionSub>
      </SectionHead>

      {/* Density 10: no card container, use border-separated rows */}
      <div className="px-6 mt-6 mb-10">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-[1fr_1.4fr]">
          {/* Left column — sticky heading */}
          <ScrollReveal variant="left">
            <div className="md:sticky md:top-24 md:pr-10 pb-6 md:pb-0">
              <h3
                className="font-[family-name:var(--font-dot)] leading-[1.15] tracking-tight text-foreground"
                style={{ fontSize: "clamp(22px, 2.4vw, 34px)" }}
              >
                Technical{" "}
                <span className="text-[#1a3cff] dark:text-[#6a82ff]">
                  advantages
                </span>{" "}
                you can verify.
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Every claim below is testable with a free account and a handful
                of API calls. We publish latency benchmarks and engine
                selection logs in your dashboard.
              </p>
            </div>
          </ScrollReveal>

          {/* Right column — numbered points with border dividers */}
          <div className="divide-y divide-border border-t border-border md:border-t-0 md:border-l md:pl-10 md:divide-y">
            {points.map((pt, i) => (
              <ScrollReveal key={pt.number} stagger={i + 1}>
                <div className="group flex gap-4 py-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted/20 -mx-3 px-3 rounded-sm">
                  <span className="flex-shrink-0 font-mono text-xs text-[#1a3cff] dark:text-[#6a82ff] pt-0.5 w-10 transition-transform duration-300 group-hover:translate-x-0.5">
                    {pt.number}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                    {pt.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
