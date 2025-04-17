import { AddOptionCan, GearAddOption, GearType } from '../data';
import { ErrorMessage } from '../errors';
import { Gear } from '../Gear';
import { isAccessory, isArmor, isShield, isWeapon } from '../gearType';

export enum AddOptionType {
  /** STR */
  str = 'str',
  /** DEX */
  dex = 'dex',
  /** INT */
  int = 'int',
  /** LUK */
  luk = 'luk',
  /** STR, DEX */
  str_dex = 'str,dex',
  /** STR, INT */
  str_int = 'str,int',
  /** STR, LUK */
  str_luk = 'str,luk',
  /** DEX, INT */
  dex_int = 'dex,int',
  /** DEX, LUK */
  dex_luk = 'dex,luk',
  /** INT, LUK */
  int_luk = 'int,luk',
  /** 최대 HP */
  maxHp = 'maxHp',
  /** 최대 MP */
  maxMp = 'maxMp',
  /** 공격력 */
  attackPower = 'attackPower',
  /** 마력 */
  magicPower = 'magicPower',
  /** 방어력 */
  armor = 'armor',
  /** 이동속도 */
  speed = 'speed',
  /** 점프력 */
  jump = 'jump',
  /** 보스 공격 시 데미지 증가(%) */
  bossDamage = 'bossDamage',
  /** 데미지(%) */
  damage = 'damage',
  /** 올스탯(%) */
  allStat = 'allStat',
  /** 착용 레벨 감소 */
  reqLevelDecrease = 'reqLevelDecrease',
}

export type AddOptionGrade = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * 장비가 추가 옵션을 지원하는지 확인합니다.
 * @param gear 확인할 장비.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function supportsAddOption(gear: Gear): boolean {
  if (gear.attributes.canAddOption === AddOptionCan.Can) {
    return true;
  }
  if (gear.attributes.canAddOption === AddOptionCan.Cannot) {
    return false;
  }
  if (isWeapon(gear.type)) {
    return true;
  }
  if (isArmor(gear.type)) {
    return !isShield(gear.type);
  }
  if (isAccessory(gear.type)) {
    return ![GearType.ring, GearType.shoulder].includes(gear.type);
  }
  if (gear.type === GearType.pocket) {
    return true;
  }
  return false;
}

/**
 * 장비에 적용되는 추가 옵션을 계산합니다.
 * @param gear 추가옵션을 계산할 장비.
 * @param type 추가 옵션 종류.
 * @param grade 추가 옵션 등급.
 * @returns 추가 옵션 종류 및 등급에 해당하는 옵션.
 *
 * @throws {@link TypeError}
 * 장비에 부여할 수 없는 추가 옵션을 지정했을 경우.
 */
export function getAddOption(
  gear: Gear,
  type: AddOptionType,
  grade: AddOptionGrade,
): Partial<GearAddOption> {
  const keys = _getAddOptionKeys(type);
  const value = getAddOptionValue(gear, type, grade);
  const entries = keys.map((key) => [key, value] as const);

  return Object.fromEntries(entries);
}

/**
 * 장비에 적용되는 추가 옵션 종류에 따른 값을 계산합니다.
 * @param gear 추가옵션을 계산할 장비.
 * @param type 추가 옵션 종류.
 * @param grade 추가 옵션 등급.
 * @returns 추가 옵션 값.
 *
 * @throws {@link TypeError}
 * 장비에 부여할 수 없는 추가 옵션을 지정했을 경우.
 */
export function getAddOptionValue(
  gear: Gear,
  type: AddOptionType,
  grade: AddOptionGrade,
): number {
  const ctx = {
    type,
    reqLevel: gear.req.level,
    gearType: gear.type,
    bossReward: gear.attributes.bossReward,
    attackPower: gear.baseOption.attackPower,
    magicPower: gear.baseOption.magicPower,
  };

  switch (type) {
    case AddOptionType.str:
    case AddOptionType.dex:
    case AddOptionType.int:
    case AddOptionType.luk:
      return _getSingleStatValue(grade, ctx);
    case AddOptionType.str_dex:
    case AddOptionType.str_int:
    case AddOptionType.str_luk:
    case AddOptionType.dex_int:
    case AddOptionType.dex_luk:
    case AddOptionType.int_luk:
      return _getDoubleStatValue(grade, ctx);
    case AddOptionType.armor:
      return _getSingleStatValue(grade, ctx);
    case AddOptionType.attackPower:
    case AddOptionType.magicPower:
      return _getPowerValue(grade, ctx);
    case AddOptionType.maxHp:
    case AddOptionType.maxMp:
      return _getHpMpValue(grade, ctx);
    case AddOptionType.speed:
      return _getSpeedValue(grade, ctx);
    case AddOptionType.jump:
      return _getJumpValue(grade, ctx);
    case AddOptionType.damage:
      return _getDamageValue(grade, ctx);
    case AddOptionType.bossDamage:
      return _getBossDamageValue(grade, ctx);
    case AddOptionType.allStat:
      return _getAllStatValue(grade, ctx);
    case AddOptionType.reqLevelDecrease:
      return _getReqLevelDecreaseValue(grade, ctx);
  }
}

export interface AddOptionContext {
  type: AddOptionType;
  reqLevel: number;
  gearType: GearType;
  bossReward: boolean;
  attackPower: number;
  magicPower: number;
}

