import { SITE } from '../config/site'

export default function SceneOverlay() {
  return (
    <div
      id="nav-row"
      className="pointer-events-none fixed inset-0 z-20 flex items-start justify-between p-5 sm:p-6"
    >
      <span
        id="nav-alias"
        className="select-none text-xs font-medium uppercase tracking-[0.4em] text-gold/80"
      >
        {SITE.alias}
      </span>
      <a
        href={`mailto:${SITE.email}`}
        className="pointer-events-auto text-xs tracking-wide text-off-white/60 transition-colors hover:text-gold"
      >
        {SITE.email}
      </a>
    </div>
  )
}