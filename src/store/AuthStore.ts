import { ref, computed } from 'vue'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createContext } from '@/utils'
import { persistentRef } from '@/hooks/useLocalforage'

const state = ref({
  defaultPath: '',
  errMsg: '',
  toolbarTitle: ''
})

const persistentState = persistentRef(
  {
    userId: '',
    email: '',
    groupId: '',
    isGroupAdmin: false,
    projectList: []
  },
  { key: 'auth' }
)

const [provideAuthStore, injectAuthStore] = createContext({
  state,
  persistentState,
  isLogin: computed(() => {
    const [t] = useLocalStorage('token')
    return Boolean(t)
  })
})
export { provideAuthStore, injectAuthStore }
