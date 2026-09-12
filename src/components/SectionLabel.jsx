import { useCallback, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { htmlPortal } from './htmlPortal'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
const smoothstep = (t) => t * t * (3 - 2 * t)

const _v = new THREE.Vector3()

export default function SectionLabel({
  position,
  windowStart = 0,
  windowEnd = 1,
  fadeIn = 0.08,
  fadeOut = 0.08,
  wrapperClass,
  className,
  children,
  navMode = false,
  slideFrom = 6,
}) {
  const scroll = useScroll()
  const nodeRef = useRef(null)
  const stateRef = useRef({ snap: null, slot: null })
  const elRef = useCallback((node) => {
    nodeRef.current = node
  }, [])

  const calculatePosition = useCallback(
    (group, camera, size) => {
      if (navMode) {
        const alias = document.getElementById('nav-alias')
        const r = alias && alias.getBoundingClientRect()
        const navCenterY = r ? r.top + r.height / 2 : 32
        const node = nodeRef.current
        const blockH = node ? node.offsetHeight : 54
        const slotY = navCenterY - 7 + blockH / 2
        return [size.width / 2, slotY]
      }

      _v.setFromMatrixPosition(group.matrixWorld)
      _v.project(camera)
      const px = (_v.x * size.width) / 2 + size.width / 2
      const py = (-_v.y * size.height) / 2 + size.height / 2

      if (windowStart <= 0) return [px, py]

      const offset = scroll.offset
      const centerX = size.width / 2
      const centerY = size.height / 2
      const settle = Math.min(0.04, fadeIn * 0.5)
      const settleStart = windowStart - settle

      if (offset < settleStart) {
        stateRef.current.snap = null
        return [px, py]
      }

      const snap = stateRef.current.snap
      if (!snap) {
        stateRef.current.snap = [px / size.width, py / size.height]
      }
      const [sx, sy] = stateRef.current.snap
      const sxAbs = sx * size.width
      const syAbs = sy * size.height
      const blend = smoothstep(clamp((offset - settleStart) / settle, 0, 1))

      if (offset < windowEnd) {
        return [
          px + (sxAbs - px) * blend,
          py + (syAbs - py) * blend,
        ]
      }

      if (fadeOut > 0 && offset < windowEnd + fadeOut) {
        const t = clamp((offset - windowEnd) / fadeOut, 0, 1)
        const s = smoothstep(t)
        const len = Math.hypot(sxAbs - centerX, syAbs - centerY) || 1
        const dx = (sxAbs - centerX) / len
        const dy = (syAbs - centerY) / len
        const dist = 160 + s * 520
        return [sxAbs + dx * dist * s, syAbs + dy * dist * s]
      }

      return [sxAbs, syAbs]
    },
    [scroll, windowStart, windowEnd, fadeIn, fadeOut, navMode],
  )

  useFrame(() => {
    const node = nodeRef.current
    if (!node) return
    const offset = scroll.offset
    const inT = clamp((offset - (windowStart - fadeIn)) / fadeIn, 0, 1)
    const outT = fadeOut > 0 ? clamp((windowEnd + fadeOut - offset) / fadeOut, 0, 1) : 1
    const inS = smoothstep(inT)
    const outS = smoothstep(outT)
    const opacity = Math.min(inS * outS, 1)
    const rounded = Math.round(opacity * 1000) / 1000
    const inExit = fadeOut > 0 && offset >= windowEnd && offset < windowEnd + fadeOut
    const rise = inExit ? slideFrom * (1 - outS) : slideFrom * (1 - inS)
    const scale = 0.97 + 0.03 * inS
    const next = `${rounded}|${rise.toFixed(1)}|${scale.toFixed(3)}`
    if (node.dataset.op !== next) {
      node.style.opacity = `${rounded}`
      node.style.transform = `translateY(${rise.toFixed(1)}px) scale(${scale.toFixed(3)})`
      node.dataset.op = next
    }
  })

  return (
    <Html
      position={position}
      calculatePosition={calculatePosition}
      center
      portal={htmlPortal}
      pointerEvents="none"
      wrapperClass={wrapperClass}
    >
      <div ref={elRef} className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    </Html>
  )
}