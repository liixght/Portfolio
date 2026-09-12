import Room from './Room'
import RoomDisc from './RoomDisc'
import SectionLabel from './SectionLabel'

const GOLD = '#ccaa77'
const DARK_GOLD = '#9c7841'

export default function AboutRoom() {
  return (
    <Room position={[0, 0, -12]}>
      <RoomDisc />

      <group position={[0, 0.4, 0]} rotation={[Math.PI / 2.4, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.05, 12, 64]} />
          <meshStandardMaterial
            color={GOLD}
            flatShading
            metalness={0.75}
            roughness={0.3}
          />
        </mesh>
        <mesh scale={1.12} rotation={[0, 0.6, 0]}>
          <torusGeometry args={[1.5, 0.022, 8, 64]} />
          <meshBasicMaterial
            color={DARK_GOLD}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      <SectionLabel
        position={[0, 2.4, 0]}
        focus={0.5}
        wrapperClass="about-html"
        className="flex select-none flex-col items-center text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60">
          02
        </p>
        <h2 className="mt-1 text-xl font-semibold text-off-white">
          The Craft
        </h2>
        <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-off-white/40">
          about · skills · tools
        </p>
      </SectionLabel>
    </Room>
  )
}