import { Gear } from "../gear";
import { GearPropType } from "../gearproptype";
import { GearType } from "../geartype";
import { BonusStatType } from "./bonusstattype";

/**
 * 추가옵션 등급
 */
export type BonusStatGrade = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * 장비에 1개의 추가옵션을 추가합니다.
 * @param gear 추가옵션을 추가할 장비.
 * @param type 추가옵션 스탯 종류.
 * @param grade 추가옵션 등급. `1`부터 `7`까지의 값입니다.
 * @returns 추가했을 경우 `true`; 아닐 경우 `false`.
 * 장비에 부여할 수 없는 추가옵션을 지정했을 경우 `false`를 반환합니다.
 */
export function addBonusStat(
  gear: Gear,
  type: BonusStatType,
  grade: BonusStatGrade
): boolean {
  const stat = getBonusStatOption(gear, type, grade);
  if (stat.size === 0) {
    return false;
  }
  for (const [propType, value] of stat) {
    gear.option(propType).bonus += value;
  }
  return true;
}

/**
 * 장비에 적용된 추가옵션을 초기화합니다.
 * @param gear 추가옵션을 초기화할 장비.
 * @returns 항상 초기화에 성공하고 `true`를 반환합니다.
 */
export function resetBonusStat(gear: Gear): boolean {
  for (const [, option] of gear.options) {
    option.bonus = 0;
  }
  return true;
}

/**
 * 추가옵션을 계산합니다.
 * @param gear 추가옵션을 계산할 장비.
 * @param type 추가옵션 스탯 종류.
 * @param grade 추가옵션 등급. `1`부터 `7`까지의 값입니다.
 * @returns 추가옵션이 포함된 `Map`.
 * 장비에 부여할 수 없는 추가옵션을 지정했을 경우 빈 `Map`을 반환합니다.
 */
export function getBonusStatOption(
  gear: Gear,
  type: BonusStatType,
  grade: BonusStatGrade
): Map<GearPropType, number> {
  const propTypes = getGearPropType(type);
  const value = getBonusStatValue(gear, type, grade);

  if (value === 0) {
    return new Map();
  }
  return new Map(propTypes.map((propType) => [propType, value]));
}

/**
 * 추가옵션 스탯 종류에 따른 값을 계산합니다.
 * @param gear 추가옵션을 계산할 장비.
 * @param type 추가옵션 스탯 종류.
 * @param grade 추가옵션 등급. `1`부터 `7`까지의 값입니다.
 * @returns 추가옵션 스탯 종류에 따른 값.
 * 지정한 추가옵션을 적용할 수 없는 경우 `0`을 반환합니다.
 */
