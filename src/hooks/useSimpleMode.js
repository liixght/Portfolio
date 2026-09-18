import { useSyncExternalStore } from 'react'
import { qualityStore } from '../lib/qualityStore'

export function useSimpleMode() {
  return useSyncExternalStore(qualityStore.subscribe, qualityStore.get)
}