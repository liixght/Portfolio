import Room from './Room'
import RoomDisc from './RoomDisc'
import HeroCrystal from './HeroCrystal'
import SectionLabel from './SectionLabel'

export default function HeroRoom() {
  return (
    <Room position={[0, 0, 0]}>
      <HeroCrystal />
      <RoomDisc radius={7} />

      <SectionLabel
        position={[0, 0.3, 0]}
        windowStart={0}
        windowEnd={0.24}
        fadeIn={0.06}
        fadeOut={0.08}
        wrapperClass="hero-html"
        className="flex select-none flex-col items-center text-center"
      >
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.35em] text-gold/80">
          ~ whoami
        </p>
        <h1 className="text-5xl font-bold text-off-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] sm:text-6xl">
          Temi
        </h1>
        <p className="mt-1 text-lg font-medium tracking-[0.3em] text-gold sm:text-xl">
          LIIXGHT
        </p>
        <div className="mt-4 h-px w-20 bg-gold/60" />
        <p className="mt-4 max-w-md text-sm leading-relaxed text-off-white/90 sm:text-base">
          Computer Science student actively building real software.
        </p>
      </SectionLabel>

      <SectionLabel
        position={[0, -3.05, 0]}
        windowStart={0}
        windowEnd={0.26}
        fadeIn={0.06}
        fadeOut={0.08}
        wrapperClass="hero-scroll-cue"
        className="flex select-none flex-col items-center gap-1.5"
      >
        <span className="animate-pulse text-[10px] uppercase tracking-[0.3em] text-off-white/50">
          scroll
        </span>
        <div className="flex h-6 w-4 items-start justify-center rounded-full border border-off-white/30 p-1">
          <div className="h-1.5 w-0.5 animate-pulse rounded-full bg-gold" />
        </div>
      </SectionLabel>
    </Room>
  )
}