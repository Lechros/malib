import { GearPropType, GearType, PotentialGrade } from "@malib/gear";

export interface GearLike {
  id: number;
  name: string;
  desc?: string;
  icon: IconLike;
  anvilIcon?: IconLike;
  anvilName?: string;
  type: GearType;
  req: ReqLike;
  props: [GearPropType, number][];
  options: [GearPropType, OptionLike][];
  tuc?: number;
  up?: number;
  fail?: number;
  hammer?: number;
  maxStar?: number;
  star?: number;
  amazing?: boolean;
  karma?: number;
  canPot?: boolean;
  grade?: PotentialGrade;
  pots?: (PotLike | undefined)[];
  addGrade?: PotentialGrade;
  addPots?: (PotLike | undefined)[];
  soulWeapon: SoulWeaponLike;
}

export interface IconLike {
  id: number;
  origin: [number, number];
}

export interface ReqLike {
  level: number;
  str?: number;
  luk?: number;
  dex?: number;
  int?: number;
  job: number;
  spec?: number;
}

export interface OptionLike {
  base?: number;
  bonus?: number;
  upgrade?: number;
  enchant?: number;
}

export interface PotLike {
  code: number;
  optionType: number;
  reqLevel: number;
  summary: string;
  option: [GearPropType, number][];
}

export interface SoulWeaponLike {
  enchanted?: boolean;
  soul?: SoulLike;
  charge?: number;
  chargeOption?: [GearPropType, number][];
}

export interface SoulLike {
  name: string;
  skill: string;
  option: Map<GearPropType, number>;
  mul: number;
}
