export function hasWebGL() {
  if (typeof window === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}