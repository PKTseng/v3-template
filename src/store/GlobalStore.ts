import { reactive } from 'vue'
import { createContext } from '.'

const state = reactive({
  message: '預設的內容',
  drawer: null,
  drawerImage: true,
  mini: false,
  isPageLoading: false,
  // // 網頁初始化狀態
  // hasInitialized: false,
  items: [], // it's menu items
  routePermissionSet: new Set(),
  groupOption: []
})

const [provideGlobalStore, injectGlobalStore] = createContext({
  state,
  setIsLoading: (bool?: boolean) =>
    (state.isPageLoading = bool === undefined ? !state.isPageLoading : bool)
})
export { provideGlobalStore, injectGlobalStore }
