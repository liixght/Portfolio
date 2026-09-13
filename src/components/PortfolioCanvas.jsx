import { useEffect } from 'react'
import BackgroundStars from "./BackgroundStars"
import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import CameraRig from './CameraRig'
import HeroRoom from './HeroRoom'
import AboutRoom from './AboutRoom'
import WorkRoom from './WorkRoom'
import SectionLabel from './SectionLabel'

const GOLD = '#ccaa77'

function useReloadSafeScroll() {
  useEffect(() => {
    const findScroller = () =>
      [...document.querySelectorAll('div')].reduce((best, el) => {
        const delta = el.scrollHeight - el.clientHeight
        return delta > 200 && (!best || delta > best.delta) ? { el, delta } : best
      }, null)
    const reset = () => {
      const found = findScroller()
      if (found && found.el.scrollTop !== 1) found.el.scrollTop = 1
    }
    // drei's ScrollControls only attaches its scroll listener while
    // `events.connected === el`; the connection happens on a rAF, so the
    // listener can race and never attach after a reload. Pinging a synthetic
    // resize forces the attach effect to re-run once the connection is live.
    const recover = () => {
      reset()
      window.dispatchEvent(new Event('resize'))
    }
    const timers = [0, 150, 500, 900].map((t) => setTimeout(recover, t))
    const onHide = () => reset()
    window.addEventListener('pagehide', onHide)
    return () => {
      timers.forEach((t) => clearTimeout(t))
      window.removeEventListener('pagehide', onHide)
    }
  }, [])
}

export default function PortfolioCanvas() {
  useReloadSafeScroll()
  return (
    <Canvas
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 12, 26]} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-6, -2, 4]} intensity={0.5} color={GOLD} />
      <pointLight position={[0, -4, 2]} intensity={0.4} color={GOLD} />

      <ScrollControls pages={3} damping={0.25} style={{ overflowAnchor: 'none' }}>
        <CameraRig />
        <HeroRoom />
        <AboutRoom />
        <WorkRoom />
        <SectionLabel
          position={[0, 0, -20]}
          windowStart={0.42}
          windowEnd={0.8}
          fadeIn={0.18}
          fadeOut={0.08}
          wrapperClass="about-html"
          className="flex w-max select-none flex-col items-center text-center whitespace-nowrap"
          navMode
          slideFrom={-12}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60">02</p>
          <h2 className="mt-1 text-xl font-semibold text-off-white">My Craft</h2>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-off-white/40">
            about · skills · tools
          </p>
        </SectionLabel>
        <SectionLabel
          position={[0, 0, -20]}
          windowStart={0.91}
          windowEnd={1}
          fadeIn={0.06}
          fadeOut={0}
          wrapperClass="work-html"
          className="flex w-max select-none flex-col items-center text-center whitespace-nowrap"
          navMode
          slideFrom={-12}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60">03</p>
          <h2 className="mt-1 text-xl font-semibold text-off-white">My Work</h2>
          <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-off-white/40">
            projects · contact
          </p>
        </SectionLabel>
        <BackgroundStars />
      </ScrollControls>
</Canvas>
  )
}