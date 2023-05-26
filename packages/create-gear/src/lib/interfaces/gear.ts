export interface GearDataJson {
  [gearID: string]: GearData;
}

export interface GearData {
  name: string;
  desc?: string;
  icon: number;
  req?: GearReqData;
  props?: number;
  options?: number;
  tuc?: number;
  etuc?: number;
  pots?: SpecialOptionData[];
}

export interface GearReqData {
  level: number;
  str: number;
  luk: number;
  dex: number;
  int: number;
  job: number;
  specJob: number;
}

export interface SpecialOptionData {
  option: number;
  level: number;
}
