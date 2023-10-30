/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NavigationGuard } from 'vue-router'

export const beforeEach: NavigationGuard = async (to, from, next) => {
  // console.log('[beforeEach] {to, from, next}', { to, from, next })

  const store = {} as any

  // 連結此網址（ 驗證重設 token 無誤 ）後導向重設密碼頁
  if (to.path === '/reset-password') {
    next()
    return
  }

  const hasInitialized = Boolean(store.get('app/hasInitialized'))

  // 檢查 hasInitialized 狀態
  if (!hasInitialized) {
    try {
      // 送出 action ( user/sync ) 檢查 token 狀態，設定 isLogin 狀態
      store.dispatch('user/sync')
    } catch (e) {
      console.error(e)
    }
  }

  // console.log('router [beforeEach] {isLogin}', { isLogin })

  const isLogin = Boolean(store.get('user').isLogin)

  // 加判斷，若使用者非登入狀態，關閉 hasInitialized
  if (to.path === '/login' && !isLogin) {
    store.set('app/hasInitialized', false)
    next()
    return
  }

  // 若不在 login 頁 & 為非登入狀態，導向 login 頁
  if (to.path !== '/login' && !isLogin) {
    next('/login')
    return
  }

  // 若在 login 頁 & 為登入狀態，導向 '/'
  if (to.path === '/login' && isLogin) {
    next('/')
    return
  }

  // 檢查路由權限
  // console.log('檢查路由權限 to', { to })
  if (hasInitialized && !store.get('app/routePermissionSet').has(to.name)) {
    nextToPermittedRoute(next)
    return
  }

  // 網頁 title 顯示分頁字串
  if (to.meta.metaInfo) {
    // 調用 vuex/store 的 metaModule 中的方法
    // 將路由中得到的值賦值到 vuex/store 的 metaModule 中的 state 裡
    store.commit('metaModule/CAHNGE_META_INFO', to.meta.metaInfo)
  }

  next()

  // 若上述條件均過、且 hasInitialized 當前狀態為「反」值，則設定初始化為 true
  if (!hasInitialized) {
    // 取得路由權限
    await store.dispatch('app/setRoutePermissions')
    // 取得登入使用者選單
    await store.dispatch('app/setMenuItem')

    // 設定 hasInitialized 為 true
    store.set('app/hasInitialized', true)

    // 在初始化狀態後檢查路由權限，並轉向至第一個
    if (!store.get('app/routePermissionSet').has(to.name)) {
      nextToPermittedRoute(next)
    }

    // API {groupCode} 儲存 app.js 中供 Table 需要用到的資料
  }
}

const nextToPermittedRoute = (next: any) => {
  const store = {} as any
  const flattedMenuItem = store.get('app/flattedMenuItem')
  next(flattedMenuItem.find((i: any) => Boolean(i.to)).to)
}
