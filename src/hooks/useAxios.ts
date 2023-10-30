import axios from 'axios'
import type { AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import { useLocalStorage } from '@/hooks/useLocalStorage'
// import { useLocalStorage } from './useLocalStorage';
// import AlertDialog, { AlertType } from '@/components/AlertDialog';

import { injectGlobalStore } from '@/store/GlobalStore'
import { refreshToken } from './useAuth'
import { injectAuthStore } from '@/store/AuthStore'
// import { injectAuthStore } from '@/store/AuthStore';

const BASE_URL = process.env.VUE_APP_BASE_API_URL

export const createAxiosIns = (config?: CreateAxiosDefaults) => {
  let controller = new AbortController()
  const axiosIns = axios.create({
    baseURL: BASE_URL,
    ...config,
    withCredentials: true,
    signal: controller.signal
  })
  const abortRequest = () => {
    controller.abort()
    controller = new AbortController()
    axiosIns.defaults.signal = controller.signal
  }
  return { abortRequest, axiosIns }
}

export const useAxios = (axiosDefaultConfig: AxiosRequestConfig = {}) => {
  const { setIsLoading } = injectGlobalStore()!
  const { logout } = injectAuthStore()!
  const [token, setToken] = useLocalStorage('token')

  const { abortRequest, axiosIns } = createAxiosIns({
    ...axiosDefaultConfig,
    headers: {
      ...axiosDefaultConfig.headers,
      Authorization: token ? `Bearer ${token.replace(/^Bearer /, '')}` : undefined
    }
  })

  const _reTryRequest = async (config: AxiosRequestConfig) => {
    try {
      const { data: accessToken } = await refreshToken(undefined as any)

      setToken(accessToken)
      const { data } = await axiosIns.request({
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${accessToken.replace(/^Bearer /, '')}`
        }
      })
      return data
    } catch {
      logout()
    }
  }

  const request = async (axiosRequestConfig?: AxiosRequestConfig) => {
    try {
      setIsLoading(true)
      const { data } = await axiosIns.request({
        ...axiosDefaultConfig,
        ...axiosRequestConfig
      })
      if (data && typeof data === 'object' && 'errorCode' in data) {
        throw new Error(data?.errorMsg)
      }
      return data
    } catch (e: any) {
      if (e.response?.status === 401) {
        return await _reTryRequest({
          ...axiosDefaultConfig,
          ...axiosRequestConfig
        })
      }
      throw e
    } finally {
      setIsLoading(false)
    }
  }

  const requestWithoutLoadingEffect = async (axiosRequestConfig: AxiosRequestConfig) => {
    try {
      const { data } = await axiosIns.request({
        ...axiosDefaultConfig,
        ...axiosRequestConfig
      })
      if (data && typeof data === 'object' && 'errorCode' in data) {
        throw new Error(data?.errorMsg)
      }
      return data
    } catch (e: any) {
      if (e.response?.status === 401) {
        return await _reTryRequest({
          ...axiosDefaultConfig,
          ...axiosRequestConfig
        })
      }
      throw e
    }
  }

  const requestWithoutAuth = async (axiosRequestConfig: AxiosRequestConfig) => {
    const { data } = await axiosIns.request({
      ...axiosDefaultConfig,
      ...axiosRequestConfig
    })
    if (data && typeof data === 'object' && 'errorCode' in data) {
      throw new Error(data?.errorMsg)
    }
    return data
  }

  /*
  const {  } = useGlobalStore();

  const requestWithDialog = async (axiosRequestConfig: AxiosRequestConfig, opts = {}) => {

    const {
      successDialog,
      errorDialog,
      successMsg,
      errorMsg,
    } = opts || {};
    try {
      const data = await request(axiosRequestConfig);
      if (successDialog !== undefined) {
        openDialog(successDialog);
      } else {
        openDialog(
          <AlertDialog
            type={ AlertType.success }
            handleClose = { closeDialog }
          >
          { successMsg || '請求成功'}
      </AlertDialog>
        );
      }
return data;
    } catch (e) {
  if (errorDialog !== undefined) {
    openDialog(errorDialog);
  } else {
    openDialog(
      <AlertDialog
            type={ AlertType.error }
            handleClose = { closeDialog }
      >
      { errorMsg || '發生錯誤'}
  </AlertDialog>
        );
}
throw e;
    }
   
}; */

  return {
    request,
    /* requestWithDialog, */
    requestWithoutLoadingEffect,
    requestWithoutAuth,
    abortRequest
  }
}

export default useAxios
