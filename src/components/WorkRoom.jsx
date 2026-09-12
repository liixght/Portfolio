import { Edges } from '@react-three/drei'
import Room from './Room'
import RoomDisc from './RoomDisc'
import SectionLabel from './SectionLabel'

const GOLD = '#ccaa77'

export default function WorkRoom() {
  return (
    <Room position={[0, 0, -24]}>
      <RoomDisc />

      <group position={[0, 0.3, 0]} rotation={[0, 0.4, 0]}>
        <mesh>
          <boxGeometry args={[1.7, 2.5, 0.3]} />
          <meshStandardMaterial
            color="#262626"
            flatShading
            metalness={0.25}
            roughness={0.7}
          />
          <Edges threshold={15} color={GOLD} />
        </mesh>
        <mesh position={[0, 0, 0.28]}>
          <boxGeometry args={[1.1, 1.7, 0.06]} />
          <meshStandardMaterial
            color={GOLD}
            flatShading
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </group>

      <SectionLabel
        position={[0, 2.6, 0]}
        focus={1}
        fadeRadius={0.17}
        wrapperClass="work-html"
        className="flex select-none flex-col items-center text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-gold/60">
          03
        </p>
        <h2 className="mt-1 text-xl font-semibold text-off-white">
          The Work
        </h2>
        <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-off-white/40">
          projects · contact
        </p>
      </SectionLabel>
    </Room>
  )
}