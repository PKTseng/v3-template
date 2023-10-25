import useAxios, { createAxiosIns } from "@/hooks/useAxios";

// don't use the custom request hook , which contains the auth logic 
// it should use plain axios here.
const { axiosIns } = createAxiosIns()

export const login = (payload: {
  password: string
  userName: string
}) => axiosIns.post("/fivegpn/auth/token", payload)

/** ?? why extra config set */
export const forgotPassword = (username: string) => axiosIns.get(`/fivegpn/auth/user/forgetPwMail/${username}`, {
  data: {}, // get 方法，建立 data:{} 空值繞過 axios remove hearders 判斷
  headers: {
    'Content-Type': 'application/json'
  }
})

export const refreshToken = (payload: {
  username: string,
  refresh_token: string
}) => axiosIns.post("/fivegpn/auth/refreshToken", payload)


export const logout = (payload: {
  refresh_token: string
  username: string
}) => axiosIns.post('/fivegpn/auth/logout', payload)

export const getUserData = (username: string) => axiosIns.get(`/fivegpn/auth/user/${username}`)

