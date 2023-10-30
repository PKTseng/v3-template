import { ref, computed } from 'vue'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { createContext } from '@/utils'

const state = ref({
  isLogin: computed(() => {
    const [t] = useLocalStorage('token')
    return Boolean(t)
  }),

  userId: '',
  email: '',
  groupId: '',
  isGroupAdmin: false,
  defaultPath: '',
  projectList: [],
  errMsg: '',
  retryResolvedPromise: {},
  toolbarTitle: ''
})

const [provideAuthStore, injectAuthStore] = createContext({
  state
})
export { provideAuthStore, injectAuthStore }
