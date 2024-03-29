import { Gear } from "../gear";
import { GearPropType } from "../gearproptype";
import { GearType } from "../geartype";

const MAX_STARFORCE = 25;
const MAX_AMAZING = 15;

/**
 * 장비에 스타포스 강화를 1회 적용합니다.
 * 업그레이드가 완료되지 않은 장비, 놀라운 장비강화 주문서가 적용된 장비에도 적용할 수 있습니다.
 * 주문서 수치가 변경될 경우 `recalculate` 함수를 직접 적용해야 합니다.
 * @param gear 강화를 적용할 장비.
 * @param ignoreMaxStar 장비의 최대 강화 수치를 초과하여 강화하는지 여부. 기본값은 `false`입니다.
 * 슈페리얼 장비일 경우 무시합니다.
 * @returns 적용했을 경우 `true`; 아닐 경우 `false`.
 * `ignoreMaxStar`가 `false`고 장비의 현재 강화 수치가 최대 강화 수치와 동일하거나,
 * `ignoreMaxStar`가 `true`고 장비의 현재 강화 수치가 `25`이거나,
 * 놀라운 장비강화 주문서가 적용된 상태이고 장비의 현재 강화 수치가 `15`일 경우 `false`를 반환합니다.
 */
export function addStarforce(gear: Gear, ignoreMaxStar = false): boolean {
  if (gear.getBooleanValue(GearPropType.incCHUC)) {
    return false;
  }
  if (gear.getBooleanValue(GearPropType.superiorEqp)) {
    return addSuperiorStarforce(gear);
  }
  if (
    (gear.star >= gear.maxStar && !ignoreMaxStar) ||
    gear.star >= MAX_STARFORCE
  ) {
    return false;
  }

  gear.star += 1;

  const star = gear.star;
  const statData = getStatData(gear, false, false);
  const attData = getStatData(gear, false, true);
  const isWeaponEnhance =
    Gear.isWeapon(gear.type) || gear.type === GearType.katara;

  // stat
  const jobStat = [
    [GearPropType.incSTR, GearPropType.incDEX],
    [GearPropType.incINT, GearPropType.incLUK],
    [GearPropType.incDEX, GearPropType.incSTR],
    [GearPropType.incLUK, GearPropType.incDEX],
    [GearPropType.incSTR, GearPropType.incDEX],
  ];
  const statType = [
    GearPropType.incSTR,
    GearPropType.incDEX,
    GearPropType.incINT,
    GearPropType.incLUK,
  ];
  let statSet: Set<GearPropType>;
  const reqJob = gear.req.job;
  if (reqJob === 0) {
    statSet = new Set([
      GearPropType.incSTR,
      GearPropType.incDEX,
      GearPropType.incINT,
      GearPropType.incLUK,
    ]);
  } else {
    statSet = new Set();
    for (let i = 0; i < 5; i++) {
      if ((reqJob & (1 << i)) !== 0) {
        for (const type of jobStat[i]) {
          statSet.add(type);
        }
      }
    }
  }
  for (const type of statType) {
    if (statSet.has(type)) {
      gear.option(type).enchant += statData[star];
    } else if (
      star > 15 &&
      (gear.option(type).base > 0 || gear.option(type).upgrade > 0)
    ) {
      gear.option(type).enchant += statData[star];
    }
  }
  // attack
  if (isWeaponEnhance) {
    const useMad =
      reqJob === 0 ||
      Math.floor(reqJob / 2) % 2 === 1 ||
      gear.option(GearPropType.incMAD).upgrade > 0;
    if (star > 15) {
      gear.option(GearPropType.incPAD).enchant += attData[star];
      if (useMad) {
        gear.option(GearPropType.incMAD).enchant += attData[star];
      }
    } else {
      const pad =
        gear.option(GearPropType.incPAD).sum -
        gear.option(GearPropType.incPAD).bonus;
      gear.option(GearPropType.incPAD).enchant += Math.floor(pad / 50) + 1;
      if (useMad) {
        const mad =
          gear.option(GearPropType.incMAD).sum -
          gear.option(GearPropType.incMAD).bonus;
        gear.option(GearPropType.incMAD).enchant += Math.floor(mad / 50) + 1;
      }
    }
  } else {
    gear.option(GearPropType.incPAD).enchant += attData[star];
    gear.option(GearPropType.incMAD).enchant += attData[star];

    if (gear.type === GearType.glove) {
      if (reqJob === 0) {
        gear.option(GearPropType.incPAD).enchant +=
          starforceGloveBonusAttData[star];
        gear.option(GearPropType.incMAD).enchant +=
          starforceGloveBonusAttData[star];
      } else if (Math.floor(reqJob / 2) % 2 === 1) {
        gear.option(GearPropType.incMAD).enchant +=
          starforceGloveBonusAttData[star];
      } else {
        gear.option(GearPropType.incPAD).enchant +=
          starforceGloveBonusAttData[star];
      }
    }
  }
  // pdd
  if (!isWeaponEnhance && gear.type !== GearType.machineHeart) {
    const pdd =
      gear.option(GearPropType.incPDD).sum -
      gear.option(GearPropType.incPDD).bonus;
    gear.option(GearPropType.incPDD).enchant += Math.floor(pdd / 20) + 1;
  }
  // hp, mp
  const mhpTypes = [
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
  if (isWeaponEnhance) {
    gear.option(GearPropType.incMHP).enchant += starforceMhpData[star];
    gear.option(GearPropType.incMMP).enchant += starforceMhpData[star];
  } else if (mhpTypes.includes(gear.type)) {
    gear.option(GearPropType.incMHP).enchant += starforceMhpData[star];
  }
  // speed, jump
  if (gear.type === GearType.shoes) {
    gear.option(GearPropType.incSpeed).enchant += starforceSpeedJumpData[star];
    gear.option(GearPropType.incJump).enchant += starforceSpeedJumpData[star];
  }

  return true;
}

/**
 * 슈페리얼 장비에 스타포스 강화를 1회 적용합니다.
 */
function addSuperiorStarforce(gear: Gear): boolean {
  if (gear.star >= gear.maxStar) {
    return false;
  }

  gear.star += 1;

  const star = gear.star;
  const statData = getStatData(gear, false, false);
  const attData = getStatData(gear, false, true);

  // stat
  const statType = [
    GearPropType.incSTR,
    GearPropType.incDEX,
    GearPropType.incINT,
    GearPropType.incLUK,
  ];
  for (const type of statType) {
    if (gear.option(type).base > 0) {
      gear.option(type).enchant += statData[star];
    }
  }
  // 공격력, 마력
  const attType = [GearPropType.incPAD, GearPropType.incMAD];
  for (const type of attType) {
    if (gear.option(type).base > 0) {
      gear.option(type).enchant += attData[star];
    }
  }
  // 방어력
  const pdd =
    gear.option(GearPropType.incPDD).sum -
    gear.option(GearPropType.incPDD).bonus;
  gear.option(GearPropType.incPDD).enchant += Math.floor(pdd / 20) + 1;

  return true;
}

/**
 * 장비에 놀라운 장비강화 주문서를 1회 적용합니다.
 * 업그레이드가 완료되지 않은 장비, 스타포스 강화가 적용된 장비에도 적용할 수 있습니다. 슈페리얼 장비에는 적용할 수 없습니다.
 * @param gear 강화를 적용할 장비.
 * @param bonus 보너스 스탯 적용 여부.
 * 장비 분류가 방어구(방패 제외)일 경우 최대 HP 50, 장신구일 경우 올스탯 1또는 2, 주무기/블레이드/방패일 경우 공격력 및 마력 1을 적용합니다.
 * @param ignoreMaxStar 장비의 최대 강화 수치를 초과하여 강화하는지 여부. 기본값은 `false`입니다.
 * @returns 적용했을 경우 `true`; 아닐 경우 `false`.
 * 슈페리얼 장비거나,
 * `ignoreMaxStar`가 `false`고 장비의 현재 강화 수치가 최대 강화 수치와 동일하거나,
 * `ignoreMaxStar`가 `true`고 장비의 현재 강화 수치가 `15`일 경우 `false`를 반환합니다.
 */
export function addAmazingEnhancement(
  gear: Gear,
  bonus = false,
  ignoreMaxStar = false
): boolean {
  if (gear.getBooleanValue(GearPropType.incCHUC)) {
    return false;
  }
  if (gear.getBooleanValue(GearPropType.superiorEqp)) {
    return false;
  }
  if (gear.req.level > 150) {
    return false;
  }
  if (
    (gear.star >= gear.maxStar && !ignoreMaxStar) ||
    gear.star >= MAX_AMAZING
  ) {
    return false;
  }

  if (!gear.amazing) {
    gear.amazing = true;
    gear.maxStar = Math.min(gear.maxStar, MAX_AMAZING);
  }

  gear.star += 1;

  const star = gear.star;
  const statData = getStatData(gear, true, false);
  const attData = getStatData(gear, true, true);
  const isWeaponEnhance =
    Gear.isWeapon(gear.type) || gear.type === GearType.katara;

  // stat
  const statType = [
    GearPropType.incSTR,
    GearPropType.incDEX,
    GearPropType.incINT,
    GearPropType.incLUK,
  ];
  for (const type of statType) {
    const hasType = gear.option(type).sum > 0;
    if (hasType) {
      let statValue = statData[star];
      if (bonus && Gear.isAccessory(gear.type)) {
        statValue += star > 5 ? 2 : 1;
      }
      gear.option(type).enchant += statValue;
    }
  }
  // attack
  const attType = [GearPropType.incPAD, GearPropType.incMAD];
  for (const type of attType) {
    const att = gear.option(type).sum;
    if (att > 0) {
      if (isWeaponEnhance) {
        gear.option(type).enchant += Math.floor(att / 50) + 1;
      }
      let attValue = attData[star];
      if (bonus && (isWeaponEnhance || gear.type === GearType.shield)) {
        attValue += 1;
      }
      gear.option(type).enchant += attValue;
    }
  }
  // hp
  if (bonus && Gear.isArmor(gear.type)) {
    gear.option(GearPropType.incMHP).enchant += 50;
  }
  // pdd
  const pdd = gear.option(GearPropType.incPDD).sum;
  gear.option(GearPropType.incPDD).enchant += Math.floor(pdd / 20) + 1;

  return true;
}

/**
 * 장비 강화를 초기화합니다.
 * @param 강화를 초기화할 장비.
 * @returns 초기화했을 경우 `true`; 아닐 경우 `false`.
 */
export function resetEnhancement(gear: Gear): boolean {
  if (gear.getBooleanValue(GearPropType.incCHUC)) {
    return false;
  }

  gear.star = 0;
  gear.amazing = false;
  gear.maxStar = Gear.getMaxStar(gear);
  for (const [, option] of gear.options) {
    option.enchant = 0;
  }

  return true;
}

/**
 * 스타포스 강화로 오르는 스탯을 다시 계산합니다. 주문서 강화 수치에 변동이 있을 경우 적용해야 합니다.
 * @param 스탯을 다시 계산할 장비.
 * @returns 성공했을 경우 `true`; 아닐 경우 `false`.
 * 놀라운 장비강화 주문서가 적용된 장비일 경우 `false`를 반환합니다.
 */
export function recalculateStarforce(gear: Gear): boolean {
  if (gear.getBooleanValue(GearPropType.incCHUC)) {
    return false;
  }
  if (gear.amazing) {
    return false;
  }

  const star = gear.star;

  resetEnhancement(gear);
  for (let i = 0; i < star; i++) {
    addStarforce(gear, true);
  }

  return true;
}

function getStatData(
  gear: Gear,
  amazing: boolean,
  att: boolean
): readonly number[] {
  let data: readonly (readonly number[])[];
  if (gear.getBooleanValue(GearPropType.superiorEqp)) {
    if (att) {
      data = superiorAttData;
    } else {
      data = superiorStatData;
    }
  } else if (!amazing) {
    if (att) {
      if (Gear.isWeapon(gear.type) || gear.type === GearType.katara) {
        data = starforceWeaponAttData;
      } else {
        data = starforceAttData;
      }
    } else {
      data = starforceStatData;
    }
  } else {
    if (att) {
      data = amazingAttData;
    } else {
      data = amazingStatData;
    }
  }
  const reqLevel: number = gear.req.level;
  for (const item of [...data].reverse()) {
    if (reqLevel >= item[0]) {
      return item;
    }
  }
  throw Error("Gear has invalid reqLevel.\n" + gear);
}

/* eslint-disable prettier/prettier */
const superiorAttData = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [110, 0, 0, 0, 0, 0, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0],
  [150, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 15, 17, 19, 21, 23],
] as const;

