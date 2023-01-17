import { Gear } from "../gear";
import { GearPropType } from "../gearproptype";
import { GearType } from "../geartype";

/**
 * 장비 강화 관련 기능을 제공합니다.
 *
 * - 스타포스 강화 이후 주문서 수치가 변동될 경우 `recalculate` 함수를 호출해야 합니다.
 */
export class EnhancementLogic {
  private static readonly MAX_STARFORCE = 25;
  private static readonly MAX_AMAZING = 15;

  /**
   * 장비에 스타포스 강화를 1회 적용합니다.
   * - 업그레이드가 완료되지 않은 장비, 놀라운 장비강화 주문서가 적용된 장비에도 적용됩니다.
   * @param gear 강화를 적용할 장비
   * @param ignoreMaxStar 장비의 최대 강화 수치를 초과하여 강화하는지 여부
   * - 슈페리얼 장비는 최대 강화 수치를 초과할 수 없음
   * @returns 성공했을 경우 `true`; 아닐 경우 `false`
   */
  addStarforce(gear: Gear, ignoreMaxStar = false): boolean {
    if (gear.getBooleanValue(GearPropType.incCHUC)) {
      return false;
    }
    if (gear.getBooleanValue(GearPropType.superiorEqp)) {
      return this.addSuperiorStarforce(gear);
    }
    if (
      (gear.star >= gear.maxStar && !ignoreMaxStar) ||
      gear.star >= EnhancementLogic.MAX_STARFORCE
    ) {
      return false;
    }

    gear.star += 1;

    const star = gear.star;
    const statData = EnhancementLogic.getStatData(gear, false, false);
    const attData = EnhancementLogic.getStatData(gear, false, true);
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
        if ((reqJob & (1 << i)) !== 0)
          for (const type of jobStat[i]) statSet.add(type);
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
            EnhancementLogic.starforceGloveBonusAttData[star];
          gear.option(GearPropType.incMAD).enchant +=
            EnhancementLogic.starforceGloveBonusAttData[star];
        } else if (Math.floor(reqJob / 2) % 2 === 1) {
          gear.option(GearPropType.incMAD).enchant +=
            EnhancementLogic.starforceGloveBonusAttData[star];
        } else {
          gear.option(GearPropType.incPAD).enchant +=
            EnhancementLogic.starforceGloveBonusAttData[star];
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
      gear.option(GearPropType.incMHP).enchant +=
        EnhancementLogic.starforceMhpData[star];
      gear.option(GearPropType.incMMP).enchant +=
        EnhancementLogic.starforceMhpData[star];
    } else if (mhpTypes.includes(gear.type)) {
      gear.option(GearPropType.incMHP).enchant +=
        EnhancementLogic.starforceMhpData[star];
    }
    // speed, jump
    if (gear.type === GearType.shoes) {
      gear.option(GearPropType.incSpeed).enchant +=
        EnhancementLogic.starforceSpeedJumpData[star];
      gear.option(GearPropType.incJump).enchant +=
        EnhancementLogic.starforceSpeedJumpData[star];
    }

