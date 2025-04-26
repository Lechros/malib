import { GearStarforceOption, GearType, GearCapability } from '../data';
import { ErrorMessage } from '../errors';
import { Gear } from '../Gear';
import { toGearOption } from '../gearOption';
import { isAccessory, isArmor, isWeapon } from '../gearType';

export const MAX_STARFORCE = 30;
export const MAX_STARSCROLL = 15;
export const MAX_SUPERIOR = 15;
export const MAX_REQLEVEL_STARSCROLL = 150;

/**
 * 장비가 스타포스 강화를 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsStarforce(gear: Gear): boolean {
  return gear.attributes.canStarforce === GearCapability.Can;
}

/**
 * 장비에 스타포스 강화를 적용할 수 있는 상태인지 여부를 확인합니다.
 *
 * 업그레이드가 완료되지 않은 장비, 놀라운 장비강화 주문서가 적용된 장비에도 적용할 수 있습니다.
 * @param gear 확인할 장비.
 * @param exceedMaxStar 장비의 최대 강화 단계를 초과하여 강화할 지 여부.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canStarforce(gear: Gear, exceedMaxStar = false): boolean {
  if (!supportsStarforce(gear)) {
    return false;
  }
  if (gear.attributes.superior) {
    return gear.star < Math.min(MAX_SUPERIOR, gear.maxStar);
  }
  if (!exceedMaxStar && gear.star >= gear.maxStar) {
    return false;
  }
  const limit = gear.starScroll ? MAX_STARSCROLL : MAX_STARFORCE;
  return gear.star < limit;
}

/**
 * 장비에 스타포스 강화를 1회 적용합니다.
 *
 * 업그레이드가 완료되지 않은 장비, 놀라운 장비강화 주문서가 적용된 장비에도 적용할 수 있습니다.
 * @param gear 적용할 장비.
 * @param exceedMaxStar 장비의 최대 강화 단계를 초과하여 강화할 지 여부.
 *
 * @throws {@link TypeError}
 * 스타포스 강화를 적용할 수 없는 경우.
 */
export function starforce(gear: Gear, exceedMaxStar = false) {
  if (!canStarforce(gear, exceedMaxStar)) {
    throw TypeError(ErrorMessage.Starforce_InvalidStarforceGear);
  }
  gear.data.star = gear.star + 1;

  if (gear.attributes.superior) {
    _superiorStarforce(gear);
  } else if (isWeapon(gear.type) || gear.type === GearType.katara) {
    _weaponStarforce(gear);
  } else {
    _otherStarforce(gear);
  }
}

/**
 * 장비에 놀라운 장비 강화 주문서를 적용할 수 있는 상태인지 여부를 확인합니다.
 *
 * 착용 가능 레벨 150 이하의 장비에만 적용할 수 있습니다.
 * 업그레이드가 완료되지 않은 장비, 놀라운 장비강화 주문서가 적용된 장비에도 적용할 수 있습니다.
 * 슈페리얼 장비에는 적용할 수 없습니다.
 * @param gear 확인할 장비.
 * @param exceedMaxStar 장비의 최대 강화 단계를 초과하여 강화할 지 여부.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canStarScroll(gear: Gear, exceedMaxStar = false): boolean {
  if (!supportsStarforce(gear)) {
    return false;
  }
  if (gear.attributes.superior) {
    return false;
  }
  if (gear.req.level > MAX_REQLEVEL_STARSCROLL) {
    return false;
  }
  if (!exceedMaxStar && gear.star >= gear.maxStar) {
    return false;
  }
  return gear.star < MAX_STARSCROLL;
}

/**
 * 장비에 놀라운 장비 강화 주문서를 1회 적용합니다.
 *
 * 착용 가능 레벨 150 이하의 장비에만 적용할 수 있습니다.
 * 업그레이드가 완료되지 않은 장비, 스타포스 강화가 적용된 장비에도 적용할 수 있습니다.
 * 슈페리얼 장비에는 적용할 수 없습니다.
 *
 * 보너스 스탯은 장비 분류에 따라 결정됩니다.
 * - 방어구(방패 제외): 최대 HP +50
 * - 장신구: 올스탯 +1 ~ +2
 * - 무기/블레이드/방패: 공격력/마력 +1
 * @param gear 적용할 장비.
 * @param bonus 보너스 스탯 적용 여부.
 * @param exceedMaxStar 장비의 최대 강화 단계를 초과하여 강화할 지 여부.
 *
 * @throws {@link TypeError}
 * 놀라운 장비 강화 주문서를 적용할 수 없는 경우.
 */