const superiorStatData = [
  [0, 1, 2, 4, 7, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [80, 2, 3, 5, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [110, 9, 10, 12, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [150, 19, 20, 22, 25, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
] as const;

const starforceWeaponAttData = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ],
  [
    108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 7, 8, 9, 27,
    28, 29,
  ],
  [
    118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 7, 8, 9, 10, 28,
    29, 30,
  ],
  [
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 8, 9, 10, 11, 29,
    30, 31,
  ],
  [
    138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 9, 10, 11, 12,
    30, 31, 32,
  ],
  [
    148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 9, 10, 11, 12, 13,
    31, 32, 33,
  ],
  [
    158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 10, 11, 12, 13, 14,
    32, 33, 34,
  ],
  [
    198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 14, 14, 15, 16,
    17, 34, 35, 36,
  ],
  [
    248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 16, 16, 17, 18,
    19, 36, 37, 38,
  ],
] as const;

const starforceAttData = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ],
  [
    108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10, 12, 13,
    15, 17,
  ],
  [
    118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 8, 9, 10, 11, 13,
    14, 16, 18,
  ],
  [
    128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 10, 11, 12, 14,
    16, 18, 20,
  ],
  [
    138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 10, 11, 12, 13, 15,
    17, 19, 21,
  ],
  [
    148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 16,
    18, 20, 22,
  ],
  [
    158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15,
    17, 19, 21, 23,
  ],
  [
    198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 17,
    19, 21, 23, 25,
  ],
  [
    248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 16, 17, 18, 19,
    21, 23, 25, 27,
  ],
] as const;

