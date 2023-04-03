import {
  GearIcon,
  GearPropType,
  GearReq,
  GearType,
  PotentialGrade,
  Soul,
} from "@malib/gear";

export interface GearLike {
  id: number;
  name: string;
  desc?: string;
  icon: GearIcon;
  anvilIcon?: GearIcon;
  anvilName?: string;
  type: GearType;
  req: GearReq;
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
  soul?: Soul;
  charge?: number;
  chargeOption?: [GearPropType, number][];
}
