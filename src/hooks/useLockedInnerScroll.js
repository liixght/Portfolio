import { useEffect, useRef } from 'react'

const lineHeight = 16

function normalizeDelta(e, inner) {
  if (e.deltaMode === 1) return e.deltaY * lineHeight
  if (e.deltaMode === 2) return e.deltaY * inner.clientHeight
  return e.deltaY
}

export default function useLockedInnerScroll({ outerEl, active, scrollObj }) {
  const innerRef = useRef(null)
  const outerRef = useRef(outerEl)

  useEffect(() => {
    outerRef.current = outerEl
  }, [outerEl])

  useEffect(() => {
    let cleanup = null

    const onWheel = (e) => {
      if (e.ctrlKey) return
      const dy = normalizeDelta(e, innerRef.current)
      if (dy === 0) return

      const inner = innerRef.current
      if (!inner) return

      const maxInner = inner.scrollHeight - inner.clientHeight

      if (dy > 0) {
        // scrolling down
        if (inner.scrollTop < maxInner) {
          e.preventDefault()
          inner.scrollTop = Math.min(maxInner, inner.scrollTop + dy)
          return
        }
        // inner is at its bottom — hand off explicitly to the ScrollControls scroller
        if (scrollObj && scrollObj.el) {
          e.preventDefault()
          const outerEl = scrollObj.el
          const maxOuter = outerEl.scrollHeight - outerEl.clientHeight
          outerEl.scrollTop = Math.min(maxOuter, outerEl.scrollTop + dy)
        }
      } else {
        // scrolling up
        if (inner.scrollTop > 0) {
          e.preventDefault()
          inner.scrollTop = Math.max(0, inner.scrollTop + dy)
          return
        }
        // inner is at its top — hand off explicitly to the ScrollControls scroller
        if (scrollObj && scrollObj.el) {
          e.preventDefault()
          const outerEl = scrollObj.el
          outerEl.scrollTop = Math.max(0, outerEl.scrollTop + dy)
        }
      }
    }

    if (active === false) {
      // When inactive, don't attach wheel listener - let native scroll take over
      return () => {}
    }

    if (innerRef.current) {
      innerRef.current.addEventListener('wheel', onWheel, { passive: false })
    }

    cleanup = () => {
      if (innerRef.current) {
        innerRef.current.removeEventListener('wheel', onWheel)
      }
    }

    return () => {
      if (cleanup) cleanup()
    }
  }, [active, scrollObj])

  return innerRef
}