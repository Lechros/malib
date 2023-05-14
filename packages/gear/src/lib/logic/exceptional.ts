import { Gear } from "../gear";
import { ExceptionalParts } from "./exceptionalparts";

/**
 * 장비에 익셉셔널 강화를 적용합니다.
 * @param gear 익셉셔널 강화를 적용할 장비.
 * @param scroll 적용할 익셉셔널 파츠.
 * @returns 익셉셔널 강화를 적용했을 경우 `true`; 아닐 경우 `false`.
 * 장비에 남은 익셉셔널 업그레이드 가능 횟수가 존재하지 않을 경우 `false`를 반환합니다.
 */
export function applyExceptionalEnchant(
  gear: Gear,
  scroll: ExceptionalParts
): boolean {
  if (gear.exceptionalUpgradeCountLeft < 1) {
    return false;
  }
  gear.exceptionalUpgradeCount += 1;
  for (const [type, value] of scroll.option) {
    const before = gear.exceptionalOptions.get(type) ?? 0;
    gear.exceptionalOptions.set(type, before + value);
  }
  return true;
}

/**
 * 장비의 익셉셔널 강화를 초기화합니다.
 * @param gear 초기화할 장비.
 * @returns 항상 초기화에 성공하고 `true`를 반환합니다.
 */
export function resetExceptionalEnchant(gear: Gear): boolean {
  gear.exceptionalUpgradeCount = 0;
  gear.exceptionalOptions.clear();
  return true;
}
