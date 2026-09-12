export default function Room({ position = [0, 0, 0], children }) {
  return <group position={position}>{children}</group>
}