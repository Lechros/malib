import { GearUpgradeOption, GearCapability } from '../data';
import { ErrorMessage } from '../errors';
import { Gear } from '../Gear';
import { addOptions } from '../gearOption';
import { ReadonlyGear } from '../ReadonlyGear';

/**
 * 주문서
 */
export interface Scroll {
  /** 주문서 이름 */
  name: string;
  /** 주문서 아이콘 */
  icon?: string;
  /** 주문서 옵션 */
  option: Partial<GearUpgradeOption>;
}

/**
 * 장비가 주문서 강화를 지원하는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 지원할 경우 `true`; 아닐 경우 `false`.
 */
export function supportsUpgrade(gear: ReadonlyGear): boolean {
  return gear.attributes.canScroll === GearCapability.Can;
}

/**
 * 장비에 주문서 실패를 적용할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canFailScroll(gear: ReadonlyGear): boolean {
  return supportsUpgrade(gear) && gear.scrollUpgradeableCount > 0;
}

/**
 * 장비에 주문서 실패를 적용합니다.
 * @param gear 적용할 장비.
 *
 * @throws {@link TypeError}
 * 주문서 실패를 적용할 수 없는 상태의 장비일 경우.
 */
export function failScroll(gear: Gear) {
  if (!canFailScroll(gear)) {
    throw TypeError(ErrorMessage.Upgrade_InvalidFailScrollGear);
  }
  gear.data.scrollUpgradeableCount = gear.scrollUpgradeableCount - 1;
  gear.data.scrollResilienceCount = gear.scrollResilienceCount + 1;
}

/**
 * 장비가 주문서 실패로 차감된 업그레이드 가능 횟수를 복구할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 복구할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canResileScroll(gear: ReadonlyGear): boolean {
  return supportsUpgrade(gear) && gear.scrollResilienceCount > 0;
}

/**
 * 장비의 주문서 실패로 차감된 업그레이드 가능 횟수를 1회 복구합니다.
 * @param gear 복구할 장비.
 *
 * @throws {@link TypeError}
 * 업그레이드 가능 횟수를 복구할 수 없는 상태의 장비일 경우.
 */
export function resileScroll(gear: Gear) {
  if (!canResileScroll(gear)) {
    throw TypeError(ErrorMessage.Upgrade_InvalidResileScrollGear);
  }
  gear.data.scrollResilienceCount = gear.scrollResilienceCount - 1;
  gear.data.scrollUpgradeableCount = gear.scrollUpgradeableCount + 1;
}

/**
 * 장비의 주문서 강화를 초기화할 수 있는지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 초기화할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canResetUpgrade(gear: ReadonlyGear): boolean {
  return supportsUpgrade(gear);
}

/**
 * 장비의 주문서 강화를 초기화합니다.
 * @param gear 초기화할 장비.
 *
 * @throws {@link TypeError}
 * 주문서 강화를 초기화할 수 없는 장비일 경우.
 */
export function resetUpgrade(gear: Gear) {
  if (!canResetUpgrade(gear)) {
    throw TypeError(ErrorMessage.Upgrade_InvalidResetScrollGear);
  }
  gear.data.upgradeOption = {};
  gear.data.scrollUpgradeableCount = gear.scrollTotalUpgradeableCount;
  gear.data.scrollUpgradeCount = undefined;
  gear.data.scrollResilienceCount = undefined;
}

/**
 * 장비에 주문서를 적용할 수 있는 상태인지 여부를 확인합니다.
 * @param gear 확인할 장비.
 * @returns 적용할 수 있을 경우 `true`; 아닐 경우 `false`.
 */
export function canApplyScroll(gear: ReadonlyGear): boolean {
  return supportsUpgrade(gear) && gear.scrollUpgradeableCount > 0;
}

/**
 * 장비에 주문서를 적용합니다.
 * @param gear 적용할 장비.
 * @param scroll 적용할 주문서.
 *
 * @throws {@link TypeError}
 * 주문서를 적용할 수 없는 상태의 장비일 경우.
 */
export function applyScroll(gear: Gear, scroll: Scroll) {
  if (!canApplyScroll(gear)) {
    throw TypeError(ErrorMessage.Upgrade_InvalidApplyScrollGear);
  }
  if (gear.data.upgradeOption === undefined) {
    gear.data.upgradeOption = {};
  }
  addOptions(gear.data.upgradeOption, scroll.option);
  gear.data.scrollUpgradeableCount = gear.scrollUpgradeableCount - 1;
  gear.data.scrollUpgradeCount = gear.scrollUpgradeCount + 1;
}
