
import { ref, provide, inject, reactive } from "vue";

const state = reactive(
  {
    message: '預設的內容',
    drawer: null,
    drawerImage: true,
    mini: false,
    isPageLoading: false,
    // // 網頁初始化狀態
    // hasInitialized: false,
    items: [], // it's menu items 
    routePermissionSet: new Set(),
    groupOption: [],
  }
);

export const globalStoreContext = {
  state,
  setIsLoading: (bool: boolean) => state.isPageLoading = bool
};
export const provideGlobalStore = () => provide("globalStore", globalStoreContext);
export const injectGlobalStore = () => inject<typeof globalStoreContext>("globalStore");