export function starScroll(
  gear: Gear,
  bonus = false,
  exceedMaxStar = false,
): void {
  if (!canStarScroll(gear, exceedMaxStar)) {
    throw TypeError(ErrorMessage.StarScroll_InvalidStarScrollGear);
  }
  gear.data.starScroll = true;
  gear.data.star = gear.star + 1;

  const stat = _getValue(starScrollStat, gear);
  const power = _getValue(starScrollPower, gear);
  const isWeaponStarScroll =
    isWeapon(gear.type) || gear.type === GearType.katara;
  // stat
  for (const type of statTypes) {
    if (_getStarScrollBaseValue(gear, type) > 0) {
      _getStarforceOption(gear)[type] += stat;
      if (bonus && isAccessory(gear.type)) {
        _getStarforceOption(gear)[type] += gear.star > 5 ? 2 : 1;
      }
    }
  }
  // power
  for (const type of powerTypes) {
    const powerValue = _getStarScrollBaseValue(gear, type);
    if (powerValue > 0) {
      if (isWeaponStarScroll) {
        _getStarforceOption(gear)[type] += Math.floor(powerValue / 50) + 1;
      }
      _getStarforceOption(gear)[type] += power;
      if (bonus && (isWeaponStarScroll || gear.type === GearType.shield)) {
        _getStarforceOption(gear)[type] += 1;
      }
    }
  }
  // maxHp
  if (bonus && isArmor(gear.type)) {
    _getStarforceOption(gear).maxHp += 50;
  }
  // armor
  const armor = _getStarScrollBaseValue(gear, 'armor');
  if (armor > 0) {
    _getStarforceOption(gear).armor += Math.floor(armor / 20) + 1;
  }
}

/**
 * 장비의 스타포스 강화를 초기화할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 초기화할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canResetStarforce(gear: Gear): boolean {
  if (!supportsStarforce(gear)) {
    return false;
  }
  return true;
}

/**
 * 장비의 스타포스 강화를 초기화합니다.
 * @param gear 초기화할 장비.
 *
 * @throws {@link TypeError}
 * 스타포스 강화를 초기화할 수 없는 장비일 경우.
 */
export function resetStarforce(gear: Gear) {
  if (!canResetStarforce(gear)) {
    throw TypeError(ErrorMessage.Starforce_InvalidResetGear);
  }
  gear.data.starforceOption = {};
  gear.data.star = undefined;
  gear.data.starScroll = undefined;
}

/**
 * 장비의 최대 스타포스 강화를 계산합니다.
 *
 * 놀라운 장비 강화 주문서가 사용되었을 경우 최대 `15`입니다.
 * @param gear 계산할 장비.
 * @returns 장비의 최대 스타포스 강화.
 */
export function getMaxStar(gear: Gear): number {
  if (gear.attributes.canStarforce === GearCapability.Cannot) {
    return 0;
  }
  const baseMaxStar = _getBaseMaxStar(gear);
  if (gear.starScroll) {
    return Math.min(MAX_STARSCROLL, baseMaxStar);
  }
  return baseMaxStar;
}

function _superiorStarforce(gear: Gear) {
  const stat = _getValue(superiorStat, gear);
  const power = _getValue(superiorPower, gear);
  // stat
  for (const type of statTypes) {
    if (gear.baseOption[type] > 0) {
      _getStarforceOption(gear)[type] += stat;
    }
  }
  // power
  for (const type of powerTypes) {
    if (gear.baseOption[type] > 0) {
      _getStarforceOption(gear)[type] += power;
    }
  }
  // armor
  const armor = _getStarforceBaseValue(gear, 'armor');
  _getStarforceOption(gear).armor += Math.floor(armor / 20) + 1;
}

