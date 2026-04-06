"use client"

import * as React from "react"
import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"

// ---------------------------------------------------------------------------
// Python code (28 lines)
// ---------------------------------------------------------------------------

const SDK_CODE = `from datablue import DataBlue

client = DataBlue(api_key="wh_YOUR_API_KEY")

# Scrape a page with structured formats
result = client.scrape(
    url="https://example.com/products",
    formats=["markdown", "links", "structured_data"],
    only_main_content=True,
)

print(result.data.markdown)
print(result.data.metadata.title)

# Or extract a specific schema with an LLM
extracted = client.scrape(
    url="https://example.com/product/123",
    extract={
        "prompt": "Extract product details",
        "schema": {
            "title": "string",
            "price": "number",
            "in_stock": "boolean",
        },
    },
)

print(extracted.data.extracted)`

// ---------------------------------------------------------------------------
// Syntax highlighting (Python only)
// ---------------------------------------------------------------------------

type TokenKind = "keyword" | "string" | "function" | "comment" | "plain"

interface Token {
  kind: TokenKind
  text: string
}

const KW_PY = /\b(from|import|as|class|def|return|print|if|else|elif|for|in|while|with|pass|None|True|False|async|await|not|and|or|is|lambda)\b/

const TOKEN_CLASSES: Record<TokenKind, string> = {
  keyword: "text-[#7c3aed] dark:text-[#cba6f7]",
  string: "text-[#c2410c] dark:text-[#f9a45f]",
  function: "text-[#0969da] dark:text-[#8ab4ff]",
  comment: "text-muted-foreground italic",
  plain: "",
}

function tokeniseLine(line: string): Token[] {
  // Comments
  if (/^\s*#/.test(line)) {
    return [{ kind: "comment", text: line }]
  }

  const tokens: Token[] = []
  const STRING = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/
  const parts = line.split(STRING)

  for (const part of parts) {
    if ((part.startsWith('"') || part.startsWith("'")) && part.length > 1) {
      tokens.push({ kind: "string", text: part })
      continue
    }
    const subParts = part.split(KW_PY)
    for (const sp of subParts) {
      if (KW_PY.test(sp)) {
        tokens.push({ kind: "keyword", text: sp })
      } else if (sp) {
        const fnSplit = sp.split(/(\b\w+(?=\())/)
        for (const fp of fnSplit) {
          if (/^\w+$/.test(fp) && fp.length > 0) {
            tokens.push({ kind: "function", text: fp })
          } else if (fp) {
            tokens.push({ kind: "plain", text: fp })
          }
        }
      }
    }
  }
  return tokens
}

function HighlightedLine({ line }: { line: string }) {
  const tokens = tokeniseLine(line)
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} className={TOKEN_CLASSES[tok.kind]}>
          {tok.text}
        </span>
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Traffic-light dots
// ---------------------------------------------------------------------------

function TrafficLights({ size = "md" }: { size?: "sm" | "md" }) {
  const cls = size === "sm" ? "size-2.5" : "size-3"
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className={`${cls} rounded-full bg-[#ff5f57]`} />
      <span className={`${cls} rounded-full bg-[#febc2e]`} />
      <span className={`${cls} rounded-full bg-[#28c840]`} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Copy button (generic)
// ---------------------------------------------------------------------------

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // silently ignore
    }
  }, [text])

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md bg-foreground px-3 py-1.5 font-mono text-[13px] text-background transition-opacity duration-150 hover:opacity-75 active:scale-95 select-none"
    >
      {copied ? "Copied!" : label}
    </button>
  )
}

// ---------------------------------------------------------------------------
// "What's next" cards data
// ---------------------------------------------------------------------------

const NEXT_CARDS = [
  {
    badge: "In development",
    badgeColor: "text-[#1a3cff] dark:text-[#6a82ff] bg-[#1a3cff]/8 dark:bg-[#6a82ff]/10",
    title: "JavaScript / TypeScript SDK",
    body: "Full parity with the Python SDK. First-class types, ESM + CJS builds, and an identical method surface.",
  },
  {
    badge: "Planned",
    badgeColor: "text-muted-foreground bg-muted",
    title: "Go SDK",
    body: "Idiomatic Go client with context support, zero-alloc response parsing, and a CLI wrapper.",
  },
  {
    badge: "Preview",
    badgeColor: "text-[#c2410c] dark:text-[#f9a45f] bg-[#c2410c]/8 dark:bg-[#f9a45f]/10",
    title: "MCP Server",
    body: "Run DataBlue as a Model Context Protocol server. Drop it into any MCP-compatible AI agent in one command.",
  },
]

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function SDK() {
  const lines = SDK_CODE.split("\n")

  return (
    <>
      <SectionHead label="/ SDK">
        <SectionH2>
          Python SDK that
          <br />
          <em>AIs can actually read.</em>
        </SectionH2>
        <SectionSub>
          113 field descriptions, literal types on every enum, and docstrings that
          survive the context window. Built for humans and language models alike.
        </SectionSub>
      </SectionHead>

      {/* ── Editor container ── */}
      <div className="mt-10 overflow-hidden border-y border-border bg-card">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          {/* Left: traffic lights + file tab */}
          <div className="flex items-center gap-4">
            <TrafficLights />

            <div className="rounded-[10px] border border-border bg-[var(--bg-alt)] px-4 py-2.5 font-sans text-sm text-foreground select-none">
              scrape_example.py
            </div>
          </div>

          {/* Right: install bar + copy */}
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[14px] text-muted-foreground sm:block">
              $ pip install datablue
            </span>
            <CopyButton text="pip install datablue" label="Copy install" />
          </div>
        </div>

        {/* Body: single-pane code */}
        <div className="overflow-x-auto">
          <div className="flex py-4">
            {/* Line numbers gutter */}
            <div
              className="flex-shrink-0 select-none pr-4 pl-4 text-right font-mono text-[14.5px] leading-[1.7] text-muted-foreground/50"
              aria-hidden
            >
              {lines.map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Code */}
            <pre className="flex-1 overflow-x-auto pr-8 font-mono text-[14.5px] leading-[1.7] text-foreground">
              <code>
                {lines.map((line, i) => (
                  <div key={i} className="transition-colors duration-200 rounded-sm px-1 -mx-1 hover:bg-muted/50">
                    <HighlightedLine line={line} />
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>

        {/* Footer status bar */}
        <div className="flex items-center justify-between border-t border-border bg-[var(--bg-alt)] px-6 py-3">
          <span className="font-mono text-[12px] text-muted-foreground">
            ● ready · main
          </span>
          <span className="font-mono text-[12px] text-muted-foreground">
            UTF-8 · Python 3.10+ · v2.0.0 · 113 typed fields
          </span>
        </div>
      </div>

      {/* ── What's next ── */}
      <div className="px-6 mt-10 pb-10">
        <p className="mb-4 font-mono text-xs text-muted-foreground">What&apos;s next</p>

        <div className="divide-y divide-border border-y border-border">
          {NEXT_CARDS.map((card) => (
            <div
              key={card.title}
              className="group grid grid-cols-1 gap-3 py-5 sm:grid-cols-[auto_1fr_1.2fr] sm:items-start transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted/20 -mx-3 px-3 rounded-sm"
            >
              <span
                className={[
                  "inline-block self-start rounded-full px-2.5 py-0.5 font-mono text-[12px] font-medium whitespace-nowrap",
                  card.badgeColor,
                ].join(" ")}
              >
                {card.badge}
              </span>

              <p
                className="font-[family-name:var(--font-dot)] leading-snug text-foreground transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ fontSize: "19px" }}
              >
                {card.title}
              </p>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