const starforceStatData = [
  [
    0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0,
  ],
  [
    108, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
    0,
  ],
  [
    118, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 0, 0,
    0,
  ],
  [
    128, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7, 7, 7, 0, 0,
    0,
  ],
  [
    138, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 0, 0,
    0,
  ],
  [
    148, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 11, 11, 11, 11, 11,
    11, 0, 0, 0,
  ],
  [
    158, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13, 13, 13, 13, 13, 13,
    13, 0, 0, 0,
  ],
  [
    198, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 15, 15, 15, 15, 15, 15,
    15, 0, 0, 0,
  ],
  [
    248, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 17, 17, 17, 17, 17, 17,
    17, 0, 0, 0,
  ],
] as const;

const amazingAttData = [
  [0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14],
  [80, 0, 0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 9, 11, 13, 15],
  [90, 0, 0, 0, 0, 0, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16],
  [100, 0, 0, 0, 0, 0, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17],
  [110, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18],
  [120, 0, 0, 0, 0, 0, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19],
  [130, 0, 0, 0, 0, 0, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20],
  [140, 0, 0, 0, 0, 0, 8, 9, 10, 11, 12, 13, 15, 17, 19, 21],
  [150, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22],
] as const;

const amazingStatData = [
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
] as const;

const starforceGloveBonusAttData = [
  0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
] as const;

const starforceMhpData = [
  0, 5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
] as const;

const starforceSpeedJumpData = [
  0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
] as const;
/* eslint-enable prettier/prettier */
