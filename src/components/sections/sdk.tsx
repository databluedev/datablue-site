"use client"

import * as React from "react"
import { SectionHead, SectionH2, SectionSub } from "@/components/layout/section-head"

// ---------------------------------------------------------------------------
// Code samples
// ---------------------------------------------------------------------------

const SDK_CODE_PYTHON = `from datablue import DataBlue

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

const SDK_CODE_NODE = `import { DataBlue } from "@datablue/sdk";

const client = new DataBlue({ apiKey: "wh_YOUR_API_KEY" });

// Scrape a page with structured formats
const result = await client.scrape({
  url: "https://example.com/products",
  formats: ["markdown", "links", "structured_data"],
  onlyMainContent: true,
});

console.log(result.data.markdown);
console.log(result.data.metadata?.title);

// Or extract a specific schema with an LLM
const extracted = await client.scrape({
  url: "https://example.com/product/123",
  extract: {
    prompt: "Extract product details",
    schema: {
      title: "string",
      price: "number",
      in_stock: "boolean",
    },
  },
});

console.log(extracted.data.extracted);`

// ---------------------------------------------------------------------------
// Syntax highlighting
// ---------------------------------------------------------------------------

type TokenKind = "keyword" | "string" | "function" | "comment" | "plain"

interface Token {
  kind: TokenKind
  text: string
}

const KW_PY = /\b(from|import|as|class|def|return|print|if|else|elif|for|in|while|with|pass|None|True|False|async|await|not|and|or|is|lambda)\b/
const KW_JS = /\b(import|from|export|const|let|var|async|await|return|console|new|if|else|for|while|true|false|null|undefined|typeof|instanceof|class|extends|interface|type|readonly)\b/

const TOKEN_CLASSES: Record<TokenKind, string> = {
  keyword:  "text-[#7c3aed] dark:text-[#cba6f7]",
  string:   "text-[#c2410c] dark:text-[#f9a45f]",
  function: "text-[#0969da] dark:text-[#8ab4ff]",
  comment:  "text-muted-foreground italic",
  plain:    "",
}

function tokeniseLine(line: string, kw: RegExp): Token[] {
  const commentChar = kw === KW_PY ? /^\s*#/ : /^\s*\/\//
  if (commentChar.test(line)) {
    return [{ kind: "comment", text: line }]
  }

  const tokens: Token[] = []
  const STRING = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/
  const parts = line.split(STRING)

  for (const part of parts) {
    if ((part.startsWith('"') || part.startsWith("'") || part.startsWith("`")) && part.length > 1) {
      tokens.push({ kind: "string", text: part })
      continue
    }
    const subParts = part.split(kw)
    for (const sp of subParts) {
      if (kw.test(sp)) {
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

function HighlightedLine({ line, kw }: { line: string; kw: RegExp }) {
  const tokens = tokeniseLine(line, kw)
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
// Language tab button
// ---------------------------------------------------------------------------

function LangTab({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-[10px] border px-4 py-2.5 font-sans text-sm transition-colors duration-150 select-none",
        active
          ? "border-border bg-[var(--bg-alt)] text-foreground"
          : "border-transparent bg-transparent text-muted-foreground hover:text-foreground",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

// ---------------------------------------------------------------------------
// "What's next" cards
// ---------------------------------------------------------------------------

const NEXT_CARDS = [
  {
    badge: "Available",
    badgeColor: "text-[#15803d] dark:text-[#4ade80] bg-[#15803d]/8 dark:bg-[#4ade80]/10",
    title: "JavaScript / TypeScript SDK",
    body: "Full parity with the Python SDK. First-class types, ESM + CJS builds, and an identical method surface. Install with npm install @datablue/sdk.",
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

type Lang = "python" | "node"

const LANG_META: Record<Lang, { file: string; install: string; installLabel: string; footer: string; kw: RegExp }> = {
  python: {
    file: "scrape_example.py",
    install: "pip install datablue",
    installLabel: "pip install datablue",
    footer: "Python 3.10+ · v2.0.0 · 113 typed fields",
    kw: KW_PY,
  },
  node: {
    file: "scrape_example.ts",
    install: "npm install @datablue/sdk",
    installLabel: "npm install @datablue/sdk",
    footer: "Node.js 18+ · v1.0.0 · ESM + CJS",
    kw: KW_JS,
  },
}

const LANG_CODE: Record<Lang, string> = {
  python: SDK_CODE_PYTHON,
  node:   SDK_CODE_NODE,
}

export function SDK() {
  const [lang, setLang] = React.useState<Lang>("python")

  const meta  = LANG_META[lang]
  const lines = LANG_CODE[lang].split("\n")

  const setPython = React.useCallback(() => setLang("python"), [])
  const setNode   = React.useCallback(() => setLang("node"),   [])

  return (
    <>
      <SectionHead label="/ SDK">
        <SectionH2>
          SDKs that
          <br />
          <em>AIs can actually read.</em>
        </SectionH2>
        <SectionSub>
          113 field descriptions, literal types on every enum, and docstrings that
          survive the context window. Python and Node.js — built for humans and
          language models alike.
        </SectionSub>
      </SectionHead>

      {/* ── Editor container ── */}
      <div className="mt-10 overflow-hidden border-y border-border bg-card">

        {/* Header row */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          {/* Left: traffic lights + language tabs */}
          <div className="flex items-center gap-4">
            <TrafficLights />
            <div className="flex items-center gap-1">
              <LangTab active={lang === "python"} onClick={setPython}>Python</LangTab>
              <LangTab active={lang === "node"}   onClick={setNode}>Node.js</LangTab>
            </div>
          </div>

          {/* Right: install command + copy */}
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[14px] text-muted-foreground sm:block">
              $ {meta.installLabel}
            </span>
            <CopyButton text={meta.install} label="Copy install" />
          </div>
        </div>

        {/* File tab row */}
        <div className="border-b border-border px-4 pt-2 pb-0">
          <div className="inline-block rounded-t-md border border-b-0 border-border bg-card px-3 py-1.5 font-mono text-[13px] text-muted-foreground select-none">
            {meta.file}
          </div>
        </div>

        {/* Code body */}
        <div className="overflow-x-auto">
          <div className="flex py-4">
            {/* Line numbers */}
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
                  <div
                    key={i}
                    className="transition-colors duration-200 rounded-sm px-1 -mx-1 hover:bg-muted/50"
                  >
                    <HighlightedLine line={line} kw={meta.kw} />
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
            UTF-8 · {meta.footer}
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
