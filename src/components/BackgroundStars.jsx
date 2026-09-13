import * as THREE from 'three'
import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'

// Code symbols that read as programming matter without being literal
const PRIMARY_SYMBOLS = ['~', '{}', '[]', '<>', '/', '+', ':', ';', '*']
const SECONDARY_SYMBOLS = ['&&', '||', '</>', '$', '#']

const GOLD = '#ccaa77'
const GOLD_DIM = '#9c7a4f'
const OFF_WHITE = '#e8e4dc'

// Build one small canvas texture per symbol (shared), real glyphs not dots
const textureCache = new Map()
function getSymbolTexture(symbol, color) {
  const key = symbol + color
  if (textureCache.has(key)) return textureCache.get(key)

  const px = 128
  const c = document.createElement('canvas')
  c.width = c.height = px
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, px, px)
  ctx.fillStyle = color
  ctx.font = '600 52px ui-monospace, SFMono-Regular, Menlo, monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(symbol, px / 2, px / 2 + 3)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 2
  textureCache.set(key, tex)
  return tex
}

// Weighted: primary symbols much more common than secondary
const POOL = []
for (const s of PRIMARY_SYMBOLS) for (let i = 0; i < 12; i++) POOL.push(s)
for (const s of SECONDARY_SYMBOLS) for (let i = 0; i < 3; i++) POOL.push(s)

const Z_FAR = -42
const Z_CAM = 8 // camera path is [0,0,8.0..-16]; symbols recycle past here

export default function BackgroundStars() {
  const { scene } = useThree()
  const scroll = useScroll()

  useEffect(() => {
    if (!scene) return

    const sprites = []
    const materials = []
    const count = 360

    const reset = (sprite) => {
      // Spread mostly away from the hero focal cylinder; few in the core
      let x, y
      do {
        x = (Math.random() - 0.5) * 52
        y = (Math.random() - 0.5) * 30
      } while (Math.abs(x) < 5 && Math.abs(y) < 3.5 && Math.random() < 0.75)

      sprite.position.set(x, y, Z_FAR + Math.random() * 36)
      const s = (0.175 + Math.random() * 0.425) * (0.6 + sprite.userData.depthFactor * 0.4)
      sprite.scale.set(s, s, 1)
      sprite.material.opacity = sprite.userData.baseOpacity
    }

    for (let i = 0; i < count; i++) {
      const symbol = POOL[(Math.random() * POOL.length) | 0]
      const isPrimary = PRIMARY_SYMBOLS.includes(symbol)
      const color = isPrimary
        ? Math.random() < 0.85 ? GOLD : GOLD_DIM
        : Math.random() < 0.9 ? GOLD_DIM : OFF_WHITE

      const texture = getSymbolTexture(symbol, color)
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        fog: true,
        opacity: 0.25 + Math.random() * 0.4,
      })
      materials.push(material)

      const sprite = new THREE.Sprite(material)
      sprite.userData = {
        depthFactor: 0.5 + Math.random() * 1.1, // parallax/drift multiplier
        blinkFreq: 0.4 + Math.random() * 1.9,   // randomized per-symbol
        blinkPhase: Math.random() * Math.PI * 2,
        baseOpacity: 0.22 + Math.random() * 0.4,
        wander: (Math.random() - 0.5) * 0.25,
      }

      reset(sprite)
      scene.add(sprite)
      sprites.push(sprite)
    }

    let prevOffset = scroll.offset
    let rafId = null
    let prevMs = 0

    const tick = (ms) => {
      const dt = Math.min((ms - prevMs) / 1000, 0.05)
      prevMs = ms

      // Warp speed from how fast the user is scrolling this frame
      const delta = Math.abs(scroll.offset - prevOffset)
      const speed = (2 + Math.min(delta * 9, 22)) * 0.7 // 30% slower // ambient 2 + scroll boost
      const dir = scroll.offset >= prevOffset ? 1 : -1
      prevOffset = scroll.offset

      const t = ms / 1000
      for (const sprite of sprites) {
        const ud = sprite.userData

        // Motion along Z (toward/past the camera); reverse on back-scroll
        sprite.position.z += dt * speed * dir * ud.depthFactor

        // Subtle sideways drift
        sprite.position.x += ud.wander * 0.02 * dt * 60

        // Blink: soft sine, randomized phase + frequency (never synchronous)
        const blink = 0.72 + 0.28 * Math.sin(t * ud.blinkFreq + ud.blinkPhase)
        sprite.material.opacity = ud.baseOpacity * blink

        // Recirculate once it passes the camera -> feels infinite
        if (sprite.position.z > Z_CAM + 2) {
          reset(sprite)
          sprite.position.z = Z_FAR
        }
      }

      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      sprites.forEach((sprite) => {
        scene.remove(sprite)
        sprite.material.dispose()
      })
      materials.forEach((m) => m.dispose())
    }
  }, [scene, scroll])

  return null
}