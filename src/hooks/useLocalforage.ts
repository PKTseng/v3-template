import localforage from 'localforage'
import { ref, watchEffect } from 'vue'

export const persistentRef = <T>(state: T, opt: { key: string }) => {
  const cRef = ref<T>()

  const isSyncFromForage = ref<boolean>(false)

  watchEffect(async () => {
    if (!isSyncFromForage.value) {
      cRef.value = (await LocalForage.get<T>(opt.key)) || (await LocalForage.set(opt.key, state))
    }
  })

  watchEffect(async () => {
    await LocalForage.set(opt.key, { ...cRef.value })
  })

  return cRef
}

export class LocalForage {
  private static _store = localforage.createInstance({})

  static async get<T>(k: string) {
    return (await LocalForage._store.getItem(k)) as T
  }

  static async set<T>(k: string, v: T) {
    return (await LocalForage._store.setItem(k, v)) as T
  }
}
