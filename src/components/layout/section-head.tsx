import { cn } from "@/lib/utils"

/**
 * The original layout's section header: a 2-column grid.
 * Left column: small mono section label with blue dot prefix.
 * Right column: dot-font heading + muted subtitle paragraph.
 */
export function SectionHead({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 border-b border-border px-6 pt-14 pb-6",
        "md:grid-cols-[1fr_1.6fr]",
        className
      )}
    >
      {/* Label column */}
      <div className="flex items-start gap-2.5">
        <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-foreground" />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
      </div>

      {/* Content column */}
      <div>{children}</div>
    </div>
  )
}

/**
 * Standard section heading in DataBlue Dot font.
 * Wrap accent words in <em> for blue color treatment.
 */
export function SectionH2({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={cn(
        "font-[family-name:var(--font-dot)] leading-[1.1] tracking-normal mb-4",
        "[&_em]:not-italic [&_em]:text-[#1a3cff] dark:[&_em]:text-[#6a82ff]",
        className
      )}
      style={{ fontSize: "clamp(26px, 3.3vw, 44px)" }}
    >
      {children}
    </h2>
  )
}

export function SectionSub({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={cn(
        "text-muted-foreground max-w-[640px] text-base",
        className
      )}
    >
      {children}
    </p>
  )
}
