import { Gear } from "../gear";
import { GearPropType } from "../gearproptype";
import { GearType } from "../geartype";

/**
 * 주문의 흔적 성공 확률
 */
export type SpellTraceProbability = 100 | 70 | 30 | 15;

/**
 * 주문의 흔적 스탯 종류
 */
export type SpellTraceStatType =
  | GearPropType.incSTR
  | GearPropType.incDEX
  | GearPropType.incINT
  | GearPropType.incLUK
  | GearPropType.incAllStat
  | GearPropType.incMHP;

/**
 * 주문서
 */
export interface Scroll {
  /** 주문서 이름 */
  name: string;
  /** 주문서 옵션 */
  stat: Map<GearPropType, number>;
}

/**
 * 주문의 흔적 주문서를 생성합니다.
 * @param gear 주문의 흔적을 적용할 장비.
 * @param type 주문의 흔적 스탯 종류. `GearPropType` 타입이고
 * `incSTR` / `incDEX` / `incINT` / `incLUK` / `incAllStat` / `incMHP` 중 하나입니다.
 * @param probability 주문의 흔적 성공 확률. `100` / `70` / `30` / `15` 중 하나입니다.
 * @returns 주문의 흔적 주문서. 지정된 장비, 스탯, 확률을 만족하는 주문서가 존재하지 않을 경우 `undefined`를 반환합니다.
 */
