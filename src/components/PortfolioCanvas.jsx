import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import HeroCrystal from './HeroCrystal'

const GOLD = '#ccaa77'

export default function PortfolioCanvas() {
  return (
    <Canvas
      className="!fixed inset-0"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'var(--black)',
      }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 12, 24]} />

      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} near={0.1} far={100} />

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-6, -2, 4]} intensity={0.5} color={GOLD} />
      <pointLight position={[0, -4, 2]} intensity={0.4} color={GOLD} />

      <HeroCrystal />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
        <circleGeometry args={[10, 48]} />
        <meshStandardMaterial
          color="#141414"
          roughness={1}
          metalness={0}
        />
      </mesh>
    </Canvas>
  )
}