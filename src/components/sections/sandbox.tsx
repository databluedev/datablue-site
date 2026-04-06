"use client"

import * as React from "react"
import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Lang = "python" | "node" | "curl" | "cli"

interface Tab {
  id: Lang
  label: string
}

// ---------------------------------------------------------------------------
// Code content per tab
// ---------------------------------------------------------------------------

const TABS: Tab[] = [
  { id: "python", label: "Python" },
  { id: "node", label: "Node.js" },
  { id: "curl", label: "cURL" },
  { id: "cli", label: "CLI" },
]

const CODE: Record<Lang, string> = {
  python: `# pip install datablue
from datablue import DataBlue

app = DataBlue(api_key="wh_YOUR_API_KEY")

# Scrape a single URL
result = app.scrape("https://example.com")

print(result.data.markdown)`,

  node: `// npm install datablue
import { DataBlue } from "datablue"

const app = new DataBlue({ apiKey: "wh_YOUR_API_KEY" })

// Scrape a single URL
const result = await app.scrape("https://example.com")

console.log(result.data.markdown)`,

  curl: `curl -X POST https://api.datablue.dev/v1/scrape \\
  -H "Authorization: Bearer wh_YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com",
    "formats": ["markdown"]
  }'`,

  cli: `# Install the CLI
pip install datablue

# Authenticate once
datablue auth login

# Scrape a URL
datablue scrape https://example.com

# Output as JSON
datablue scrape https://example.com --format json`,
}

// ---------------------------------------------------------------------------
// Syntax highlighting token types
// ---------------------------------------------------------------------------

type TokenKind = "keyword" | "string" | "function" | "comment" | "plain" | "operator"

interface Token {
  kind: TokenKind
  text: string
}

// ---------------------------------------------------------------------------
// Minimal syntax tokeniser (covers Python / JS / cURL / CLI)
// ---------------------------------------------------------------------------

