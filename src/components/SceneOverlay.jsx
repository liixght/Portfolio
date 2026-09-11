export default function SceneOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        <p className="mb-3 font-mono text-sm uppercase tracking-[0.35em] text-gold/80">
          ~ whoami
        </p>
        <h1 className="text-5xl font-bold leading-tight text-off-white sm:text-7xl">
          Temi
        </h1>
        <p className="mt-2 text-lg font-medium tracking-[0.3em] text-gold sm:text-2xl">
          LIIXGHT
        </p>
        <div className="mt-6 h-px w-24 bg-gold/60" />
        <p className="mt-6 max-w-xl text-base leading-relaxed text-off-white/85 sm:text-lg">
          Computer Science student actively building real software —
          from responsive web interfaces to mobile experiments.
        </p>
      </div>

      <div className="absolute bottom-8 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.3em] text-off-white/50">
          scroll
        </span>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-off-white/30 p-1.5">
          <div className="h-2 w-1 animate-pulse rounded-full bg-gold" />
        </div>
      </div>
    </div>
  )
}