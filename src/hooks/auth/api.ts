import type { ILoginRequest } from "./type"

export const authConfig = {
  getCaptcha: () => ({
    url: '/bms/v1/noauth/generate-validate-image',
    method: 'post'
  }),
  login: (data: ILoginRequest) => ({
    url: '/bms/v1/noauth/token',
    method: 'post',
    data
  }),
  getRefreshedAccessToken: () => ({
    url: '/bms/v1/noauth/token/refresh',
    method: 'post',
  }),
  getVersion: () => ({
    url: '/bms/v1/auth/admin/version',
    method: 'get',
  })
}