export function getSpellTraceScroll(
  gear: Gear,
  type: SpellTraceStatType,
  probability: SpellTraceProbability
): Scroll | undefined {
  const attackType =
    type === GearPropType.incINT ? GearPropType.incMAD : GearPropType.incPAD;
  const tier = gear.req.level >= 115 ? 2 : gear.req.level >= 75 ? 1 : 0;

  let statName: string;
  const attackName = attackType === GearPropType.incMAD ? "마력" : "공격력";
  switch (type) {
    case GearPropType.incSTR:
      statName = "힘";
      break;
    case GearPropType.incDEX:
      statName = "민첩";
      break;
    case GearPropType.incINT:
      statName = "지력";
      break;
    case GearPropType.incLUK:
      statName = "운";
      break;
    case GearPropType.incAllStat:
      statName = "올스탯";
      break;
    case GearPropType.incMHP:
      statName = "체력";
      break;
  }

  // weapon like
  if (Gear.isWeapon(gear.type) || gear.type === GearType.katara) {
    if (type === GearPropType.incAllStat) {
      return undefined;
    }
    let data: number[][];
    switch (probability) {
      case 100:
        data = [
          [1, 0],
          [2, 0],
          [3, 1],
        ];
        break;
      case 70:
        data = [
          [2, 0],
          [3, 1],
          [5, 2],
        ];
        break;
      case 30:
        data = [
          [3, 1],
          [5, 2],
          [7, 3],
        ];
        break;
      case 15:
        data = [
          [5, 2],
          [7, 3],
          [9, 4],
        ];
        break;
    }
    const attackValue = data[tier][0];
    const statValue = data[tier][1] * (type === GearPropType.incMHP ? 50 : 1);
    const name =
      statValue > 0
        ? `${probability}% ${attackName}(${statName}) 주문서`
        : `${probability}% ${attackName} 주문서`;
    const stat = new Map([
      [type, statValue],
      [attackType, attackValue],
    ]);

    return { name, stat };
  }
  // prob 15% for non weapon like type
  else if (probability === 15) {
    return undefined;
  }
  // gloves
  if (gear.type === GearType.glove) {
    let data: number[];
    switch (probability) {
      case 100:
        data = [0, 1, 1];
        break;
      case 70:
        data = [1, 2, 2];
        break;
      case 30:
        data = [2, 3, 3];
        break;
    }
    const value = data[tier];
    let name: string;
    let stat: Map<GearPropType, number>;
    if (value === 0) {
      name = `${probability}% 방어력 주문서`;
      stat = new Map([[GearPropType.incPDD, 3]]);
    } else {
      name = `${probability}% ${attackName} 주문서`;
      stat = new Map([[attackType, value]]);
    }
    return { name, stat };
  }
  // armor
  if (Gear.isArmor(gear.type) || gear.type === GearType.shoulder) {
    // armor all stat
    if (type === GearPropType.incAllStat) {
      if (probability !== 30) {
        return undefined;
      }
      const data = [
        [1, 30, 4],
        [2, 70, 7],
        [3, 120, 10],
      ];
      const statValue = data[tier][0];
      const mhpValue = data[tier][1];
      const pddValue = data[tier][2];

      const name = `${probability}% ${statName} 주문서`;
      const stat = new Map([
        [GearPropType.incSTR, statValue],
        [GearPropType.incDEX, statValue],
        [GearPropType.incINT, statValue],
        [GearPropType.incLUK, statValue],
        [GearPropType.incMHP, mhpValue],
        [GearPropType.incPDD, pddValue],
      ]);
      if (gear.upgradeCount === 3) {
        if (gear.req.job === 0) {
          stat.set(GearPropType.incMAD, 1);
          stat.set(GearPropType.incPAD, 1);
        } else if (Math.floor(gear.req.job / 2) % 2 === 1)
          stat.set(GearPropType.incMAD, 1);
        else stat.set(GearPropType.incPAD, 1);
      }
      return { name, stat };
    }
    // armor single stat
    let data: number[][];
    switch (probability) {
      case 100:
        data = [
          [1, 5, 1],
          [2, 20, 2],
          [3, 30, 3],
        ];
        break;
      case 70:
        data = [
          [2, 15, 2],
          [3, 40, 4],
          [4, 70, 5],
        ];
        break;
      case 30:
        data = [
          [3, 30, 4],
          [5, 70, 7],
          [7, 120, 10],
        ];
        break;
    }
    const statValue = type !== GearPropType.incMHP ? data[tier][0] : 0;
    const mhpValue =
      data[tier][1] + (type === GearPropType.incMHP ? data[tier][0] * 50 : 0);
    const pddValue = data[tier][2];

    const name = `${probability}% ${statName} 주문서`;
    const stat = new Map([
      [GearPropType.incMHP, mhpValue],
      [GearPropType.incPDD, pddValue],
    ]);
    if (statValue > 0) {
      stat.set(type, statValue);
    }
    if (gear.upgradeCount === 3) {
      if (gear.req.job === 0) {
        stat.set(GearPropType.incMAD, 1);
        stat.set(GearPropType.incPAD, 1);
      } else if (Math.floor(gear.req.job / 2) % 2 === 1)
        stat.set(GearPropType.incMAD, 1);
      else stat.set(GearPropType.incPAD, 1);
    }
    return { name, stat };
  }
  // acc
  if (Gear.isAccessory(gear.type)) {
    if (type === GearPropType.incAllStat) {
      if (probability !== 30) {
        return undefined;
      }
      const data = [
        [1, 30, 4],
        [2, 70, 7],
        [3, 120, 10],
      ];
      const statValue = data[tier][0];

      const name = `${probability}% ${statName} 주문서`;
      const stat = new Map([
        [GearPropType.incSTR, statValue],
        [GearPropType.incDEX, statValue],
        [GearPropType.incINT, statValue],
        [GearPropType.incLUK, statValue],
      ]);
      return { name, stat };
    }
    let data: number[];
    switch (probability) {
      case 100:
        data = [1, 1, 2];
        break;
      case 70:
        data = [2, 2, 3];
        break;
      case 30:
        data = [3, 4, 5];
        break;
    }
    const value = data[tier] * (type === GearPropType.incMHP ? 50 : 1);
    const name = `${probability}% ${statName} 주문서`;
    const stat = new Map([[type, value]]);
    return { name, stat };
  }
  // heart
  if (gear.type === GearType.machineHeart) {
    let data: number[];
    switch (probability) {
      case 100:
        data = [1, 2, 3];
        break;
      case 70:
        data = [2, 3, 5];
        break;
      case 30:
        data = [3, 5, 7];
        break;
    }
    const value = data[tier];
    const name = `${probability}% ${statName} 주문서`;
    const stat = new Map([[attackType, value]]);
    return { name, stat };
  }

  return undefined;
}