    return true;
  }

  /**
   * 슈페리얼 장비에 스타포스 강화를 1회 적용합니다.
   */
  private addSuperiorStarforce(gear: Gear): boolean {
    if (gear.star >= gear.maxStar) {
      return false;
    }

    gear.star += 1;

    const star = gear.star;
    const statData = EnhancementLogic.getStatData(gear, false, false);
    const attData = EnhancementLogic.getStatData(gear, false, true);

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
   *
   * 스타포스가 적용된 장비에도 사용 가능합니다. 슈페리얼 장비에는 적용되지 않습니다.
   * @param gear 강화를 적용할 장비
   * @param ignoreMaxStar 장비의 최대 강화 수치 초과로 강화하는 지 여부
   * - ex) 착용 제한 레벨이 100인 장비는 최대 강화 수치가 8성이지만 `ignoreMaxStar`가 `true`일 경우 15성까지 강화 가능
   * @param bonus 보너스 스탯 적용 여부
   * - 방어구(방패 제외): 최대 HP +50
   * - 장신구: 올스탯 +1~2
   * - 주무기, 블레이드, 방패: 공격력, 마력 +1
   * @returns 성공했을 경우 `true`; 아닐 경우 `false`
   */
  addAmazingEnhancement(
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
    if (
      (gear.star >= gear.maxStar && !ignoreMaxStar) ||
      gear.star >= EnhancementLogic.MAX_AMAZING
    ) {
      return false;
    }

    if (!gear.amazing) {
      gear.amazing = true;
      gear.maxStar = Math.min(gear.maxStar, EnhancementLogic.MAX_AMAZING);
    }

    gear.star += 1;

    const star = gear.star;
    const statData = EnhancementLogic.getStatData(gear, true, false);
    const attData = EnhancementLogic.getStatData(gear, true, true);
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
   * @param 강화를 초기화할 장비
   * @returns 성공했을 경우 `true`; 아닐 경우 `false`
   */
  resetEnhancement(gear: Gear): boolean {
    if (gear.getBooleanValue(GearPropType.incCHUC)) {
      return false;
    }

    gear.star = 0;
    gear.amazing = false;
    gear.maxStar = gear.getMaxStar();
    for (const [, option] of gear.options) {
      option.enchant = 0;
    }

    return true;
  }

  /**
   * 스타포스 강화로 오르는 스탯을 다시 계산합니다.
   *
   * 놀라운 장비강화 주문서가 적용된 장비에는 적용되지 않습니다.
   * @param 스탯을 다시 계산할 장비
   * @returns 성공했을 경우 `true`; 아닐 경우 `false`
   */
  recalculate(gear: Gear): boolean {
    if (gear.getBooleanValue(GearPropType.incCHUC)) {
      return false;
    }
    if (gear.amazing) {
      return false;
    }

    const star = gear.star;

    this.resetEnhancement(gear);
    for (let i = 0; i < star; i++) {
      this.addStarforce(gear, true);
    }

    return true;
  }

  private static getStatData(
    gear: Gear,
    amazing: boolean,
    att: boolean
  ): number[] {
    let data: number[][];
    if (gear.getBooleanValue(GearPropType.superiorEqp)) {
      if (att) {
        data = this.superiorAttData;
      } else {
        data = this.superiorStatData;
      }
    } else if (!amazing) {
      if (att) {
        if (Gear.isWeapon(gear.type) || gear.type === GearType.katara) {
          data = this.starforceWeaponAttData;
        } else {
          data = this.starforceAttData;
        }
      } else {
        data = this.starforceStatData;
      }
    } else {
      if (att) {
        data = this.amazingAttData;
      } else {
        data = this.amazingStatData;
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
  private static superiorAttData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [110, 0, 0, 0, 0, 0, 5, 6, 7, 0, 0, 0, 0, 0, 0, 0],
    [150, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 15, 17, 19, 21, 23],
  ];

  private static superiorStatData = [
    [0, 1, 2, 4, 7, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [80, 2, 3, 5, 8, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [110, 9, 10, 12, 15, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [150, 19, 20, 22, 25, 29, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  private static starforceWeaponAttData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 6, 7, 8, 9, 27, 28, 29,],
    [118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 6, 7, 8, 9, 10, 28, 29, 30,],
    [128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 8, 9, 10, 11, 29, 30, 31,],
    [138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 8, 9, 10, 11, 12, 30, 31, 32,],
    [148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 9, 10, 11, 12, 13, 31, 32, 33,],
    [158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 9, 10, 11, 12, 13, 14, 32, 33, 34,],
    [198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 13, 14, 14, 15, 16, 17, 34, 35, 36,],
    [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15, 15, 16, 16, 17, 18, 19, 36, 37, 38,],
  ];

  private static starforceAttData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [108, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 6, 7, 8, 9, 10, 12, 13, 15, 17,],
    [118, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 8, 9, 10, 11, 13, 14, 16, 18,],
    [128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20,],
    [138, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 10, 11, 12, 13, 15, 17, 19, 21,],
    [148, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22,],
    [158, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 11, 12, 13, 14, 15, 17, 19, 21, 23,],
    [198, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 16, 17, 19, 21, 23, 25,],
    [248, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 16, 17, 18, 19, 21, 23, 25, 27,],
  ];

  private static starforceStatData = [
    [0, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
    [108, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0,],
    [118, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 5, 5, 5, 0, 0, 0,],
    [128, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0,],
    [138, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 9, 9, 9, 9, 9, 9, 9, 0, 0, 0,],
    [148, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 11, 11, 11, 11, 11, 11, 11, 0, 0, 0,],
    [158, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 13, 13, 13, 13, 13, 13, 13, 0, 0, 0,],
    [198, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 15, 15, 15, 15, 15, 15, 15, 0, 0, 0,],
    [248, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 17, 17, 17, 17, 17, 17, 17, 0, 0, 0,],
  ];

  private static amazingAttData = [
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

  private static amazingStatData = [
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

  private static starforceGloveBonusAttData = [
    0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  private static starforceMhpData = [
    0, 5, 5, 5, 10, 10, 15, 15, 20, 20, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  private static starforceSpeedJumpData = [
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  /* eslint-enable prettier/prettier */
}