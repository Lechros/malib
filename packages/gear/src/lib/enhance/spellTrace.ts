import { GearType } from '../data';
import { ErrorMessage } from '../errors';
import { Gear } from '../Gear';
import { isAccessory, isArmor, isWeapon } from '../gearType';
import { ReadonlyGear } from '../ReadonlyGear';
import { applyScroll, Scroll } from './upgrade';

/**
 * 주문의 흔적 종류
 */
export enum SpellTraceType {
  /** STR */
  str = 'str',
  /** DEX */
  dex = 'dex',
  /** INT */
  int = 'int',
  /** LUK */
  luk = 'luk',
  /** 최대 HP */
  maxHp = 'maxHp',
  /** 올스탯 */
  allStat = 'allStat',
}

/**
 * 주문의 흔적 성공 확률
 */
export type SpellTraceRate = 100 | 70 | 30 | 15;

type _Tier = 0 | 1 | 2;

/**
 * 주문의 흔적
 */
export type SpellTrace = Scroll & {
  type: SpellTraceType;
  rate: SpellTraceRate;
};

/**
 * 장비에 주문의 흔적 강화를 적용합니다.
 * @param gear 적용할 장비.
 * @param type 주문의 흔적 종류.
 * @param rate 주문의 흔적 성공 확률.
 *
 * @throws {@link TypeError}
 * 주문서를 적용할 수 없는 상태의 장비일 경우.
 *
 * @throws {@link TypeError}
 * 장비에 적용할 수 없는 주문의 흔적을 지정했을 경우.
 */
export function applySpellTrace(
  gear: Gear,
  type: SpellTraceType,
  rate: SpellTraceRate,
) {
  const scroll = getSpellTraceScroll(gear, type, rate);
  applyScroll(gear, scroll);
}

/**
 * 주문의 흔적 주문서를 생성합니다.
 * @param gear 대상 장비.
 * @param type 주문의 흔적 종류.
 * @param rate 주문의 흔적 성공 확률.
 * @returns 주문의 흔적 주문서.
 *
 * @throws {@link TypeError}
 * 주문의 흔적을 장비에 적용할 수 없는 경우.
 */
export function getSpellTraceScroll(
  gear: ReadonlyGear,
  type: SpellTraceType,
  rate: SpellTraceRate,
): SpellTrace {
  if (isWeapon(gear.type) || gear.type === GearType.katara) {
    return _getWeaponSpellTrace(gear, type, rate);
  }
  if (gear.type === GearType.glove) {
    return _getGloveSpellTrace(gear, type, rate);
  }
  if (isArmor(gear.type) || gear.type === GearType.shoulder) {
    return _getArmorSpellTrace(gear, type, rate);
  }
  if (isAccessory(gear.type)) {
    return _getAccSpellTrace(gear, type, rate);
  }
  if (gear.type === GearType.machineHeart) {
    return _getHeartSpellTrace(gear, type, rate);
  }
  throw TypeError(ErrorMessage.SpellTrace_InvalidGearType);
}

export function _getWeaponSpellTrace(
  gear: ReadonlyGear,
  type: SpellTraceType,
  rate: SpellTraceRate,
): SpellTrace {
  if (type === SpellTraceType.allStat) {
    throw TypeError(ErrorMessage.SpellTrace_InvalidSpellTrace);
  }
  const tier = _getTier(gear);
  // eslint-disable-next-line prefer-const
  let [power, stat] = weaponPowerStat[rate][tier];
  if (type === SpellTraceType.maxHp) {
    stat *= 50;
  }

  const powerType = _getPowerType(type);
  let name: string, option: SpellTrace['option'];
  if (stat === 0) {
    name = _createScrollName(rate, _getTypeName(powerType));
    option = { [powerType]: power };
  } else {
    name = _createScrollName(rate, _getTypeName(powerType), _getTypeName(type));
    option = { [powerType]: power, [type]: stat };
  }
  return { name, option, type, rate };
}

export function _getGloveSpellTrace(
  gear: ReadonlyGear,
  type: SpellTraceType,
  rate: SpellTraceRate,
): SpellTrace {
  const tier = _getTier(gear);
  const power = glovePower[rate][tier];

  let name: string, option: SpellTrace['option'];
  if (power === 0) {
    name = _createScrollName(rate, '방어력');
    option = { armor: 3 };
  } else {
    const powerType = _getPowerType(type);
    name = _createScrollName(rate, _getTypeName(powerType));
    option = { [powerType]: power };
  }
  return { name, option, rate, type };
}

