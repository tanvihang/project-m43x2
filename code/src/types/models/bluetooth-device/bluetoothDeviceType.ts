import { Peripheral } from "react-native-ble-manager";

export type PeripheralWithMacId = {
    macId: string;
} & Peripheral;

export type DisconnectFromDeviceProps = {
  mode: 'manual' | 'signOut'
}

export enum DeviceConnectionStatusEnum {
  SUCCESS = 'SUCCESS',
  DEVICE_OCCUPIED = 'DEVICE_OCCUPIED',
  WRONG_DEVICE = 'WRONG_DEVICE',
  ERROR = 'ERROR',
  NOT_FROM_COMPANY = 'NOT_FROM_COMPANY',
  TIMEOUT = 'TIMEOUT',
  CHANGED_RING = "CHANGED_RING"
}