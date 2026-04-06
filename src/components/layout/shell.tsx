import { cn } from "@/lib/utils"

export function Shell({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative mx-auto max-w-[1280px]",
        // Left + right vertical hairlines
        "before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-border before:pointer-events-none before:z-[1]",
        "after:absolute after:right-0 after:top-0 after:bottom-0 after:w-px after:bg-border after:pointer-events-none after:z-[1]",
        className
      )}
    >
      {children}
    </div>
  )
}
