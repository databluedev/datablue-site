"use client"

import ColorBends from "@/components/ColorBends"

export function HeroBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
    >
      {/* WebGL canvas */}
      <div className="absolute inset-0 opacity-40">
        <ColorBends
          className=""
          style={{}}
          rotation={45}
          speed={0.2}
          colors={["#5227FF", "#FF9FFC", "#7cff67"] as never}
          transparent
          autoRotate={0}
          scale={1.2}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.5}
          noise={0.1}
        />
      </div>
      {/* Fade to page bg — starts at 60%, completes at 100% */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, transparent 55%, var(--background) 100%)",
        }}
      />
    </div>
  )
}