export function getBonusStatValue(
  gear: Gear,
  type: BonusStatType,
  grade: BonusStatGrade
): number {
  const reqLevel = gear.req.level;
  const bossReward = gear.getBooleanValue(GearPropType.bossReward);
  const gearType = gear.type;

  if (reqLevel < 0) {
    return 0;
  }
  if (bossReward && grade < 3) {
    return 0;
  }

  switch (type) {
    case BonusStatType.STR:
    case BonusStatType.DEX:
    case BonusStatType.INT:
    case BonusStatType.LUK:
      return (Math.floor(reqLevel / 20) + 1) * grade;
    case BonusStatType.STR_DEX:
    case BonusStatType.STR_INT:
    case BonusStatType.STR_LUK:
    case BonusStatType.DEX_INT:
    case BonusStatType.DEX_LUK:
    case BonusStatType.INT_LUK:
      return (Math.floor(reqLevel / 40) + 1) * grade;
    case BonusStatType.PDD:
      return (Math.floor(reqLevel / 20) + 1) * grade;
    case BonusStatType.PAD:
    case BonusStatType.MAD:
      if (Gear.isWeapon(gearType)) {
        const data = bossReward
          ? [0, 0, 1, 1.4666, 2.0166, 2.663, 3.4166]
          : [1, 2.222, 3.63, 5.325, 7.32, 8.777, 10.25];
        let att = gear.option(GearPropType.incPAD).base;
        if (
          gearType === GearType.heavySword ||
          gearType === GearType.longSword
        ) {
          if (gearType === GearType.longSword) {
            switch (att) {
              case 100:
                att = 102;
                break;
              case 103:
                att = 105;
                break;
              case 105:
                att = 107;
                break;
              case 112:
                att = 114;
                break;
              case 117:
                att = 121;
                break;
              case 135:
                att = 139;
                break;
              case 169:
                att = 173;
                break;
              case 203:
                att = 207;
                break;
              case 293:
                att = 297;
                break;
              case 337:
                att = 342;
                break;
            }
          }
          const value =
            reqLevel > 180 ? 6 : reqLevel > 160 ? 5 : reqLevel > 110 ? 4 : 3;
          return Math.ceil((att * data[grade - 1] * value) / 100);
        } else {
          const mad = gear.option(GearPropType.incMAD).base;
          if (type === BonusStatType.MAD && mad >= att) {
            att = mad;
          }
          if (bossReward) {
            const value =
              reqLevel > 160
                ? 18
                : reqLevel > 150
                ? 15
                : reqLevel > 110
                ? 12
                : 9;
            return Math.ceil((att * data[grade - 1] * value) / 100);
          } else {
            const value = reqLevel > 110 ? 4 : 3;
            return Math.ceil((att * data[grade - 1] * value) / 100);
          }
        }
      } else if (reqLevel < 60) {
        return 0;
      }
      return grade;
    case BonusStatType.MHP:
    case BonusStatType.MMP:
      if (reqLevel < 10) {
        return 3 * grade;
      }
      return Math.floor(reqLevel / 10) * 30 * grade;
    case BonusStatType.speed:
    case BonusStatType.jump:
      if (Gear.isWeapon(gearType)) {
        return 0;
      }
      return grade;
    case BonusStatType.damR:
      if (!Gear.isWeapon(gearType)) {
        return 0;
      }
      return grade;
    case BonusStatType.bdR:
      if (reqLevel < 90 || !Gear.isWeapon(gearType)) {
        return 0;
      }
      return 2 * grade;
    case BonusStatType.allStatR:
      if (reqLevel < 70 && !Gear.isWeapon(gearType)) {
        return 0;
      }
      return grade;
    case BonusStatType.reduceReq:
      return 5 * grade;
    default:
      return 0;
  }
}

function getGearPropType(type: BonusStatType): GearPropType[] {
  switch (type) {
    case BonusStatType.STR:
      return [GearPropType.incSTR];
    case BonusStatType.DEX:
      return [GearPropType.incDEX];
    case BonusStatType.INT:
      return [GearPropType.incINT];
    case BonusStatType.LUK:
      return [GearPropType.incLUK];
    case BonusStatType.STR_DEX:
      return [GearPropType.incSTR, GearPropType.incDEX];
    case BonusStatType.STR_INT:
      return [GearPropType.incSTR, GearPropType.incINT];
    case BonusStatType.STR_LUK:
      return [GearPropType.incSTR, GearPropType.incLUK];
    case BonusStatType.DEX_INT:
      return [GearPropType.incDEX, GearPropType.incINT];
    case BonusStatType.DEX_LUK:
      return [GearPropType.incDEX, GearPropType.incLUK];
    case BonusStatType.INT_LUK:
      return [GearPropType.incINT, GearPropType.incLUK];
    case BonusStatType.PDD:
      return [GearPropType.incPDD];
    case BonusStatType.PAD:
      return [GearPropType.incPAD];
    case BonusStatType.MAD:
      return [GearPropType.incMAD];
    case BonusStatType.MHP:
      return [GearPropType.incMHP];
    case BonusStatType.MMP:
      return [GearPropType.incMMP];
    case BonusStatType.speed:
      return [GearPropType.incSpeed];
    case BonusStatType.jump:
      return [GearPropType.incJump];
    case BonusStatType.damR:
      return [GearPropType.damR];
    case BonusStatType.bdR:
      return [GearPropType.bdR];
    case BonusStatType.allStatR:
      return [GearPropType.statR];
    case BonusStatType.reduceReq:
      return [GearPropType.reduceReq];
    default:
      return [];
  }
}
