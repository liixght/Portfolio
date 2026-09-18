import { SITE } from "../config/site";

export default function WebGLFallback() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-black px-6 text-center">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.35em] text-gold/80">
        ~ whoami
      </p>
      <h1 className="text-4xl font-bold text-off-white sm:text-5xl">Temi</h1>
      <p className="mt-1 text-lg font-medium tracking-[0.3em] text-gold sm:text-xl">
        LIIXGHT
      </p>
      <div className="mt-4 h-px w-16 bg-gold/60" />
      <p className="mt-4 max-w-md text-sm leading-relaxed text-off-white/80 sm:text-base">
        {SITE.tagline}
      </p>
      <p className="mt-8 max-w-sm text-xs leading-relaxed text-off-white/50">
        Your browser or device doesn't support the 3D experience this portfolio
        normally runs. Here's the short version instead.
      </p>

      <a
        href={`mailto:${SITE.email}`}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-off-white/30 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-off-white/80 transition-colors hover:border-gold hover:text-gold"
      >
        {SITE.email}
      </a>
    </div>
  );
}
