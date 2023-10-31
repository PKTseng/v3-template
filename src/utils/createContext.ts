import { provide, inject } from 'vue'

export const createContext = <T>(ctx: T) => {
  const storeKey = crypto.randomUUID()
  return [() => provide(storeKey, ctx), () => inject<T>(storeKey)!] as const
}