function tokenise(line: string, lang: Lang): Token[] {
  const tokens: Token[] = []

  // Comments
  if (/^\s*(#|\/\/)/.test(line)) {
    return [{ kind: "comment", text: line }]
  }

  // cURL / CLI: treat first word as function/command
  if (lang === "curl" || lang === "cli") {
    const m = line.match(/^(\s*)(curl|datablue|pip|npm)(\s.*)$/)
    if (m) {
      if (m[1]) tokens.push({ kind: "plain", text: m[1] })
      tokens.push({ kind: "function", text: m[2] })
      // tokenise the rest for strings
      return [...tokens, ...tokeniseRest(m[3], lang)]
    }
  }

  return tokeniseRest(line, lang)
}

function tokeniseRest(src: string, lang: Lang): Token[] {
  const tokens: Token[] = []

  // Python / JS keywords
  const KW_PY = /\b(from|import|as|class|def|return|print|if|else|elif|for|in|while|with|pass|None|True|False|async|await|not|and|or|is|lambda)\b/
  const KW_JS = /\b(import|export|from|const|let|var|function|return|async|await|new|if|else|for|of|in|while|class|extends|null|undefined|true|false|console)\b/
  const KW = lang === "node" ? KW_JS : KW_PY

  // String regex: single-quoted, double-quoted, backtick
  const STRING = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/

  // Split by strings first to avoid false positives
  const parts = src.split(STRING)
  for (const part of parts) {
    if ((part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) && part.length > 1) {
      tokens.push({ kind: "string", text: part })
      continue
    }
    // Now tokenise keywords within non-string parts
    const subParts = part.split(KW)
    for (const sp of subParts) {
      if (KW.test(sp)) {
        tokens.push({ kind: "keyword", text: sp })
      } else if (sp) {
        // Detect function calls: word followed by (
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

// ---------------------------------------------------------------------------
// Token → JSX
// ---------------------------------------------------------------------------

const TOKEN_CLASSES: Record<TokenKind, string> = {
  keyword: "text-[#7c3aed] dark:text-[#cba6f7]",
  string: "text-[#c2410c] dark:text-[#f9a45f]",
  function: "text-[#0969da] dark:text-[#8ab4ff]",
  comment: "text-muted-foreground italic",
  operator: "text-foreground",
  plain: "",
}

function HighlightedLine({ line, lang }: { line: string; lang: Lang }) {
  const tokens = tokenise(line, lang)
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
// Right pane: static markdown output
// ---------------------------------------------------------------------------

const MD_OUTPUT = `# DataBlue

DataBlue is a 5-engine web scraping API that returns
clean, structured data from any URL.

## Features

- **Scrape**: Clean markdown, JSON, or CSV from
  any public page
- **Crawl**: Walk an entire domain and return
  structured content for every page
- **Search**: Web search with instant scraping
  of the top results
- **Map**: Fast URL discovery across a domain
- **Extract**: Schema-guided LLM extraction
  for structured fields`

// ---------------------------------------------------------------------------
// Traffic-light dots
// ---------------------------------------------------------------------------

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden>
      <span className="size-3 rounded-full bg-[#ff5f57]" />
      <span className="size-3 rounded-full bg-[#febc2e]" />
      <span className="size-3 rounded-full bg-[#28c840]" />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Copy button
// ---------------------------------------------------------------------------

function CopyButton({ text }: { text: string }) {
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
      {copied ? "Copied!" : "Copy code"}
    </button>
  )
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function Sandbox() {
  const [activeTab, setActiveTab] = React.useState<Lang>("python")
  const tabRefs = React.useRef<Map<Lang, HTMLButtonElement>>(new Map())
  const [pillStyle, setPillStyle] = React.useState<{ x: number; w: number }>({ x: 0, w: 0 })

  React.useEffect(() => {
    const btn = tabRefs.current.get(activeTab)
    if (btn) {
      setPillStyle({ x: btn.offsetLeft, w: btn.offsetWidth })
    }
  }, [activeTab])

  const code = CODE[activeTab]
  const lines = code.split("\n")

  return (
    <>
      <SectionHead label="/ Sandbox">
        <SectionH2>
          One API call.
          <br />
          <em>Clean data</em> back.
        </SectionH2>
        <SectionSub>
          Pass any URL. Get back clean Markdown, structured JSON, or raw HTML — no
          selectors, no scraper maintenance, no headaches.
        </SectionSub>
      </SectionHead>

      {/* ── Editor container ── */}
      <div className="mt-8 mb-10 overflow-hidden border-y border-border bg-card">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          {/* Left: traffic lights + tabs */}
          <div className="flex items-center gap-4">
            <TrafficLights />

            {/* Tab strip with sliding pill */}
            <div className="relative flex items-center gap-0.5">
              {/* Sliding pill (behind tabs) */}
              <div
                aria-hidden
                className="pointer-events-none absolute rounded-full border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  left: `${pillStyle.x}px`,
                  width: `${pillStyle.w}px`,
                  top: 0,
                  bottom: 0,
                }}
              />

              {TABS.map((tab) => {
                const isActive = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      if (el) tabRefs.current.set(tab.id, el)
                      else tabRefs.current.delete(tab.id)
                    }}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={[
                      "relative z-10 rounded-full px-5 py-2.5 font-sans text-sm font-medium transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    ].join(" ")}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right: Copy button */}
          <CopyButton text={code} />
        </div>

        {/* Body: 2-column grid */}
        <div
          className="grid min-h-[320px]"
          style={{ gridTemplateColumns: "1.1fr 1fr" }}
        >
          {/* ── Left pane: code ── */}
          <div className="overflow-x-auto border-r border-border">
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
              <pre className="flex-1 overflow-x-auto pr-6 font-mono text-[14.5px] leading-[1.7] text-foreground">
                <code className="code-line-hover">
                  {lines.map((line, i) => (
                    <div key={i} className="transition-colors duration-200 rounded-sm px-1 -mx-1 hover:bg-muted/50">
                      <HighlightedLine line={line} lang={activeTab} />
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>

          {/* ── Right pane: markdown output ── */}
          <div className="flex flex-col">
            {/* Mini header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <div className="flex items-center gap-1" aria-hidden>
                <span className="size-2 rounded-full bg-[#ff5f57]" />
                <span className="size-2 rounded-full bg-[#febc2e]" />
                <span className="size-2 rounded-full bg-[#28c840]" />
              </div>
              <span className="font-mono text-[13px] text-muted-foreground">[ .MD ]</span>
            </div>

            {/* Markdown text */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <pre className="whitespace-pre-wrap font-mono text-[14px] leading-[1.75] text-muted-foreground">
                {MD_OUTPUT}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
