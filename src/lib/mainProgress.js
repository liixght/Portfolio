export const mainProgress = {
  fill: null,
  set(node) {
    this.fill = node
  },
  update(p) {
    if (this.fill) {
      const w = (p * 100).toFixed(3)
      if (this.fill._last !== w) {
        this.fill._last = w
        this.fill.style.width = `${w}%`
      }
    }
  },
}
