import config from '@/router/routesConfig'
// import router from '@/router'

import { ref } from 'vue'

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

// const menuMapItems: menuMapItem[] = ref([
//   { name: '專案管理', icon: 'mdi-view-dashboard' },
//   { name: '資訊總覽', icon: 'mdi-view-dashboard' },
//   { name: '檢視地圖', icon: 'mdi-map-marker' },
//   { name: '路口管理', icon: 'mdi-tune' },
//   {
//     name: '設備管理',
//     icon: 'mdi-toolbox',
//     children: [{ name: '新增路口及設備' }, { name: '路口及設備組合列表' }]
//   },
//   { name: '告警設定', icon: 'mdi-message-alert' },
//   { name: '資料查詢', icon: 'mdi-archive-search' },
//   { name: '報表查詢', icon: 'mdi-note-search' },
//   { name: '換修管理', icon: 'mdi-cog' },
//   {
//     name: '帳號管理',
//     icon: 'mdi-account-cog',
//     children: [{ name: '使用者帳號' }, { name: '使用者群組' }]
//   },
//   { name: '使用者帳號(專案)', icon: 'mdi-account-cog' },
//   { name: '使用者登入資料', icon: 'mdi-account-convert' }
// ])

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

// interface State {
//   drawerVisibility: boolean
//   footerVisibility: boolean
//   drawerIsMini: boolean
//   items: Array<menuItem>
//   isPageLoading: boolean
//   isProgressing: boolean
//   weather: string
//   permissionMenu: menuItem[]
//   switchValue: boolean | null
//   userMenu: string[]
//   currentStatus: boolean
// }

// export const useAppStore = defineStore('app', {
//   state: (): State => ({
//     drawerVisibility: true,
//     footerVisibility: false,
//     drawerIsMini: false,
//     items: getMenuItem(menuMapItems),
//     isPageLoading: false,
//     isProgressing: false,
//     weather: '',
//     permissionMenu: [],
//     switchValue: JSON.parse(localStorage.getItem('switchValue') as string),
//     userMenu: [],
//     currentStatus: false,
//   }),

//   actions: {
//     userMenuPermission() {
//       const roleToMenu = {
//         BMS_SYSTEM_ADMIN: ['資訊總覽', '檢視地圖', '路口管理', '設備管理', '告警設定', '資料查詢', '報表查詢', '換修管理', '帳號管理'],
//         BMS_PROJECT_ADMIN: ['資訊總覽', '檢視地圖', '路口管理', '設備管理', '資料查詢', '換修管理', '報表查詢', '帳號管理'],
//         BMS_ENGINEER: ['資訊總覽', '檢視地圖', '路口管理', '設備管理', '資料查詢', '換修管理'],
//         BMS_USER: ['資訊總覽', '檢視地圖', '路口管理', '設備管理', '資料查詢', '換修管理'],
//       }

//       const userRole = JSON.parse(localStorage.getItem('userRoleGroupName')!)
//       this.userMenu = roleToMenu[userRole] || []
//     },

//     toggleSwitchValue() {
//       const storedValue = localStorage.getItem('switchValue')
//       this.switchValue = storedValue === null ? true : !JSON.parse(storedValue)
//       localStorage.setItem('switchValue', JSON.stringify(this.switchValue))
//     },

//     mappingMenu() {
//       const userRoleGroupName = JSON.parse(localStorage.getItem('userRoleGroupName')!)

//       const menuList =
//         userRoleGroupName === 'BMS_SYSTEM_ADMIN' && !this.switchValue ? ['專案管理', '使用者帳號(專案)', '使用者登入資料'] : this.userMenu

//       this.permissionMenu = this.items.filter((item) => menuList.includes(item.title))
//     },

//     async switchMenu() {
//       this.toggleSwitchValue()
//       this.mappingMenu()

//       router.replace(this.permissionMenu[0].to).catch((error) => error)
//     },
//   },
// })