function _weaponStarforce(gear: Gear) {
  const stat = _getValue(starforceStat, gear);
  const power = _getValue(starforceWeaponPower, gear);
  // stat
  const optionTypes = _getJobOptionTypes(gear);
  for (const type of statTypes) {
    if (optionTypes.has(type)) {
      _getStarforceOption(gear)[type] += stat;
    } else if (
      gear.star > 15 &&
      (gear.baseOption[type] > 0 || gear.upgradeOption[type] > 0)
    ) {
      _getStarforceOption(gear)[type] += stat;
    }
  }
  // power
  const isMagic = gear.req.magician() || gear.upgradeOption.magicPower > 0;
  if (gear.star > 15) {
    _getStarforceOption(gear).attackPower += power;
    if (isMagic) {
      _getStarforceOption(gear).magicPower += power;
    }
  } else {
    const attackPower = _getStarforceBaseValue(gear, 'attackPower');
    _getStarforceOption(gear).attackPower += Math.floor(attackPower / 50) + 1;
    if (isMagic) {
      const magicPower = _getStarforceBaseValue(gear, 'magicPower');
      _getStarforceOption(gear).magicPower += Math.floor(magicPower / 50) + 1;
    }
  }
  // maxHp, maxMp
  const maxHp = starforceMaxHpMp[gear.star];
  _getStarforceOption(gear).maxHp += maxHp;
  _getStarforceOption(gear).maxMp += maxHp;
}

function _otherStarforce(gear: Gear) {
  const stat = _getValue(starforceStat, gear);
  const power = _getValue(starforcePower, gear);
  // stat
  const optionTypes = _getJobOptionTypes(gear);
  for (const type of statTypes) {
    if (optionTypes.has(type)) {
      _getStarforceOption(gear)[type] += stat;
    } else if (
      gear.star > 15 &&
      (gear.baseOption[type] > 0 || gear.upgradeOption[type] > 0)
    ) {
      _getStarforceOption(gear)[type] += stat;
    }
  }
  // power
  _getStarforceOption(gear).attackPower += power;
  _getStarforceOption(gear).magicPower += power;
  if (gear.type === GearType.glove) {
    const bonusPower = starforceGloveBonusPower[gear.star];
    if (gear.req.beginner()) {
      _getStarforceOption(gear).attackPower += bonusPower;
      _getStarforceOption(gear).magicPower += bonusPower;
    } else if (gear.req.magician()) {
      _getStarforceOption(gear).magicPower += bonusPower;
    } else {
      _getStarforceOption(gear).attackPower += bonusPower;
    }
  }
  // armor
  if (gear.type !== GearType.machineHeart) {
    const armor = _getStarforceBaseValue(gear, 'armor');
    _getStarforceOption(gear).armor += Math.floor(armor / 20) + 1;
  }
  // maxHp, maxMp
  if (maxHpTypes.includes(gear.type)) {
    const maxHp = starforceMaxHpMp[gear.star];
    _getStarforceOption(gear).maxHp += maxHp;
  }
  // speed, jump
  if (gear.type === GearType.shoes) {
    const speedJump = starforceSpeedJump[gear.star];
    _getStarforceOption(gear).speed += speedJump;
    _getStarforceOption(gear).jump += speedJump;
  }
}

function _getJobOptionTypes(gear: Gear): Set<'str' | 'dex' | 'int' | 'luk'> {
  if (gear.req.beginner()) {
    return new Set(statTypes);
  }
  const stats = [];
  if (gear.req.warrior()) {
    stats.push('str', 'dex');
  }
  if (gear.req.magician()) {
    stats.push('int', 'luk');
  }
  if (gear.req.bowman()) {
    stats.push('dex', 'str');
  }
  if (gear.req.thief()) {
    stats.push('luk', 'dex');
  }
  if (gear.req.pirate()) {
    stats.push('str', 'dex');
  }
  return new Set(stats) as Set<'str' | 'dex' | 'int' | 'luk'>;
}

function _getValue(data: number[][], gear: Gear): number {
  const reqLevel = gear.req.level;
  for (let i = data.length - 1; i >= 0; i--) {
    const item = data[i];
    if (reqLevel >= item[0]) {
      return item[gear.star];
    }
  }
  throw TypeError(ErrorMessage.Starforce_InvalidReqLevelGear);
}

function _getStarforceOption(gear: Gear): GearStarforceOption {
  if (gear.data.starforceOption === undefined) {
    gear.data.starforceOption = {};
  }
  return toGearOption(gear.data.starforceOption);
}

function _getStarforceBaseValue(
  gear: Gear,
  type: keyof GearStarforceOption,
): number {
  return (
    gear.baseOption[type] +
    gear.upgradeOption[type] +
    gear.starforceOption[type]
  );
}

function _getStarScrollBaseValue(
  gear: Gear,
  type: keyof GearStarforceOption,
): number {
  return (
    gear.baseOption[type] +
    gear.addOption[type] +
    gear.upgradeOption[type] +
    gear.starforceOption[type]
  );
}

