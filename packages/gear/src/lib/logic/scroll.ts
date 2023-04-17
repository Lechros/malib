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
  option: Map<GearPropType, number>;
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
  // weapon like
  if (Gear.isWeapon(gear.type) || gear.type === GearType.katara) {
    return getWeaponSpellTrace(gear, type, probability);
  }
  // gloves
  if (gear.type === GearType.glove) {
    return getGloveSpellTrace(gear, type, probability);
  }
  // armor
  if (Gear.isArmor(gear.type) || gear.type === GearType.shoulder) {
    return getArmorSpellTrace(gear, type, probability);
  }
  // acc
  if (Gear.isAccessory(gear.type)) {
    return getAccSpellTrace(gear, type, probability);
  }
  // heart
  if (gear.type === GearType.machineHeart) {
    return getHeartSpellTrace(gear, type, probability);
  }

  return undefined;
}

const weaponAttStatData = {
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

const armorStatMhpPddData = {
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

const armorAllStatData = {
  30: [1, 2, 3],
  15: [2, 3, 4],
};

const accAllStatData = {
  30: [1, 2, 3],
};

const gloveAttData = {
  100: [0, 1, 1],
  70: [1, 2, 2],
  30: [2, 3, 3],
  15: [3, 4, 4],
};

const accStatData = {
  100: [1, 1, 2],
  70: [2, 2, 3],
  30: [3, 4, 5],
};

const heartAttData = {
  100: [1, 2, 3],
  70: [2, 3, 5],
  30: [3, 5, 7],
};

const attTypes = {
  [GearPropType.incSTR]: GearPropType.incPAD,
  [GearPropType.incDEX]: GearPropType.incPAD,
  [GearPropType.incINT]: GearPropType.incMAD,
  [GearPropType.incLUK]: GearPropType.incPAD,
  [GearPropType.incMHP]: GearPropType.incPAD,
  [GearPropType.incAllStat]: GearPropType.incPAD,
} as const;

const typeNames = {
  [GearPropType.incSTR]: "힘",
  [GearPropType.incDEX]: "민첩",
  [GearPropType.incINT]: "지력",
  [GearPropType.incLUK]: "운",
  [GearPropType.incMHP]: "체력",
  [GearPropType.incAllStat]: "올스탯",
  [GearPropType.incPAD]: "공격력",
  [GearPropType.incMAD]: "마력",
} as const;

function getSpellTraceTier(gear: Gear): 0 | 1 | 2 {
  if (gear.req.level > 110) return 2;
  else if (gear.req.level > 70) return 1;
  else return 0;
}

function getWeaponSpellTrace(
  gear: Gear,
  type: SpellTraceStatType,
  probability: SpellTraceProbability
): Scroll | undefined {
  if (type === GearPropType.incAllStat) {
    return undefined;
  }

  const tier = getSpellTraceTier(gear);
  // eslint-disable-next-line prefer-const
  let [att, stat] = weaponAttStatData[probability][tier];

  const attType = attTypes[type];
  const attName = typeNames[attType];
  if (type === GearPropType.incMHP) stat *= 50;

  const name =
    stat > 0
      ? `${probability}% ${attName}(${typeNames[type]}) 주문서`
      : `${probability}% ${attName} 주문서`;
  const option = new Map([
    [type, stat],
    [attType, att],
  ]);

  return { name, option };
}

function getArmorSpellTrace(
  gear: Gear,
  type: SpellTraceStatType,
  probability: SpellTraceProbability
): Scroll | undefined {
  const tier = getSpellTraceTier(gear);
  const [stat, mhp, pdd] = armorStatMhpPddData[probability][tier];

  let statArr: [GearPropType, number][] = [];
  let mhpArr: [GearPropType, number][] = [];
  let attArr: [GearPropType, number][] = [];

  if (type === GearPropType.incMHP) {
    // MHP
    mhpArr = [[GearPropType.incMHP, mhp + stat * 50]];
  } else {
    mhpArr = [[GearPropType.incMHP, mhp]];
    if (type === GearPropType.incAllStat) {
      // AllStat
      if (!(probability in armorAllStatData)) return undefined;
      // @ts-expect-error probability is checked already
      const stat = armorAllStatData[probability][tier];
      statArr = [
        [GearPropType.incSTR, stat],
        [GearPropType.incDEX, stat],
        [GearPropType.incINT, stat],
        [GearPropType.incLUK, stat],
      ];
    } else {
      // STR, DEX, INT, LUK
      statArr = [[type, stat]];
    }
  }

  if (gear.upgradeCount === 3) {
    if (gear.req.job === 0) {
      attArr = [
        [GearPropType.incPAD, 1],
        [GearPropType.incMAD, 1],
      ];
    } else if (Math.floor(gear.req.job / 2) % 2 === 1) {
      attArr = [[GearPropType.incMAD, 1]];
    } else {
      attArr = [[GearPropType.incPAD, 1]];
    }
  }

  const name = `${probability}% ${typeNames[type]} 주문서`;
  const option = new Map([
    ...statArr,
    ...attArr,
    ...mhpArr,
    [GearPropType.incPDD, pdd],
  ]);

  return { name, option };
}

function getGloveSpellTrace(
  gear: Gear,
  type: SpellTraceStatType,
  probability: SpellTraceProbability
): Scroll | undefined {
  const tier = getSpellTraceTier(gear);
  const att = gloveAttData[probability][tier];

  if (att === 0) {
    return {
      name: `${probability}% 방어력 주문서`,
      option: new Map([[GearPropType.incPDD, 3]]),
    };
  } else {
    const attType = attTypes[type];
    return {
      name: `${probability}% ${typeNames[attType]} 주문서`,
      option: new Map([[attType, att]]),
    };
  }
}

function getAccSpellTrace(
  gear: Gear,
  type: SpellTraceStatType,
  probability: SpellTraceProbability
): Scroll | undefined {
  if (!(probability in accStatData)) return undefined;

  const tier = getSpellTraceTier(gear);
  // @ts-expect-error probability is checked already
  const stat = accStatData[probability][tier];

  let statArr: [GearPropType, number][] = [];

  if (type === GearPropType.incMHP) {
    statArr = [[GearPropType.incMHP, stat * 50]];
  } else {
    if (type === GearPropType.incAllStat) {
      // AllStat
      if (!(probability in accAllStatData)) return undefined;
      // @ts-expect-error probability is checked already
      const stat = accAllStatData[probability][tier];
      statArr = [
        [GearPropType.incSTR, stat],
        [GearPropType.incDEX, stat],
        [GearPropType.incINT, stat],
        [GearPropType.incLUK, stat],
      ];
    } else {
      // STR, DEX, INT, LUK
      statArr = [[type, stat]];
    }
  }

  const name = `${probability}% ${typeNames[type]} 주문서`;
  const option = new Map(statArr);

  return { name, option };
}

function getHeartSpellTrace(
  gear: Gear,
  type: SpellTraceStatType,
  probability: SpellTraceProbability
): Scroll | undefined {
  if (!(probability in heartAttData)) return undefined;

  const tier = getSpellTraceTier(gear);
  // @ts-expect-error probability is checked already
  const att = heartAttData[probability][tier];
  const attType = attTypes[type];

  const name = `${probability}% ${typeNames[type]} 주문서`;
  const option = new Map([[attType, att]]);

  return { name, option };
}
