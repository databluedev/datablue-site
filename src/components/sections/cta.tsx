import { ArrowRightMd } from "react-coolicons"
import { ScrollReveal } from "@/components/scroll-reveal"

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background px-4 py-20 sm:px-6 lg:px-8">
      {/* Grid pattern overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.04) 39px, rgba(255,255,255,0.04) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.04) 39px, rgba(255,255,255,0.04) 40px)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <ScrollReveal stagger={1}>
          <h2
            className="font-[family-name:var(--font-dot)] leading-[1.1] tracking-tight"
            style={{ fontSize: "clamp(28px, 3.6vw, 52px)" }}
          >
            Ready to{" "}
            <span className="text-[#6a82ff]">ship data</span>{" "}
            instead of parsers?
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger={2}>
          <p className="mt-4 max-w-xl mx-auto text-base leading-relaxed text-background/55">
            Sign up in 30 seconds. 500 free credits every month, no credit card
            required. When you need more, upgrade instantly — no sales call, no
            waiting.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger={3}>
          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-background px-6 py-2.5 text-sm font-medium text-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:opacity-85 active:scale-[0.97]"
            >
              Get free API key
              <ArrowRightMd className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="/docs"
              className="inline-flex items-center justify-center rounded-full border border-background/40 px-6 py-2.5 text-sm font-medium text-background transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-background/10 hover:border-background/60 active:scale-[0.97]"
            >
              Read the docs
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
