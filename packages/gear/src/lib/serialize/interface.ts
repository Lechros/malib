import { GearIcon, GearReq } from "../gear";
import { GearPropType } from "../gearproptype";
import { GearType } from "../geartype";
import { PotentialGrade } from "../potentialgrade";
import { Soul } from "../soul";

/**
 * `Gear`를 나타내는 순수 객체 형식
 */
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
  pots?: (PotLike | null)[];
  addGrade?: PotentialGrade;
  addPots?: (PotLike | null)[];
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
