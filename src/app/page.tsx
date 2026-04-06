import { Navbar } from "@/components/layout/navbar"
import { Hero } from "@/components/sections/hero"
import { HeroBg } from "@/components/hero-bg"
import { Process } from "@/components/sections/process"
import { Sandbox } from "@/components/sections/sandbox"
import { SDK } from "@/components/sections/sdk"
import { Pricing } from "@/components/sections/pricing"
import { Why } from "@/components/sections/why"
import { Testimonials } from "@/components/sections/testimonials"
import { Cta } from "@/components/sections/cta"
import { Faq } from "@/components/sections/faq"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"
import { Shell } from "@/components/layout/shell"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ScrollMorphFooter } from "@/components/scroll-morph-footer"

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Shell>
        <main>
          <ScrollReveal>
            <div className="border-b border-border bg-background">
              <Process />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale">
            <div className="border-b border-border bg-background">
              <Sandbox />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale">
            <div className="border-b border-border bg-background">
              <SDK />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-b border-border bg-background">
              <Pricing />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-b border-border bg-background">
              <Why />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-b border-border bg-background">
              <Testimonials />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale">
            <Cta />
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-b border-border bg-background">
              <Faq />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="border-b border-border bg-background">
              <Contact />
            </div>
          </ScrollReveal>
        </main>

      </Shell>

      <ScrollMorphFooter>
        <Footer />
      </ScrollMorphFooter>
    </>
  )
}
