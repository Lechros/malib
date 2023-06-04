import { Gear } from "../gear";
import { GearPropType } from "../gearproptype";
import { resetBonusStat } from "../logic/bonusstat";
import { addStarforce, resetEnhancement } from "../logic/enhancement";
import { resetExceptionalEnchant } from "../logic/exceptional";
import { resetUpgrade } from "../logic/upgrade";
import { Potential } from "../potential";

type GetPotentialFunc = (
  code: number,
  potentialLevel: number
) => Potential | undefined;

/**
 * 이전 옵션
 */
export interface MigrateOption {
  /** 코드에 해당하는 잠재능력을 반환하는 함수; `undefined`일 경우 기존 잠재능력을 복사합니다. */
  getPotentialFunc?: GetPotentialFunc;
  /** 이전 시 제외할 `GearPropType` 목록 */
  ignorePropTypes?: GearPropType[];
}

/**
 * 장비의 강화 상태를 새로운 장비로 이전합니다.
 * `target`의 상태만을 변경합니다.
 * `original`과 `target`의 `itemID`가 동일해야 합니다.
 *
 * `original`에 놀라운 장비 강화가 적용되었을 경우 재계산 없이 수치를 그대로 이전합니다.
 * @param original 강화가 적용된 기존 장비.
 * @param target 강화를 이전할 장비.
 * @param options 이전 시 적용할 옵션.
 * @returns 강화가 적용된 상태의 `target` 장비.
 */
export function migrate(
  original: Gear,
  target: Gear,
  options?: MigrateOption
): Gear {
  migrateProps(original, target, options?.ignorePropTypes);
  migrateAnvil(original, target);
  migrateBonus(original, target);
  migrateUpgrade(original, target);
  migrateEnhancement(original, target);
  migrateExceptional(original, target);
  migratePotential(original, target, options?.getPotentialFunc);
  migrateSoul(original, target);
  return target;
}

export function migrateProps(
  original: Gear,
  target: Gear,
  ignorePropTypes?: GearPropType[]
) {
  for (const [type, value] of original.props) {
    if (ignorePropTypes && ignorePropTypes.includes(type)) {
      continue;
    }
    target.props.set(type, value);
  }
  target.karma = original.karma;
}

export function migrateAnvil(original: Gear, target: Gear) {
  if (original.anvil !== undefined) {
    target.anvil = original.anvil;
  }
}

export function migrateBonus(original: Gear, target: Gear) {
  resetBonusStat(target);
  for (const [type, option] of original.options) {
    target.option(type).bonus = option.bonus;
  }
}

export function migrateUpgrade(original: Gear, target: Gear) {
  if (
    original.upgradeCount !== undefined &&
    original.upgradeFailCount !== undefined &&
    original.hammerCount !== undefined
  ) {
    resetUpgrade(target);
    target.upgradeCount = original.upgradeCount;
    target.upgradeFailCount = original.upgradeFailCount;
    target.hammerCount = original.hammerCount;
    for (const [type, option] of original.options) {
      target.option(type).upgrade = option.upgrade;
    }
  }
}

export function migrateEnhancement(original: Gear, target: Gear) {
  if (original.star !== undefined && original.star !== 0) {
    resetEnhancement(target);

    if (original.amazing) {
      target.star = original.star;
      target.maxStar = original.maxStar;
      target.amazing = original.amazing;
      for (const [type, option] of original.options) {
        target.option(type).enchant = option.enchant;
      }
    } else {
      for (let i = 0; i < original.star; i++) {
        addStarforce(target, true);
      }
    }
  }
}

export function migrateExceptional(original: Gear, target: Gear) {
  if (original.exceptionalUpgradeCount !== undefined) {
    resetExceptionalEnchant(target);
    target.exceptionalUpgradeCount = original.exceptionalUpgradeCount;
    target.exceptionalOptions = new Map(original.exceptionalOptions);
  }
}

export function migratePotential(
  original: Gear,
  target: Gear,
  getPotentialFunc?: GetPotentialFunc
) {
  const potLevel = Potential.getPotentialLevel(target.req.level);
  function copyPotential(pot: Potential | null): Potential | null {
    if (pot === null) {
      return null;
    }
    if (getPotentialFunc) {
      return getPotentialFunc(pot.code, potLevel) ?? null;
    } else {
      const newPot = new Potential();
      newPot.code = pot.code;
      newPot.option = new Map(pot.option);
      newPot.optionType = pot.optionType;
      newPot.reqLevel = pot.reqLevel;
      newPot.summary = pot.summary;
      return newPot;
    }
  }

  target.grade = original.grade;
  if (original.potentials.length !== 0) {
    target.potentials = original.potentials.map(copyPotential);
  }
  target.additionalGrade = original.additionalGrade;
  if (original.additionalPotentials.length !== 0) {
    target.additionalPotentials =
      original.additionalPotentials.map(copyPotential);
  }
}

export function migrateSoul(original: Gear, target: Gear) {
  target.soulWeapon.enchanted = original.soulWeapon.enchanted;
  if (original.soulWeapon.soul) {
    target.soulWeapon.soul = { ...original.soulWeapon.soul };
  }
  target.soulWeapon.setCharge(original.soulWeapon.charge);
}
