export default interface IExclusiveEquipJson {
  [exclusiveEquipID: string]: IExclusiveEquip
}

export interface IExclusiveEquip {
  code: number
  info?: string
  item: number[]
  msg?: string
}
