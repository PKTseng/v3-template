import { authConfig } from "./api"
import { useLocalStorage } from "../useLocalStorage"
import router from "@/router/index"
import type { ILoginRequest } from "./type"
import axios from "axios"
import type { AxiosRequestConfig } from 'axios';
import { onMounted, ref } from "vue"
import useAxios from "../useAxios"
// import { injectAuthStore } from "@/store/AuthStore"

export const useAuth = () => {

  // const authStore = injectAuthStore()

  const [, setToken, rmToken] = useLocalStorage('token')

  const isLoading = ref<boolean>(false)

  const logout = async () => {
    rmToken()
    router.replace('/login')
  }

  const login = async (data: ILoginRequest) => {
    try {
      const { request: requestToken } = useAxios<ILoginRequest, string>(authConfig.login)
      setToken(await requestToken(data))
      router.push('/')
    } catch (e) {
      console.error(e)
    }
  }

  /** 和 useAxios 不能互相依賴的，因為 useAxios 內的請求包裝使用這邊的東西 */
  const retry = async <TRes>(config: AxiosRequestConfig) => {
    try {
      const { data: accessToken } = await axios.request<string>(authConfig.getRefreshedAccessToken())
      setToken(accessToken)
      return await axios.request<TRes>({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken.replace(/^Bearer /, '')}`,
        },
      })
    } catch {
      logout()
      throw ("no auth , logout")
    }
  }


  /** version block .... */
  const version = ref('')
  const setVersion = async () => {
    const { request: requestVersion } = useAxios<void, string>(authConfig.getVersion)
    const ver = await requestVersion()
    version.value = ver
  }

  /** captcha block .... */
  const captchaImgBase64Src = ref('')
  const refreshCaptchaBase64 = async () => {
    const { data } = await axios.request<string>(authConfig.getCaptcha())
    captchaImgBase64Src.value = data
  }

  onMounted(() => {
    setVersion()
    refreshCaptchaBase64()
  })

  return {
    logout, login, retry, version,
    captchaImgBase64Src,
    refreshCaptchaBase64,
    isLoading
  }
}