const STORAGE_KEY = 'liixght:simpleMode'

function readInitial() {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

let simple = readInitial()
const listeners = new Set()

export const qualityStore = {
  get() {
    return simple
  },
  set(value) {
    simple = value
    try {
      window.localStorage.setItem(STORAGE_KEY, value ? '1' : '0')
    } catch {
      // ignore (private browsing / storage disabled)
    }
    listeners.forEach((l) => l(simple))
  },
  toggle() {
    qualityStore.set(!simple)
  },
  subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },
}