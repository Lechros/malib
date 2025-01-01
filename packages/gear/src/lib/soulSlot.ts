import { SoulChargeOption, SoulData } from './data';
import { ErrorMessage } from './errors';
import { Gear } from './Gear';
import { isWeapon } from './gearType';

/**
 * 장비가 소울웨폰을 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsSoul(gear: Gear): boolean {
  return isWeapon(gear.type) && gear.req.level >= 30;
}

/**
 * 장비에 소울 인챈터를 적용할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplySoulEnchant(gear: Gear): boolean {
  return supportsSoul(gear) && !gear.soulEnchanted;
}

/**
 * 장비에 소울 인챈터를 적용합니다.
 * @param gear 적용할 장비.
 *
 * @throws {@link TypeError}
 * 소울 인챈터를 적용할 수 없는 경우.
 */
export function applySoulEnchant(gear: Gear) {
  if (!canApplySoulEnchant(gear)) {
    throw TypeError(ErrorMessage.Soul_AlreadyEnchanted);
  }
  gear.data.soulSlot = {};
}

/**
 * 장비에 소울을 장착할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 장착할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetSoul(gear: Gear): boolean {
  return gear.soulEnchanted;
}

/**
 * 장비에 소울을 장착합니다.
 * @param gear 대상 장비.
 * @param soul 장착할 소울 아이템.
 *
 * @throws {@link TypeError}
 * 소울을 장착할 수 없는 경우.
 */
export function setSoul(gear: Gear, soul: SoulData) {
  if (!canSetSoul(gear)) {
    throw TypeError(ErrorMessage.Soul_SetSoulUnenchanted);
  }
  gear.data.soulSlot!.soul = soul;
  _updateChargeOption(gear);
}

/**
 * 장비의 소울 충전량을 설정할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 설정할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canSetSoulCharge(gear: Gear): boolean {
  return gear.soulEnchanted;
}

/**
 * 장비의 소울 충전량을 설정합니다.
 * @param gear 대상 장비.
 * @param charge 소울 충전량.
 *
 * @throws {@link TypeError}
 * 소울 충전량을 설정할 수 없는 경우.
 */
export function setSoulCharge(gear: Gear, charge: number) {
  if (!canSetSoulCharge(gear)) {
    throw TypeError(ErrorMessage.Soul_SetChargeUnenchanted);
  }
  if (charge < 0 || charge > 1000) {
    throw TypeError(ErrorMessage.Soul_InvalidSoulCharge);
  }
  gear.data.soulSlot!.charge = charge;
  _updateChargeOption(gear);
}
/**
 * 장비의 소울웨폰을 초기화합니다.
 * @param gear 초기화할 장비.
 */
export function resetSoulEnchant(gear: Gear) {
  gear.data.soulSlot = undefined;
}

export function _updateChargeOption(gear: Gear) {
  let option: Partial<SoulChargeOption>;
  if (gear.soulCharge === 0) {
    option = {};
  } else {
    const type =
      gear.baseOption.attackPower >= gear.baseOption.magicPower
        ? 'attackPower'
        : 'magicPower';
    const base = Math.min(5, Math.ceil(gear.soulCharge / 100) - 1);
    if (gear.soul) {
      option = { [type]: 10 + base * (gear.soul.chargeFactor ?? 1) };
    } else {
      option = { [type]: 5 + base };
    }
  }
  gear.data.soulSlot!.chargeOption = option;
}
