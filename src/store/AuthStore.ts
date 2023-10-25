
import { ref, provide, inject, computed } from "vue";
import * as apiAuth from "@/api/apiAuth"
import { useLocalStorage } from "@/hooks/useLocalStorage";
import router from "@/router/index"
import { parseJwt } from "@/utils/helpers";

const state = ref({
  userName: '',
  userEmail: '',
  userFirstName: '',
  isLogin: computed(() => {
    const [t] = useLocalStorage('token')
    return Boolean(t)
  })
});

const login = async (payload: { userName: string, password: string }) => {
  try {

    const { data: { accessToken, refreshToken } } = await apiAuth.login(payload)

    const [, setToken] = useLocalStorage('token')
    setToken(accessToken)
    const [, setRToken] = useLocalStorage('rToken')
    setRToken(refreshToken)

    /** @todo */
    const { parseJwtPayload: username } = parseJwt(accessToken)
    state.value.userName = username
    state.value.userEmail = username /* @userEmail ?? */

    const {
      data: {
        firstName,
        companyID
      }
    } = await apiAuth.getUserData(username)

    state.value.userFirstName = firstName
    const [, setIId] = useLocalStorage('iid')
    setIId(companyID)

    router.push('/')
  } catch (e) {
    console.error(e)
  }
}

const logout = async () => {

  const [, , rmToken] = useLocalStorage('token')
  const [rToken, , rmRToken] = useLocalStorage('rToken')
  const [, , rmIid] = useLocalStorage('iid')


  try {
    await apiAuth.logout({
      refresh_token: rToken,
      username: state.value.userName
    })
    rmToken()
    rmRToken()
    rmIid()

    router.replace('/login')
  } catch (e) {
    console.error(e)
  }

}

const resetSecret = async () => {
  try {
    await apiAuth.forgotPassword(state.value.userName)
  } catch (e) {
    console.error(e)
  }
}

export const authStoreContext = {
  state,
  login,
  resetSecret,
  logout,
};
export const provideAuthStore = () => provide("AuthStore", authStoreContext);
export const injectAuthStore = () => inject<typeof authStoreContext>("AuthStore");