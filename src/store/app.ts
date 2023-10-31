import config from '@/router/routesConfig'
import router from '@/router'
import { provide, inject, reactive } from 'vue'

export interface menuMapItem {
  name: string
  icon?: string // mdi-help-circle
  children?: menuMapItem[]
}

const menuMapItems: menuMapItem[] = reactive([
  { name: 'APIM 管理', icon: 'mdi-view-dashboard' },
  { name: '使用者管理', icon: 'mdi-view-dashboard' },
  { name: 'APIM 群組', icon: 'mdi-map-marker' }
])

const findRouteByName = (name: string) => config.find((x) => x.meta?.name === name)

const createMenuItem = (menuMapItem: menuMapItem, route: any): menuItem => ({
  title: route?.meta?.name ?? menuMapItem.name,
  icon: menuMapItem.icon,
  to: route?.path ?? '/',
  children: menuMapItem.children ? getMenuItem(menuMapItem.children) : undefined
})

const getMenuItem = (menuMapItems: menuMapItem[]): menuItem[] => {
  return menuMapItems.map((menuMapItem) => {
    return createMenuItem(menuMapItem, findRouteByName(menuMapItem.name))
  })
}

const userMenuPermission = () => {
  const roleToMenu: any = {
    BMS_SYSTEM_ADMIN: ['APIM 管理', '使用者管理', 'APIM 群組'],
    BMS_PROJECT_ADMIN: ['APIM 群組']
  }

  // const userRole = JSON.parse(localStorage.getItem('userRoleGroupName')!)
  const userRole = 'BMS_SYSTEM_ADMIN'
  state.userMenu = roleToMenu[userRole] || []
  state.permissionMenu = state.items.filter((o) => state.userMenu.includes(o.title))
  router.replace(state.permissionMenu[0]).catch((error) => error)
}

const state = reactive({
  message: '預設的內容',
  drawer: null,
  drawerImage: true,
  mini: false,
  isPageLoading: false,
  // // 網頁初始化狀態
  // hasInitialized: false,
  items: getMenuItem(menuMapItems), // it's menu items
  routePermissionSet: new Set(),
  groupOption: [],
  userMenu: [],
  permissionMenu: []
})

export const globalStoreContext = {
  state,
  setIsLoading: (bool?: boolean) =>
    (state.isPageLoading = bool === undefined ? !state.isPageLoading : bool)
}
export const provideGlobalStore = () => provide('globalStore', globalStoreContext)
export const injectGlobalStore = () => inject<typeof globalStoreContext>('globalStore')

export type menuItem = {
  title: string
  icon?: string
  to: string
  children?: menuItem[]
}

export interface menuMapItem {
  name: string
  icon?: string // mdi-help-circle
  children?: menuMapItem[]
}
