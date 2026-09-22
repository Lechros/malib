import {
  PotentialData,
  PotentialGrade,
  SoulBaseOption,
  SoulData,
} from '../data';
import { ErrorMessage, GearError } from '../errors';
import { Gear } from '../Gear';
import { isWeapon } from '../gearType';
import { ReadonlyGear } from '../ReadonlyGear';

/**
 * 장비가 소울웨폰을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 변환할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function supportsSoul(gear: ReadonlyGear): boolean {
  return isWeapon(gear.type);
}

/**
 * 장비를 소울웨폰으로 변환할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 변환할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplySoulEnchant(gear: ReadonlyGear): boolean {
  return supportsSoul(gear) && !gear.soulEnchanted;
}

/**
 * 장비를 소울웨폰으로 변환합니다.
 * @param gear 변환할 장비.
 *
 * @throws {@link GearError}
 * 소울웨폰으로 변환할 수 없는 경우.
 */
export function applySoulEnchant(gear: Gear) {
  if (!canApplySoulEnchant(gear)) {
    throw new GearError(ErrorMessage.Soul_AlreadyEnchanted, gear, {
      type: gear.type,
      soulEnchanted: gear.soulEnchanted,
    });
  }
  gear.data.soulSlot ??= {};
  gear.data.soulSlot.enchanted = true;
}

/**
 * 장비에 해당 소울을 장착할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @param soul 확인할 소울 아이템.
 * @returns 장착할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetSoul(gear: ReadonlyGear, soul: SoulData): boolean {
  if (!gear.soulEnchanted) {
    return false;
  }
  return gear.soulAmplificationLevel === 0 || soul.canAmplify === true;
}

/**
 * 장비에 소울을 장착합니다.
 * @param gear 대상 장비.
 * @param soul 장착할 소울 아이템.
 *
 * @throws {@link GearError}
 * 소울을 장착할 수 없는 경우.
 */
export function setSoul(gear: Gear, soul: SoulData) {
  if (!canSetSoul(gear, soul)) {
    throw new GearError(ErrorMessage.Soul_SetSoulUnenchanted, gear, {
      type: gear.type,
      soulEnchanted: gear.soulEnchanted,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  gear.data.soulSlot!.soul = soul;
}

/**
 * 장비의 소울 상시 적용 옵션을 반환합니다.
 * 옵션은 공격력 +20 또는 마력 +20입니다.
 * @param gear 대상 장비.
 * @returns 장비의 소울 상시 적용 옵션. 소울이 장착되어 있지 않을 경우 `undefined`.
 */
export function getSoulBaseOption(
  gear: ReadonlyGear,
): Partial<SoulBaseOption> | undefined {
  if (gear.soul) {
    if (gear.baseOption.attackPower >= gear.baseOption.magicPower) {
      return { attackPower: 20 };
    } else {
      return { magicPower: 20 };
    }
  }
  return undefined;
}

/**
 * 장비에 소울 증폭을 진행할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 진행할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canAmplifySoul(gear: ReadonlyGear): boolean {
  if (gear.req.level < 200) {
    return false;
  }
  if (gear.data.soulSlot?.enchanted && gear.soul?.canAmplify) {
    return (gear.data.soulSlot?.amplificationLevel ?? 0) < 4;
  }
  return false;
}

/**
 * 장비에 소울 증폭을 진행합니다.
 * @param gear 증폭할 장비.
 *
 * @throws {@link GearError}
 * 소울 증폭을 진행할 수 없는 경우.
 */
export function amplifySoul(gear: Gear) {
  if (!canAmplifySoul(gear)) {
    throw new GearError(ErrorMessage.Soul_CannotAmplify, gear, {
      type: gear.type,
      soulEnchanted: gear.soulEnchanted,
      amplificationLevel: gear.data.soulSlot?.amplificationLevel ?? 0,
      soul: gear.soul,
    });
  }
  if (gear.soulAmplificationLevel === 0) {
    gear.data.soulSlot!.potentialGrade = PotentialGrade.Rare;
    gear.data.soulSlot!.potentials = [];
  }
  gear.data.soulSlot!.amplificationLevel =
    (gear.data.soulSlot!.amplificationLevel ?? 0) + 1;
}

/**
 * 장비에 소울 잠재능력을 설정할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 소울 잠재능력을 설정할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetSoulPotential(gear: ReadonlyGear): boolean {
  if (!gear.data.soulSlot?.enchanted) {
    return false;
  }
  if ((gear.data.soulSlot.amplificationLevel ?? 0) === 0) {
    return false;
  }
  return gear.soul?.canAmplify === true;
}

/**
 * 장비에 소울 잠재능력을 설정합니다.
 * @param gear 대상 장비.
 * @param potential 설정할 소울 잠재능력.
 *
 * @throws {@link GearError}
 * 소울 잠재능력을 설정할 수 없는 경우.
 */
export function setSoulPotential(
  gear: Gear,
  grade: PotentialGrade,
  options: PotentialData[],
) {
  if (!canSetSoulPotential(gear)) {
    throw new GearError(ErrorMessage.Soul_InvalidSoulPotentialGear, gear, {
      type: gear.type,
      soulEnchanted: gear.soulEnchanted,
      amplificationLevel: gear.data.soulSlot?.amplificationLevel,
      soul: gear.soul,
    });
  }
  if (grade === PotentialGrade.Normal) {
    throw new RangeError(ErrorMessage.Soul_InvalidSoulPotentialGrade);
  }
  if (options.length !== 3) {
    throw new GearError(ErrorMessage.Soul_InvalidSoulPotentialOptions, gear, {
      'options.length': options.length,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  gear.data.soulSlot!.potentialGrade = grade;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  gear.data.soulSlot!.potentials = options;
}

/**
 * 장비의 소울웨폰을 초기화합니다.
 * 증폭 단계 및 소울 잠재능력은 비활성화 상태로 전환됩니다.
 * @param gear 초기화할 장비.
 */
export function resetSoulEnchant(gear: Gear) {
  if (gear.data.soulSlot) {
    gear.data.soulSlot.enchanted = false;
    gear.data.soulSlot.soul = undefined;
  }
}
