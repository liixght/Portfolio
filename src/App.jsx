import { useCallback, useState } from 'react'
import PortfolioCanvas from './components/PortfolioCanvas'
import SceneOverlay from './components/SceneOverlay'
import WebGLFallback from './components/WebGLFallback'
import { hasWebGL } from './lib/hasWebGL'
import { htmlPortal } from './components/htmlPortal'
import { mainProgress } from './lib/mainProgress'

export default function App() {
  const [webglSupported] = useState(hasWebGL)

  const registerFill = useCallback((node) => {
    mainProgress.set(node)
  }, [])

  const registerPortal = useCallback((node) => {
    htmlPortal.current = node
  }, [])

  if (!webglSupported) {
    return <WebGLFallback />
  }

  return (
    <div
      ref={registerPortal}
      className="relative h-screen w-screen overflow-hidden bg-black"
    >
      <PortfolioCanvas />
      <SceneOverlay />
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