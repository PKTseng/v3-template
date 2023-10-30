
import { ref, provide, inject, computed } from "vue";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  toolbarTitle: '',
});

export const authStoreContext = {
  state
};
export const provideAuthStore = () => provide("AuthStore", authStoreContext);
export const injectAuthStore = () => inject<typeof authStoreContext>("AuthStore");