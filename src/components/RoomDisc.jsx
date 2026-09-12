const GOLD = '#ccaa77'

export default function RoomDisc({ radius = 6.5, y = -3.4 }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]}>
        <circleGeometry args={[radius, 48]} />
        <meshStandardMaterial color="#141414" roughness={1} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y + 0.02, 0]}>
        <ringGeometry args={[radius, radius + 0.045, 96]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}