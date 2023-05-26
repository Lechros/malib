import { Anvil, GearIcon, GearReq } from "../gear";
import { GearPropType } from "../gearproptype";
import { GearType } from "../geartype";
import { PotentialGrade } from "../potentialgrade";

/**
 * `Gear`를 나타내는 순수 객체 형식
 */
export interface GearLike {
  /** id */
  id: number;
  /** name */
  n: string;
  /** desc */
  d?: string;
  /** icon */
  i: GearIcon;
  /** anvil */
  an?: Anvil;
  /** type */
  t: GearType;
  /** req */
  r: GearReq;
  /** props */
  pr: [GearPropType, number][];
  /** options */
  o: [GearPropType, OptionLike][];
  /** totalUpgradeCount */
  c?: number;
  /** upgradeCount */
  up?: number;
  /** failCount */
  f?: number;
  /** hammerCount */
  h?: number;
  /** exceptionalTotalUpgradeCount */
  ec?: number;
  /** exceptionalUpgradeCount */
  eu?: number;
  /** exceptionalOptions */
  eo?: [GearPropType, number][];
  /** maxStar */
  m?: number;
  /** star */
  s?: number;
  /** amazing */
  a?: boolean;
  /** karma */
  k?: number;
  /** canPotential */
  cp?: boolean;
  /** grade */
  g?: PotentialGrade;
  /** potentials */
  p?: (PotLike | null)[];
  /** additionalGrade */
  g2?: PotentialGrade;
  /** additionalPotentials */
  p2?: (PotLike | null)[];
  /** soulWeapon */
  w?: SoulWeaponLike;
}

/** base, bonus, upgrade, enchant */
export type OptionLike = [number, number, number, number];

export interface PotLike {
  /** code */
  c: number;
  /** optionType */
  t: number;
  /** reqLevel */
  l: number;
  /** summary */
  s: string;
  /** options */
  o: [GearPropType, number][];
}

export interface SoulWeaponLike {
  /** enchanted */
  e?: boolean;
  /** soul */
  s?: SoulLike;
  /** charge */
  c?: number;
  /** chargeOption */
  o?: [GearPropType, number][];
}

export interface SoulLike {
  /** name */
  n: string;
  /** skill */
  s: string;
  /** option */
  o: [GearPropType, number][];
  /** multiplier */
  m: number;
}
