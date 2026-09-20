import { SoulBaseOption, SoulData } from '../data';
import { ErrorMessage, GearError } from '../errors';
import { Gear } from '../Gear';
import { isWeapon } from '../gearType';
import { ReadonlyGear } from '../ReadonlyGear';

/**
 * 장비가 소울웨폰을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsSoul(gear: ReadonlyGear): boolean {
  return isWeapon(gear.type);
}

/**
 * 장비에 소울 인챈터를 적용할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplySoulEnchant(gear: ReadonlyGear): boolean {
  return supportsSoul(gear) && !gear.soulEnchanted;
}

/**
 * 장비에 소울 인챈터를 적용합니다.
 * @param gear 적용할 장비.
 *
 * @throws {@link GearError}
 * 소울 인챈터를 적용할 수 없는 경우.
 */
export function applySoulEnchant(gear: Gear) {
  if (!canApplySoulEnchant(gear)) {
    throw new GearError(ErrorMessage.Soul_AlreadyEnchanted, gear, {
      type: gear.type,
      soulEnchanted: gear.soulEnchanted,
    });
  }
  gear.data.soulSlot = {};
}

/**
 * 장비에 소울을 장착할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 장착할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetSoul(gear: ReadonlyGear): boolean {
  return gear.soulEnchanted;
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
  if (!canSetSoul(gear)) {
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
 * 기본 공격력과 마력 중 높은 쪽에 20을 적용하며, 동률이면 공격력에 적용합니다.
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
 * 장비의 소울웨폰을 초기화합니다.
 * @param gear 초기화할 장비.
 */
export function resetSoulEnchant(gear: Gear) {
  gear.data.soulSlot = undefined;
}
