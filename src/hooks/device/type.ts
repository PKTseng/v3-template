export interface IDeviceResponse {
  deviceType: string
  createTime: number
  updateTime: number
  accessToken: string
  deviceId: string
}

export interface IDevicePostCreateResponse {
  deviceType: string
  name: string
  id: string
  accessToken: string
  vendorName: string
  deviceId: string
  status: string
}

export interface IDevicePostUpdateRequest {
  deviceInfoList: Array<{
    deviceId: string
    name: string
    vendorName: string
    label: string
  }>
}

export interface IDevicePostUpdateResponse {
  deviceType: string
  name: string
  accessToken: string
  vendorName: string
  deviceId: string
  status: string
}

// attribute
export interface IDeviceAttrWithLastUpdateTimeResponse {
  lastUpdateTs: number
  key: string
  value: number
}
export interface IDeviceAttrResponse {
  active: boolean
  inactivityAlarmTime: number
}
export interface IDeviceAttrsRequest {
  deviceId: string
  hasLastUpdateTime: boolean
}

// install

export interface IDeviceInstallCheckGetRequest {
  upsVendor: string
  gatewayVendor: string
  batteryVendor: string

  gatewayId: string
  upsId: string
  batteryIdA: string
  batteryIdB: string
}
export interface IDeviceInstallCheckGetResponse {
  inputStatus: { value: string; ts: number }
  batteryALevel: { value: string | null; ts: number }
  batteryBLevel: { value: string | null; ts: number }
  upsStatus: { value: string | null; ts: number }
}

export interface ICheckBatteryInfo {
  batteryLabel: string
  batteryLevel: number
  batteryStatus: string
}

export interface ICheckDeviceInfo {
  checkBatteryInfoList: ICheckBatteryInfo[]
  gatewayLabel: string
  inputStatus: string
  inputVoltage: string
  upsLabel: string
  upsStatus: string
  upsTemperature: string
  updateTime: number
}

export interface IDeviceInstallPostRequest {
  intersectionId: string
  beforeImageBase64List: string[]
  afterImageBase64List: string[]
  duringImageBase64List: string[]
  checkDeviceInfo: ICheckDeviceInfo
}

export type IDeviceInstallPostResponse = IDeviceInstallPostRequest

export type IDeviceGetInstallLogResponse = {
  actionUserId: string
  beforeImageBase64List: string[]
  afterImageBase64List: string[]
  duringImageBase64List: string[]
  checkDeviceInfo: ICheckDeviceInfo
  createTime: number
  intersectionId: string
  updateTime: number
}

export interface IDeviceInstallImageGetRequest {
  installDeviceImageKey: string
}
export interface IDeviceInstallImageGetResponse {
  imageBase64: string
}

export interface IDeviceDeviceTag {
  batteryCapacity?: string
  gatewayModel?: string
  upsModel?: string
}

export interface IDevicePostItemRequest {
  deviceLabel: string
  deviceType: string
  deviceVendor: string
  deviceTag: IDeviceDeviceTag | null
}
export interface IDevicePostRequest {
  projectId: string
  createDeviceList: IDevicePostItemRequest[]
}

export interface IDeviceGetListRequest {
  projectId: string
  sort: string
  pageSize: number
  page: number
}

export interface IDeviceItemResponse {
  deviceId: string
  intersectionId: string
  deviceNumber: string
  deviceLabel: string
  deviceType: string
  deviceVendor: string
  deviceTag: IDeviceDeviceTag
  createTime: number
  updateTime: number
}
export interface IDeviceGetListResponse {
  data: IDeviceItemResponse[]
  totalElements: number
  totalPages: number
  hasNext: boolean
}

export interface IDeviceDeleteRequest {
  projectId: string
  deviceId: string
}

export interface IDeviceAddInstallDetailRequest {
  imageBase64List: string[]
  intersectionId: string
  remark: string
  installDeviceStatus: string
}
export interface IDeviceInstallDetailResponse {
  actionUserId: string
  createTime: number
  imageBase64List: string[]
  installDeviceDetailNumber: number
  installDeviceStatus: string
  intersectionId: string
  remark: string
  updateTime: number
}
