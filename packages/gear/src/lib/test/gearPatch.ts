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
  arg: [number] | [number, boolean] | [number, boolean, boolean],
): Patch {
  return (gear: Gear) => {
    const [star, starScroll, ignoreMaxStar] = arg;
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
  arg: ([SpellTraceType, SpellTraceRate] | Partial<GearOption>)[],
): Patch {
  function apply(
    gear: Gear,
    arg: [SpellTraceType, SpellTraceRate] | Partial<GearOption>,
  ) {
    if (Array.isArray(arg)) {
      const [type, rate] = arg;
      gear.applySpellTrace(type, rate);
    } else {
      gear.applyScroll({
        name: '',
        option: arg,
      });
    }
  }
  return (gear: Gear) => {
    arg.forEach((item) => {
      apply(gear, item);
    });
    while (gear.canApplyScroll) {
      apply(gear, arg[arg.length - 1]);
    }
  };
}

export function addOptionPatch(arg: [AddOptionType, AddOptionGrade][]): Patch {
  return (gear: Gear) => {
    arg.forEach(([type, grade]) => {
      gear.applyAddOption(type, grade);
    });
  };
}

export function potentialPatch(arg: [PotentialGrade, PotentialData[]]): Patch {
  return (gear: Gear) => {
    const [grade, options] = arg;
    gear.setPotential(grade, options);
  };
}

export function addiPotentialPatch(
  arg: [PotentialGrade, PotentialData[]],
): Patch {
  return (gear: Gear) => {
    const [grade, options] = arg;
    gear.setAdditionalPotential(grade, options);
  };
}

export function soulPatch(arg: [SoulData] | [SoulData, number]): Patch {
  return (gear: Gear) => {
    const [soul, charge] = arg;
    gear.applySoulEnchant();
    gear.setSoul(soul);
    if (charge) {
      gear.setSoulCharge(charge);
    }
  };
}
