import { useCallback, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useScroll } from '@react-three/drei'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export default function SectionLabel({
  position,
  focus,
  fadeRadius = 0.17,
  wrapperClass,
  className,
  children,
}) {
  const scroll = useScroll()
  const nodeRef = useRef(null)
  const elRef = useCallback((node) => {
    nodeRef.current = node
  }, [])

  useFrame(() => {
    const node = nodeRef.current
    if (!node) return
    const distance = Math.abs(scroll.offset - focus) / fadeRadius
    const opacity = clamp(1 - distance, 0, 1)
    const next = String(opacity)
    if (node.dataset.op !== next) {
      node.style.opacity = next
      node.dataset.op = next
    }
  })

  return (
    <Html
      position={position}
      center
      pointerEvents="none"
      wrapperClass={wrapperClass}
    >
      <div ref={elRef} className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    </Html>
  )
}