function _getBaseMaxStar(gear: Gear): number {
  const reqLevel = gear.req.level + gear.req.levelIncrease;
  let data: readonly number[] | undefined = undefined;
  for (const item of maxStarData) {
    if (reqLevel >= item[0]) data = item;
    else break;
  }

  if (!data) return 0;
  return gear.attributes.superior ? data[2] : data[1];
}

const maxStarData = [
  [0, 5, 3],
  [95, 8, 5],
  [110, 10, 8],
  [120, 15, 10],
  [130, 20, 12],
  [140, 30, 15],
] as const;

const statTypes = ['str', 'dex', 'int', 'luk'] as const;

const powerTypes = ['attackPower', 'magicPower'] as const;

const maxHpTypes = [
  GearType.cap,
  GearType.coat,
  GearType.longcoat,
  GearType.pants,
  GearType.cape,
  GearType.ring,
  GearType.pendant,
  GearType.belt,
  GearType.shoulder,
  GearType.shield,
];

const starforceStat = [
  [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
  [108, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0],
  [118, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0],
  [128, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0],
  [138, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0, 0],
  [148, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0, 0, 0, 0, 0, 0],
  [158, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13, 13, 13, 13, 13, 13, 13, 0, 0, 0, 0, 0, 0, 0, 0],
  [198, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0, 0, 0, 0, 0, 0],
  [248, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0, 0, 0, 0, 0, 0],
]; // prettier-ignore

const starforcePower = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 6, 7, 8, 0, 0, 0, 0, 0],
  [108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10, 12, 13, 15, 17],
  [118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 8, 9, 10, 11, 13, 14, 16, 18],
  [128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20],
  [138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 10, 11, 12, 13, 15, 17, 19, 21, 22, 23, 24, 25, 26],
  [148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 23, 24, 25, 26, 27],
  [158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 17, 19, 21, 23, 24, 25, 26, 27, 28],
  [198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25, 26, 27, 28, 29, 30],
  [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 16, 17, 18, 19, 21, 23, 25, 27, 28, 29, 30, 31, 32],
]; // prettier-ignore

const starforceWeaponPower = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 6, 7, 0, 0, 0, 0, 0],
  [108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 7, 8, 9, 27, 28, 29],
  [118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 7, 8, 9, 10, 28, 29, 30],
  [128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 8, 9, 10, 11, 29, 30, 31],
  [138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 9, 10, 11, 12, 30, 31, 32, 33, 34, 35, 36, 37],
  [148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 9, 10, 11, 12, 13, 31, 32, 33, 34, 35, 36, 37, 38],
  [158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 10, 11, 12, 13, 14, 32, 33, 34, 35, 36, 37, 38, 39],
  [198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 14, 14, 15, 16, 17, 34, 35, 36, 37, 38, 39, 40, 41],
  [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 16, 16, 17, 18, 19, 36, 37, 38, 39, 40, 41, 42, 43],
]; // prettier-ignore

const superiorPower = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [110, 0, 0, 0, 0, 0, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0],
  [150, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 15, 17, 19, 21, 23],
];

const superiorStat = [
  [0, 1, 2, 4, 7, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [80, 2, 3, 5, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [110, 9, 10, 12, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [150, 19, 20, 22, 25, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const starforceGloveBonusPower = [
  -1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
];

const starforceMaxHpMp = [
  -1, 5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0,
];

const starforceSpeedJump = [
  -1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
];

const starScrollStat = [
  [0, 1, 2, 4, 7, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [80, 2, 3, 5, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [85, 3, 4, 6, 9, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [90, 4, 5, 7, 10, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [95, 5, 6, 8, 11, 15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [100, 7, 8, 10, 13, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [105, 8, 9, 11, 14, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [110, 9, 10, 12, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [115, 10, 11, 13, 16, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [120, 12, 13, 15, 18, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [125, 13, 14, 16, 19, 23, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [130, 14, 15, 17, 20, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [135, 15, 16, 18, 21, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [140, 17, 18, 20, 23, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [145, 18, 19, 21, 24, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [150, 19, 20, 22, 25, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const starScrollPower = [
  [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14],
  [80, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15],
  [90, 0, 0, 0, 0, 0, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16],
  [100, 0, 0, 0, 0, 0, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17],
  [110, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18],
  [120, 0, 0, 0, 0, 0, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19],
  [130, 0, 0, 0, 0, 0, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20],
  [140, 0, 0, 0, 0, 0, 8, 9, 10, 11, 12, 13, 15, 17, 19, 21],
  [150, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22],
];
