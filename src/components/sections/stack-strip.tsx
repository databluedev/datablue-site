
const techs = [
  "Python 3.12",
  "FastAPI",
  "Playwright",
  "nodriver",
  "Celery",
  "PostgreSQL 16",
  "Redis 7",
  "Traefik",
]

export function StackStrip() {
  return (
    <>
      <div className="border-y border-border py-7">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground font-[family-name:var(--font-dot)]">
          <span className="font-mono text-xs text-muted-foreground/60">
            // The boring stack we ship on
          </span>
          {techs.map((tech, i) => (
            <span key={tech} className="flex items-center gap-3">
              <span className="opacity-40">·</span>
              <span>{tech}</span>
              {i === techs.length - 1 && (
                <span className="opacity-40">·</span>
              )}
            </span>
          ))}
        </p>
      </div>
    </>
  )
}
