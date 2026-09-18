import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { qualityStore } from '../lib/qualityStore'

const PRIMARY_SYMBOLS = ['~', '{}', '[]', '<>', '/', '+', ':', ';', '*']
const SECONDARY_SYMBOLS = ['&&', '||', '</>', '$', '#']

const GOLD = '#ccaa77'
const GOLD_DIM = '#9c7a4f'
const OFF_WHITE = '#e8e4dc'

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

const POOL = []
for (const s of PRIMARY_SYMBOLS) for (let i = 0; i < 12; i++) POOL.push(s)
for (const s of SECONDARY_SYMBOLS) for (let i = 0; i < 3; i++) POOL.push(s)

const Z_FAR = -42
const Z_CAM = 8

const FULL_COUNT = 360
const SIMPLE_COUNT = 90

export default function BackgroundStars() {
  const { scene } = useThree()
  const scroll = useScroll()
  const spritesRef = useRef([])

  useEffect(() => {
    if (!scene) return

    const sprites = []
    const materials = []

    const reset = (sprite) => {
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

    for (let i = 0; i < FULL_COUNT; i++) {
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
        depthFactor: 0.5 + Math.random() * 1.1,
        blinkFreq: 0.4 + Math.random() * 1.9,
        blinkPhase: Math.random() * Math.PI * 2,
        baseOpacity: 0.22 + Math.random() * 0.4,
        wander: (Math.random() - 0.5) * 0.25,
      }
      sprite.visible = i < (qualityStore.get() ? SIMPLE_COUNT : FULL_COUNT)

      reset(sprite)
      scene.add(sprite)
      sprites.push(sprite)
    }

    spritesRef.current = sprites

    const unsubscribe = qualityStore.subscribe((simple) => {
      const visibleCount = simple ? SIMPLE_COUNT : FULL_COUNT
      sprites.forEach((sprite, i) => {
        sprite.visible = i < visibleCount
      })
    })

    return () => {
      unsubscribe()
      spritesRef.current = []
      sprites.forEach((sprite) => scene.remove(sprite))
      materials.forEach((m) => m.dispose())
    }
  }, [scene])

  const prevOffset = useRef(scroll.offset)

  useFrame((state, delta) => {
    const sprites = spritesRef.current
    if (!sprites.length) return

    const dt = Math.min(delta, 0.05)
    const off = scroll.offset
    const scrollDelta = Math.abs(off - prevOffset.current)
    const speed = (2 + Math.min(scrollDelta * 9, 22)) * 0.7
    const dir = off >= prevOffset.current ? 1 : -1
    prevOffset.current = off

    const t = state.clock.elapsedTime
    const visibleCount = qualityStore.get() ? SIMPLE_COUNT : FULL_COUNT

    for (let i = 0; i < visibleCount; i++) {
      const sprite = sprites[i]
      const ud = sprite.userData

      sprite.position.z += dt * speed * dir * ud.depthFactor
      sprite.position.x += ud.wander * 0.02 * dt * 60

      const blink = 0.72 + 0.28 * Math.sin(t * ud.blinkFreq + ud.blinkPhase)
      sprite.material.opacity = ud.baseOpacity * blink

      if (sprite.position.z > Z_CAM + 2) {
        let x, y
        do {
          x = (Math.random() - 0.5) * 52
          y = (Math.random() - 0.5) * 30
        } while (Math.abs(x) < 5 && Math.abs(y) < 3.5 && Math.random() < 0.75)
        sprite.position.set(x, y, Z_FAR)
        const s = (0.175 + Math.random() * 0.425) * (0.6 + ud.depthFactor * 0.4)
        sprite.scale.set(s, s, 1)
        sprite.material.opacity = ud.baseOpacity
      }
    }
  })

  return null
}