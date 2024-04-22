export interface GearDataMap {
  [gearID: string]: GearData;
}

export interface GearData {
  name: string;
  desc?: string;
  icon: number;
  req?: GearReqData;
  props?: Record<string, number>;
  options?: Record<string, number>;
  tuc?: number;
  etuc?: number;
  pots?: SpecialOptionData[];
}

export interface GearReqData {
  level: number;
  str?: number;
  luk?: number;
  dex?: number;
  int?: number;
  job?: number;
  specJob?: number;
}

export interface SpecialOptionData {
  option: number;
  level: number;
}
