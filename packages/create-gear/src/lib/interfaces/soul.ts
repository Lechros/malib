export interface SoulDataJson {
  [soulID: string]: SoulData;
}

export interface SoulData {
  name: string;
  skill: string;
  multiplier: number;
  magnificent?: boolean;
  option?: SoulOption;
  options?: MagnificentSoulOption;
}

export interface SoulOption {
  [type: string]: number;
}

export interface MagnificentSoulOption {
  [magnificentType: string]: SoulOption;
}
