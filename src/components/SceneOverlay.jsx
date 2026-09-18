import { SITE } from '../config/site'
import { useSimpleMode } from '../hooks/useSimpleMode'
import { qualityStore } from '../lib/qualityStore'

export default function SceneOverlay() {
  const simpleMode = useSimpleMode()

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
      <div className="pointer-events-auto flex items-center gap-4">
        <button
          type="button"
          onClick={() => qualityStore.toggle()}
          title="Reduce visual effects for better performance on lower-end devices"
          className="rounded-full border border-off-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-off-white/60 transition-colors hover:border-gold/50 hover:text-gold"
        >
          {simpleMode ? 'simple: on' : 'simple: off'}
        </button>
        
          <a href={`mailto:${SITE.email}`}
          className="text-xs tracking-wide text-off-white/60 transition-colors hover:text-gold"
        >
          {SITE.email}
        </a>
      </div>
    </div>
  )
}