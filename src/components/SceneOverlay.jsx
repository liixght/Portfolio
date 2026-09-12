export default function SceneOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex items-start justify-between p-5 sm:p-6">
      <span className="select-none text-xs font-medium uppercase tracking-[0.4em] text-gold/80">
        Liixght
      </span>
      <a
        href="mailto:chat.temilope@gmail.com"
        className="pointer-events-auto text-xs tracking-wide text-off-white/60 transition-colors hover:text-gold"
      >
        chat.temilope@gmail.com
      </a>
    </div>
  )
}