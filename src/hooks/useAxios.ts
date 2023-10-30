import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { injectGlobalStore } from '@/store/GlobalStore'
import { useAuth } from './auth/useAuth'
const BASE_URL = import.meta.env.BASE_API_URL

export const createAxiosIns = (config?: AxiosRequestConfig) => {
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

export const useAxios = <TReq = unknown, TRes = unknown>(
  getAxiosConfigFn: (arg: TReq) => AxiosRequestConfig<unknown>,
  axiosRequestConfigDefault?: AxiosRequestConfig<unknown>
) => {
  const { setIsLoading } = injectGlobalStore()!
  const [token] = useLocalStorage<string>('token')
  const { retry } = useAuth()
  const { abortRequest, axiosIns } = createAxiosIns({
    ...axiosRequestConfigDefault,
    headers: {
      ...axiosRequestConfigDefault?.headers,
      Authorization:
        token.value !== undefined ? `Bearer ${token.value.replace(/^Bearer /, '')}` : ''
    }
  })

  const request = async (variables: TReq): Promise<TRes> => {
    const axiosConfig = getAxiosConfigFn(variables)
    try {
      setIsLoading(true)
      const { data } = await axiosIns.request<TRes>(axiosConfig)
      return data
    } catch (e: any) {
      if (e.response?.status === 401) {
        const { data } = await retry<TRes>(axiosConfig)
        return data
      }
      throw new Error('un catch error')
    } finally {
      setIsLoading(false)
    }
  }

  const requestWithoutLoadingEffect = async (variables: TReq): Promise<TRes> => {
    const axiosConfig = getAxiosConfigFn(variables)
    try {
      const { data } = await axiosIns.request<TRes>(axiosConfig)
      return data
    } catch (e: any) {
      if (e.response?.status === 401) {
        const { data } = await retry<TRes>(axiosConfig)
        return data
      }
      throw new Error('un catch error')
    }
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
    abortRequest
  }
}

export default useAxios
