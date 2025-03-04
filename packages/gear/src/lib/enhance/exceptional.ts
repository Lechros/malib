import { GearUpgradeOption } from '../data';
import { ErrorMessage } from '../errors';
import { Gear } from '../Gear';
import { addOptions } from '../utils';

/**
 * 익셉셔널 해머
 */
export interface ExceptionalHammer {
  /** 익셉셔널 해머 이름 */
  name: string;
  /** 익셉셔널 해머 아이콘 */
  icon?: string;
  /** 익셉셔널 해머 옵션 */
  option: Partial<GearUpgradeOption>;
}

/**
 * 장비가 익셉셔널 강화를 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsExceptional(gear: Gear): boolean {
  return gear.exceptionalTotalUpgradeableCount > 0;
}

/**
 * 장비에 익셉셔널 강화를 적용할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplyExceptional(gear: Gear): boolean {
  return supportsExceptional(gear) && gear.exceptionalUpgradeableCount > 0;
}

/**
 * 장비에 익셉셔널 강화를 적용합니다.
 * @param gear 적용할 장비.
 * @param exceptionalHammer 적용할 익셉셔널 해머.
 *
 * @throws {@link TypeError}
 * 익셉셔널 강화를 적용할 수 없는 상태의 장비일 경우.
 */
export function applyExceptional(
  gear: Gear,
  exceptionalHammer: ExceptionalHammer,
) {
  if (!canApplyExceptional(gear)) {
    throw TypeError(ErrorMessage.Exceptional_InvalidEnhanceGear);
  }
  if (gear.data.exceptionalOption === undefined) {
    gear.data.exceptionalOption = {};
  }
  addOptions(gear.data.exceptionalOption, exceptionalHammer.option);
  gear.data.exceptionalUpgradeableCount = gear.exceptionalUpgradeableCount - 1;
  gear.data.exceptionalUpgradeCount = gear.exceptionalUpgradeCount + 1;
}

/**
 * 장비의 익셉셔널 강화를 초기화할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 초기화할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canResetExceptional(gear: Gear): boolean {
  return supportsExceptional(gear);
}

/**
 * 장비의 익셉셔널 강화를 초기화합니다.
 * @param gear 초기화할 장비.
 *
 * @throws {@link TypeError}
 * 익셉셔널 강화를 초기화할 수 없는 장비일 경우.
 */
export function resetExceptional(gear: Gear) {
  if (!canResetExceptional(gear)) {
    throw TypeError(ErrorMessage.Upgrade_InvalidResetScrollGear);
  }
  gear.data.exceptionalOption = {};
  gear.data.exceptionalUpgradeableCount = gear.exceptionalTotalUpgradeableCount;
  gear.data.exceptionalUpgradeCount = undefined;
}
