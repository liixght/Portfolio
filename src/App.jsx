import { useCallback } from 'react'
import PortfolioCanvas from './components/PortfolioCanvas'
import SceneOverlay from './components/SceneOverlay'
import { htmlPortal } from './components/htmlPortal'
import { mainProgress } from './lib/mainProgress'

export default function App() {
  const registerFill = useCallback((node) => {
    mainProgress.set(node)
  }, [])

  const registerPortal = useCallback((node) => {
    htmlPortal.current = node
  }, [])

  return (
    <div
      ref={registerPortal}
      className="relative h-screen w-screen overflow-hidden bg-black"
    >
      <PortfolioCanvas />
      <SceneOverlay />
      {/* Gold viewport line — the "new scrollbar": fills with page scroll
          progress (driven from WorkRoom's useFrame via mainProgress.update),
          replacing the hidden native page scrollbar. pointer-events none so
          it never captures wheel over the canvas. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[60] h-[2px]">
        <div
          ref={registerFill}
          className="h-full bg-gold shadow-[0_0_12px_0_rgba(204,170,119,0.35)]"
          style={{ width: '0%' }}
        />
      </div>
    </div>
  )
}