export function _getArmorSpellTrace(
  gear: ReadonlyGear,
  type: SpellTraceType,
  rate: SpellTraceRate,
): SpellTrace {
  const tier = _getTier(gear);
  const [stat, maxHp, armor] = armorStatMaxHpArmor[rate][tier];

  const option: SpellTrace['option'] = { maxHp, armor };
  switch (type) {
    case SpellTraceType.str:
    case SpellTraceType.dex:
    case SpellTraceType.int:
    case SpellTraceType.luk:
      option[type] = stat;
      break;
    case SpellTraceType.maxHp:
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      option.maxHp! += stat * 50;
      break;
    case SpellTraceType.allStat: {
      if (!(rate in armorAllStat)) {
        throw TypeError(ErrorMessage.SpellTrace_InvalidSpellTrace);
      }
      // @ts-expect-error: rate is checked above
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const allStat: number = armorAllStat[rate][tier];
      option.str = allStat;
      option.dex = allStat;
      option.int = allStat;
      option.luk = allStat;
      break;
    }
  }

  if (gear.scrollUpgradeCount === 3) {
    if (gear.req.beginner()) {
      option.attackPower = 1;
      option.magicPower = 1;
    } else if (gear.req.magician()) {
      option.magicPower = 1;
    } else {
      option.attackPower = 1;
    }
  }

  const name = _createScrollName(rate, _getTypeName(type));
  return { name, option, type, rate };
}

export function _getAccSpellTrace(
  gear: ReadonlyGear,
  type: SpellTraceType,
  rate: SpellTraceRate,
): SpellTrace {
  if (!(rate in accStat)) {
    throw TypeError(ErrorMessage.SpellTrace_InvalidSpellTrace);
  }
  const tier = _getTier(gear);
  // @ts-expect-error: rate is checked above
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const stat: number = accStat[rate][tier];

  const option: SpellTrace['option'] = {};
  switch (type) {
    case SpellTraceType.str:
    case SpellTraceType.dex:
    case SpellTraceType.int:
    case SpellTraceType.luk:
      option[type] = stat;
      break;
    case SpellTraceType.maxHp:
      option.maxHp = stat * 50;
      break;
    case SpellTraceType.allStat: {
      if (!(rate in accAllStat)) {
        throw TypeError(ErrorMessage.SpellTrace_InvalidSpellTrace);
      }
      // @ts-expect-error: rate is checked above
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const allStat: number = accAllStat[rate][tier];
      option.str = allStat;
      option.dex = allStat;
      option.int = allStat;
      option.luk = allStat;
      break;
    }
  }

  const name = _createScrollName(rate, _getTypeName(type));
  return { name, option, type, rate };
}

export function _getHeartSpellTrace(
  gear: ReadonlyGear,
  type: SpellTraceType,
  rate: SpellTraceRate,
): SpellTrace {
  if (!(rate in accStat)) {
    throw TypeError(ErrorMessage.SpellTrace_InvalidSpellTrace);
  }
  const tier = _getTier(gear);
  // @ts-expect-error: rate is checked above
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const power: number = heartPower[rate][tier];

  const powerType = _getPowerType(type);
  const name = _createScrollName(rate, _getTypeName(powerType));
  const option = { [powerType]: power };
  return { name, option, type, rate };
}

function _createScrollName(
  rate: SpellTraceRate,
  typeName: string,
  subTypeName?: string,
): string {
  if (subTypeName)
    return `${rate.toString()}% ${typeName}(${subTypeName}) 주문서`;
  else return `${rate.toString()}% ${typeName} 주문서`;
}

function _getTypeName(
  type: `${SpellTraceType}` | 'attackPower' | 'magicPower',
): string {
  switch (type) {
    case 'str':
      return '힘';
    case 'dex':
      return '민첩';
    case 'int':
      return '지력';
    case 'luk':
      return '운';
    case 'maxHp':
      return '체력';
    case 'allStat':
      return '올스탯';
    case 'attackPower':
      return '공격력';
    case 'magicPower':
      return '마력';
  }
}

function _getTier(gear: ReadonlyGear): _Tier {
  return gear.req.level > 110 ? 2 : gear.req.level > 70 ? 1 : 0;
}

function _getPowerType(type: SpellTraceType): 'attackPower' | 'magicPower' {
  return type === SpellTraceType.int ? 'magicPower' : 'attackPower';
}

const weaponPowerStat = {
  100: [
    [1, 0],
    [2, 0],
    [3, 1],
  ],
  70: [
    [2, 0],
    [3, 1],
    [5, 2],
  ],
  30: [
    [3, 1],
    [5, 2],
    [7, 3],
  ],
  15: [
    [5, 2],
    [7, 3],
    [9, 4],
  ],
};

const armorStatMaxHpArmor = {
  100: [
    [1, 5, 1],
    [2, 20, 2],
    [3, 30, 3],
  ],
  70: [
    [2, 15, 2],
    [3, 40, 4],
    [4, 70, 5],
  ],
  30: [
    [3, 30, 4],
    [5, 70, 7],
    [7, 120, 10],
  ],
  15: [
    [4, 45, 6],
    [7, 110, 10],
    [10, 170, 15],
  ],
};

const armorAllStat = {
  30: [1, 2, 3],
  15: [2, 3, 4],
} as const;

const glovePower = {
  100: [0, 1, 1],
  70: [1, 2, 2],
  30: [2, 3, 3],
  15: [3, 4, 4],
};

const accStat = {
  100: [1, 1, 2],
  70: [2, 2, 3],
  30: [3, 4, 5],
} as const;

const accAllStat = {
  30: [1, 2, 3],
};

const heartPower = {
  100: [1, 2, 3],
  70: [2, 3, 5],
  30: [3, 5, 7],
};
