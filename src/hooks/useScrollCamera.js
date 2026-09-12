import { useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { Vector3 } from 'three'
import { CAMERA_WAYPOINTS } from '../config/cameraWaypoints'

export default function useScrollCamera() {
  const camera = useThree((state) => state.camera)
  const scroll = useScroll()

  const positions = useMemo(
    () => CAMERA_WAYPOINTS.map((waypoint) => new Vector3(...waypoint.position)),
    [],
  )
  const lookAts = useMemo(
    () => CAMERA_WAYPOINTS.map((waypoint) => new Vector3(...waypoint.lookAt)),
    [],
  )
  const targetPosition = useMemo(() => new Vector3(), [])
  const targetLookAt = useMemo(() => new Vector3(), [])

  useFrame(() => {
    const offset = Math.min(Math.max(scroll.offset, 0), 1)

    const segment = offset < 0.5 ? 0 : 1
    const localT = segment === 0 ? offset / 0.5 : (offset - 0.5) / 0.5

    targetPosition
      .copy(positions[segment])
      .lerp(positions[segment + 1], localT)
    targetLookAt
      .copy(lookAts[segment])
      .lerp(lookAts[segment + 1], localT)

    camera.position.copy(targetPosition)
    camera.lookAt(targetLookAt)
  })
}