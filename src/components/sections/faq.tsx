"use client"

import * as React from "react"
import { ArrowRightMd } from "react-coolicons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"
import { ScrollReveal } from "@/components/scroll-reveal"

const FAQS = [
  {
    id: "01",
    question: "How does the scraping engine handle JavaScript-heavy pages?",
    answer:
      "DataBlue spins up a full headless Chromium instance for every request by default. We wait for network idle, execute any on-page JavaScript, handle lazy-loaded content, and return the fully rendered DOM. You can also pass a waitFor selector or a custom delay if a site has unusual loading patterns. There's no extra charge for JS rendering — it's baked into every credit.",
  },
  {
    id: "02",
    question: "What anti-bot and CAPTCHA bypass techniques are in play?",
    answer:
      "We rotate residential and datacenter proxies automatically, randomize browser fingerprints (user-agent, viewport, timezone, WebGL), and solve common CAPTCHAs using a combination of audio challenges and third-party solvers. For particularly aggressive sites, you can enable stealth mode which adds human-like mouse movements and scroll patterns. We continuously update our evasion stack — you don't have to.",
  },
  {
    id: "03",
    question: "How does AI-powered structured extraction work?",
    answer:
      "You define a JSON schema — field names, types, and optional descriptions — and DataBlue uses an LLM to extract exactly those fields from the page content. No CSS selectors, no XPath. The model understands semantic meaning, so 'price' on a product page is always the purchase price, not a shipping estimate. Schema-based extraction costs 3x the credits of a raw scrape to account for the LLM call.",
  },
  {
    id: "04",
    question: "What output formats does DataBlue support?",
    answer:
      "Raw scrapes return HTML, Markdown, plain text, or a screenshot (PNG/PDF). Structured extraction returns JSON or CSV. The crawl endpoint returns a JSON array of page objects, each with URL, title, Markdown content, and optional metadata. All responses include a credits_used field so you always know the cost of each call.",
  },
  {
    id: "05",
    question: "How does the credit system work, and do credits roll over?",
    answer:
      "Each plan includes a monthly credit allocation. A simple HTTP scrape costs 1 credit, a JS-rendered scrape costs 5, and AI extraction costs 15. Credits reset at the start of each billing cycle — they do not roll over into the next period. On Pro and Scale plans you can enable overage billing at ₹0.10 per 100 extra credits, with an optional cap to prevent surprise charges.",
  },
  {
    id: "06",
    question: "Can DataBlue access Google Search, Maps, and other Google properties?",
    answer:
      "Yes. We have dedicated endpoints for Google Search (SERP), Google Maps, Google Shopping, and Google News. These use our most aggressive proxy rotation and return structured JSON — no HTML parsing needed. SERP requests cost 10 credits each. Note: we comply with Google's terms of service guidance around automated access; usage for commercial intelligence or public research is generally fine.",
  },
  {
    id: "07",
    question: "Does DataBlue respect robots.txt and other crawl directives?",
    answer:
      "By default, DataBlue checks and respects robots.txt for all crawl jobs. You can override this on a per-request basis by passing ignore_robots: true — you take on responsibility for compliance when you do so. We also honour Crawl-delay directives and noindex/nofollow meta tags in crawl mode. For scrape and map endpoints, robots.txt is advisory only and not enforced by default.",
  },
  {
    id: "08",
    question: "How do webhooks work, and what events can I subscribe to?",
    answer:
      "Webhooks deliver a POST request to your endpoint when a monitored page changes, a crawl job completes, or a batch scrape finishes. The payload is the same JSON structure as the API response, plus event metadata (event_type, job_id, timestamp). You can configure per-monitor webhooks or a single global URL. Deliveries are retried up to 5 times with exponential back-off. Pro and Scale plans include webhook support; Free tier does not.",
  },
]

export { FAQ as Faq }

export function FAQ() {
  return (
    <>
      <SectionHead label="/ FAQs">
        <SectionH2>
          Real answers to
          <br />
          <em>real questions.</em>
        </SectionH2>
        <SectionSub>
          No marketing copy. Just honest answers to the questions engineers
          actually ask before committing to an API.
        </SectionSub>
      </SectionHead>

      {/* Body */}
      <div className="px-6 pb-10">
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          {/* Left sticky support — density 10: no card, border-based */}
          <aside>
            <ScrollReveal variant="left">
              <div className="sticky top-24 border-l-2 border-[#1a3cff] dark:border-[#6a82ff] pl-5 py-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  /SUPPORT/
                </p>
                <h4 className="mt-2 font-[family-name:var(--font-dot)] text-lg leading-snug text-foreground">
                  Still have questions?
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Our team is online Monday-Friday, 9 am-6 pm IST. We also monitor
                  the community Discord around the clock.
                </p>
                <a
                  href="mailto:support@datablue.dev"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-foreground underline underline-offset-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-[#1a3cff] dark:hover:text-[#6a82ff] hover:underline-offset-[6px]"
                >
                  Ask a question <ArrowRightMd className="inline size-4 text-foreground" />
                </a>
              </div>
            </ScrollReveal>
          </aside>

          {/* Right accordion */}
          <div>
            <Accordion defaultValue={undefined}>
              {FAQS.map((faq, i) => (
                <ScrollReveal key={faq.id} stagger={Math.min(i + 1, 8)}>
                  <AccordionItem value={faq.id} className="border-b border-border">
                    <AccordionTrigger className="py-4 text-left hover:no-underline group/trigger">
                      <span className="flex items-baseline gap-3">
                        <span className="flex-shrink-0 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover/trigger:text-[#1a3cff] dark:group-hover/trigger:text-[#6a82ff]">
                          /{faq.id}/
                        </span>
                        <span className="font-[family-name:var(--font-dot)] text-base font-normal text-foreground transition-transform duration-300 group-hover/trigger:translate-x-0.5">
                          {faq.question}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="pb-4 pl-8 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  )
}
