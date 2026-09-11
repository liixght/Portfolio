import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const GOLD = '#ccaa77'
const DARK_GOLD = '#9c7841'

export default function HeroCrystal() {
  const crystalRef = useRef()
  const wireRef = useRef()
  const groupRef = useRef()

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.15
      crystalRef.current.rotation.x = Math.sin(t * 0.2) * 0.08
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.08
      wireRef.current.rotation.x = Math.sin(t * 0.18) * 0.05
    }
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.18
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={crystalRef} position={[0, 0.3, 0]} scale={1.35}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={DARK_GOLD}
          flatShading
          metalness={0.85}
          roughness={0.25}
          wireframe={false}
        />
      </mesh>
      <mesh ref={wireRef} position={[0, 0.3, 0]} scale={1.75}>
        <octahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>
      <mesh position={[0, 0.3, 0]} scale={0.55}>
        <octahedronGeometry args={[1, 2]} />
        <meshStandardMaterial
          color={GOLD}
          flatShading
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}