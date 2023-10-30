import type { IDevicePostRequest, IDeviceInstallPostRequest, IDeviceInstallCheckGetRequest, IDeviceInstallCheckGetResponse, ICheckDeviceInfo, IDeviceGetInstallLogResponse, IDeviceGetListRequest, IDeviceGetListResponse, IDeviceDeleteRequest, IDeviceAddInstallDetailRequest, IDeviceInstallDetailResponse } from "./type";

export const deviceConfig = {
  // 新增Device
  create: (data: IDevicePostRequest) => ({
    url: '/bms/v1/auth/device',
    method: 'post',
    data
  }),

  // 安裝 Device
  install: (data: IDeviceInstallPostRequest) => ({
    url: '/bms/v1/auth/device/install',
    method: 'post',
    data
  }),

  // 安裝 Device 檢查
  check: (params: IDeviceInstallCheckGetRequest) => ({
    method: "get",
    url: '/bms/v1/auth/device/check',
    params
  }),

  // 已安裝 Device 列表
  getInstallCheck: (params: { intersectionId: string }) => ({
    method: 'get',
    url: "/bms/v1/auth/device/install/check",
    params
  }),

  // 已安裝 Device 列表
  getInstalledLogs: (params: { intersectionId: string }) => ({
    method: 'get',
    url: "/bms/v1/auth/device/install/log",
    params
  }),

  getDeviceList: (params: IDeviceGetListRequest) => ({
    method: 'get',
    url: "/bms/v1/auth/device/list",
    params
  }),

  deleteDevice: (params: IDeviceDeleteRequest) => ({
    method: 'get',
    url: "/bms/v1/auth/device",
    params
  }),

  addInstallDetail: (data: IDeviceAddInstallDetailRequest) => ({
    method: 'post',
    url: "/bms/v1/auth/device/install/detail",
    data
  }),

  getInstallDetailLog: (params: { intersectionId: string }) => ({
    method: 'get',
    url: "/bms/v1/auth/device/install/detail/log",
    params
  }),

  deleteInstallDetailLog: (params: { intersectionId: string }) => ({
    method: 'delete',
    url: "/bms/v1/auth/device/install/detail",
    params
  })

}