export function _getSingleStatValue(
  grade: AddOptionGrade,
  { reqLevel }: Pick<AddOptionContext, 'reqLevel'>,
): number {
  if (reqLevel >= 250) {
    return Math.floor(reqLevel / 20) * grade;
  }
  return (Math.floor(reqLevel / 20) + 1) * grade;
}

export function _getDoubleStatValue(
  grade: AddOptionGrade,
  { reqLevel }: Pick<AddOptionContext, 'reqLevel'>,
): number {
  return (Math.floor(reqLevel / 40) + 1) * grade;
}

export function _getPowerValue(
  grade: AddOptionGrade,
  ctx: AddOptionContext,
): number {
  const { reqLevel, gearType } = ctx;
  if (isWeapon(gearType)) {
    return _getWeaponPowerValue(grade, ctx);
  } else if (reqLevel >= 60) {
    return grade;
  } else {
    throw TypeError(ErrorMessage.AddOption_InvalidAttackPowerGear);
  }
}

export function _getWeaponPowerValue(
  grade: AddOptionGrade,
  ctx: AddOptionContext,
) {
  const { reqLevel, type, gearType, bossReward, attackPower, magicPower } = ctx;
  const data = bossReward
    ? [0, 0, 1, 1.4666, 2.0166, 2.663, 3.4166]
    : [1, 2.222, 3.63, 5.325, 7.32, 8.777, 10.25];
  if (gearType === GearType.heavySword || gearType === GearType.longSword) {
    const power = _getZeroWeaponAttackPower(gearType, ctx);
    const value =
      reqLevel > 180 ? 6 : reqLevel > 160 ? 5 : reqLevel > 110 ? 4 : 3;
    return Math.ceil((power * data[grade - 1] * value) / 100);
  } else {
    const power =
      type === AddOptionType.magicPower && magicPower > attackPower
        ? magicPower
        : attackPower;
    if (bossReward) {
      const value =
        reqLevel > 160 ? 6 : reqLevel > 150 ? 5 : reqLevel > 110 ? 4 : 3;
      return Math.ceil((power * data[grade - 1] * value * 3) / 100);
    } else {
      const value = reqLevel > 110 ? 4 : 3;
      return Math.ceil((power * data[grade - 1] * value) / 100);
    }
  }
}

export function _getZeroWeaponAttackPower(
  gearType: GearType,
  { attackPower }: Pick<AddOptionContext, 'attackPower'>,
): number {
  if (gearType === GearType.heavySword) {
    return attackPower;
  }
  const longToHeavyAttackPowerMap = new Map([
    [100, 102],
    [103, 105],
    [105, 107],
    [112, 114],
    [117, 121],
    [135, 139],
    [169, 173],
    [203, 207],
    [293, 297],
    [337, 342],
  ]);
  const mappedAttackPower = longToHeavyAttackPowerMap.get(attackPower);
  if (mappedAttackPower === undefined) {
    throw TypeError(ErrorMessage.AddOption_UnknownLongSwordGear);
  }
  return mappedAttackPower;
}

export function _getHpMpValue(
  grade: AddOptionGrade,
  { reqLevel }: Pick<AddOptionContext, 'reqLevel'>,
): number {
  if (reqLevel < 10) {
    return 3 * grade;
  }
  if (reqLevel >= 250) {
    return 700 * grade;
  }
  return Math.floor(reqLevel / 10) * 30 * grade;
}

export function _getSpeedValue(
  grade: AddOptionGrade,
  { gearType }: Pick<AddOptionContext, 'gearType'>,
): number {
  if (isWeapon(gearType)) {
    throw TypeError(ErrorMessage.AddOption_InvalidSpeedGear);
  }
  return grade;
}

export function _getJumpValue(
  grade: AddOptionGrade,
  { gearType }: Pick<AddOptionContext, 'gearType'>,
): number {
  if (isWeapon(gearType)) {
    throw TypeError(ErrorMessage.AddOption_InvalidJumpGear);
  }
  return grade;
}

export function _getDamageValue(
  grade: AddOptionGrade,
  { gearType }: Pick<AddOptionContext, 'gearType'>,
): number {
  if (!isWeapon(gearType)) {
    throw TypeError(ErrorMessage.AddOption_InvalidDamageGear);
  }
  return grade;
}

export function _getBossDamageValue(
  grade: AddOptionGrade,
  { reqLevel, gearType }: Pick<AddOptionContext, 'reqLevel' | 'gearType'>,
): number {
  if (reqLevel < 90 || !isWeapon(gearType)) {
    throw TypeError(ErrorMessage.AddOption_InvalidBossDamageGear);
  }
  return 2 * grade;
}

export function _getAllStatValue(
  grade: AddOptionGrade,
  { reqLevel, gearType }: Pick<AddOptionContext, 'reqLevel' | 'gearType'>,
): number {
  if (reqLevel < 70 && !isWeapon(gearType)) {
    throw TypeError(ErrorMessage.AddOption_InvalidAllStatGear);
  }
  return grade;
}

export function _getReqLevelDecreaseValue(
  grade: AddOptionGrade,
  { reqLevel }: Pick<AddOptionContext, 'reqLevel'>,
): number {
  if (reqLevel <= 0) {
    throw TypeError(ErrorMessage.AddOption_InvalidReqLevelDecreaseGear);
  }
  return Math.min(reqLevel, 5 * grade);
}

export function _getAddOptionKeys(
  type: AddOptionType,
): (keyof GearAddOption)[] {
  return type.split(',') as (keyof GearAddOption)[];
}
