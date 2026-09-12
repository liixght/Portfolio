import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import CameraRig from './CameraRig'
import HeroRoom from './HeroRoom'
import AboutRoom from './AboutRoom'
import WorkRoom from './WorkRoom'

const GOLD = '#ccaa77'

export default function PortfolioCanvas() {
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

      <ScrollControls pages={3} damping={0.25}>
        <CameraRig />
        <HeroRoom />
        <AboutRoom />
        <WorkRoom />
      </ScrollControls>
    </Canvas>
  )
}