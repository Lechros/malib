import {
  PotentialData,
  PotentialGrade,
  SoulBaseOption,
  SoulData,
} from '../data';
import { ErrorCode, GearError } from '../error';
import { Gear } from '../Gear';
import { isWeapon } from '../gearType';
import { ReadonlyGear } from '../ReadonlyGear';

/**
 * 장비가 소울웨폰을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 변환할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function supportsSoulWeapon(gear: ReadonlyGear): boolean {
  return isWeapon(gear.type);
}

/**
 * 장비를 소울웨폰으로 변환할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 변환할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplySoulEnchant(gear: ReadonlyGear): boolean {
  return checkApplySoulEnchant(gear) === undefined;
}

function checkApplySoulEnchant(gear: ReadonlyGear) {
  if (!supportsSoulWeapon(gear)) return ErrorCode.SoulWeapon_Enchant_NotWeapon;
  if (gear.soulEnchanted) return ErrorCode.SoulWeapon_Enchant_AlreadyEnchanted;
  return undefined;
}

/**
 * 장비를 소울웨폰으로 변환합니다.
 * @param gear 변환할 장비.
 *
 * @throws {@link GearError}
 * 소울웨폰으로 변환할 수 없는 경우.
 */
export function applySoulEnchant(gear: Gear) {
  const code = checkApplySoulEnchant(gear);
  if (code !== undefined) {
    throw new GearError(code, { gear });
  }
  gear.data.soulWeapon ??= {};
  gear.data.soulWeapon.enchanted = true;
}

/**
 * 장비에 해당 소울을 장착할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @param magnificent 장착할 소울의 위대한 소울 여부.
 * @returns 장착할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetSoul(gear: ReadonlyGear, magnificent: boolean): boolean {
  return checkSetSoul(gear, magnificent) === undefined;
}

function checkSetSoul(gear: ReadonlyGear, magnificent: boolean) {
  if (!gear.soulEnchanted) return ErrorCode.SoulWeapon_Equip_NotEnchanted;
  // 비활성 증폭 정보도 일반 소울 장착을 제한합니다.
  if ((gear.data.soulWeapon?.amplificationLevel ?? 0) > 0 && !magnificent)
    return ErrorCode.SoulWeapon_Equip_AmplifiedSlotRequiresAmplifiableSoul;
  return undefined;
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
  const code = checkSetSoul(gear, soul.magnificent ?? false);
  if (code !== undefined) {
    throw new GearError(code, { gear });
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  gear.data.soulWeapon!.soul = soul;
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
 * 장비에 부여된 소울이 증폭을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 */
export function supportsSoulAmplification(gear: ReadonlyGear): boolean {
  return (
    gear.req.level >= 200 &&
    gear.soulEnchanted &&
    gear.soul?.magnificent === true
  );
}

/**
 * 장비에 소울 증폭을 진행할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 진행할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplySoulAmplification(gear: ReadonlyGear): boolean {
  return checkApplySoulAmplification(gear) === undefined;
}

function checkApplySoulAmplification(gear: ReadonlyGear) {
  if (gear.req.level < 200)
    return ErrorCode.SoulWeapon_Amplify_ReqLevelBelow200;
  if (!gear.soulEnchanted) return ErrorCode.SoulWeapon_Amplify_NotEnchanted;
  if (!gear.soul) return ErrorCode.SoulWeapon_Amplify_NoSoulEquipped;
  if (!gear.soul.magnificent)
    return ErrorCode.SoulWeapon_Amplify_EquippedSoulNotAmplifiable;
  if ((gear.data.soulWeapon?.amplificationLevel ?? 0) >= 4)
    return ErrorCode.SoulWeapon_Amplify_MaxLevelReached;
  return undefined;
}

/**
 * 장비에 소울 증폭을 진행합니다.
 * @param gear 증폭할 장비.
 *
 * @throws {@link GearError}
 * 소울 증폭을 진행할 수 없는 경우.
 */
export function applySoulAmplification(gear: Gear) {
  const code = checkApplySoulAmplification(gear);
  if (code !== undefined) {
    throw new GearError(code, { gear });
  }
  if (gear.soulAmplificationLevel === 0) {
    gear.data.soulWeapon!.potentialGrade = PotentialGrade.Rare;
    gear.data.soulWeapon!.potentials = [];
  }
  gear.data.soulWeapon!.amplificationLevel =
    (gear.data.soulWeapon!.amplificationLevel ?? 0) + 1;
}

/**
 * 장비에 소울 잠재능력을 설정할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 소울 잠재능력을 설정할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetSoulPotential(gear: ReadonlyGear): boolean {
  return gear.soulAmplificationActive;
}

function checkSetSoulPotential(
  gear: ReadonlyGear,
  grade?: PotentialGrade,
  options?: PotentialData[],
) {
  if (gear.req.level < 200)
    return ErrorCode.SoulWeapon_SetPotential_ReqLevelBelow200;
  if (!gear.soulEnchanted)
    return ErrorCode.SoulWeapon_SetPotential_NotEnchanted;
  if (!gear.soul) return ErrorCode.SoulWeapon_SetPotential_NoSoulEquipped;
  if (!gear.soul.magnificent)
    return ErrorCode.SoulWeapon_SetPotential_EquippedSoulNotAmplifiable;
  if ((gear.data.soulWeapon?.amplificationLevel ?? 0) <= 0)
    return ErrorCode.SoulWeapon_SetPotential_NotAmplified;
  if (grade === PotentialGrade.Normal)
    return ErrorCode.SoulWeapon_SetPotential_NormalGradeNotAllowed;
  if (options && options.length !== 3)
    return ErrorCode.SoulWeapon_SetPotential_OptionCountNotThree;
  return undefined;
}

/**
 * 장비에 소울 잠재능력을 설정합니다.
 * @param gear 대상 장비.
 * @param grade 설정할 소울 잠재능력 등급.
 * @param options 설정할 소울 잠재능력 옵션.
 *
 * @throws {@link GearError}
 * 소울 잠재능력을 설정할 수 없는 경우.
 */
export function setSoulPotential(
  gear: Gear,
  grade: PotentialGrade,
  options: PotentialData[],
) {
  const code = checkSetSoulPotential(gear, grade, options);
  if (code !== undefined) {
    throw new GearError(code, {
      gear,
      grade,
      'options.length': options.length,
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  gear.data.soulWeapon!.potentialGrade = grade;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  gear.data.soulWeapon!.potentials = options;
}

/**
 * 소울 인챈트를 해제합니다. 소울, 증폭 단계 및 잠재능력 데이터는 보존합니다.
 * @param gear 대상 장비.
 */
export function removeSoulEnchant(gear: Gear) {
  if (gear.data.soulWeapon) {
    gear.data.soulWeapon.enchanted = false;
  }
}

/**
 * 소울만 제거합니다. 인챈트, 증폭 단계 및 잠재능력 데이터는 보존합니다.
 * @param gear 대상 장비.
 */
export function removeSoul(gear: Gear) {
  if (gear.data.soulWeapon) {
    delete gear.data.soulWeapon.soul;
  }
}

/**
 * 비활성 데이터를 포함한 소울웨폰 정보를 완전히 제거합니다.
 * @param gear 대상 장비.
 */
export function resetSoulWeapon(gear: Gear) {
  delete gear.data.soulWeapon;
}
