import {
  AddOptionGrade,
  AddOptionType,
  GearOption,
  PotentialData,
  PotentialGrade,
  SoulData,
} from '../data';
import { SpellTraceRate, SpellTraceType } from '../enhance/spellTrace';
import { Gear } from '../Gear';

export type Patch = (gear: Gear) => void;

export function starforcePatch(
  star: number,
  starScroll = false,
  ignoreMaxStar = false,
): Patch {
  return (gear: Gear) => {
    if (starScroll) {
      if (ignoreMaxStar) {
        for (let i = 0; i < star; i++) {
          gear.applyStarScrollIgnoringMaxStar();
        }
      } else {
        for (let i = 0; i < star; i++) {
          gear.applyStarScroll();
        }
      }
    } else {
      if (ignoreMaxStar) {
        for (let i = 0; i < star; i++) {
          gear.applyStarforceIgnoringMaxStar();
        }
      } else {
        for (let i = 0; i < star; i++) {
          gear.applyStarforce();
        }
      }
    }
  };
}

export function upgradePatch(
  options: ([SpellTraceType, SpellTraceRate] | Partial<GearOption>)[],
): Patch {
  function apply(
    gear: Gear,
    option: [SpellTraceType, SpellTraceRate] | Partial<GearOption>,
  ) {
    if (Array.isArray(option)) {
      const [type, rate] = option;
      gear.applySpellTrace(type, rate);
    } else {
      gear.applyScroll({
        name: '',
        option: option,
      });
    }
  }
  return (gear: Gear) => {
    options.forEach((item) => {
      apply(gear, item);
    });
    while (gear.canApplyScroll) {
      apply(gear, options[options.length - 1]);
    }
  };
}

export function addOptionPatch(
  options: [AddOptionType, AddOptionGrade][],
): Patch {
  return (gear: Gear) => {
    options.forEach(([type, grade]) => {
      gear.applyAddOption(type, grade);
    });
  };
}

export function potentialPatch(
  grade: PotentialGrade,
  options: PotentialData[],
): Patch {
  return (gear: Gear) => {
    gear.setPotential(grade, options);
  };
}

export function addiPotentialPatch(
  grade: PotentialGrade,
  options: PotentialData[],
): Patch {
  return (gear: Gear) => {
    gear.setAdditionalPotential(grade, options);
  };
}

export function soulPatch(soul?: SoulData, charge = 0): Patch {
  return (gear: Gear) => {
    gear.applySoulEnchant();
    if (soul) {
      gear.setSoul(soul);
    }
    if (charge) {
      gear.setSoulCharge(charge);
    }
  };
}
