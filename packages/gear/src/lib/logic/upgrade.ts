import { Gear } from "../gear";
import { GearPropType } from "../gearproptype";
import {
  Scroll,
  SpellTraceProbability,
  SpellTraceStatType,
  getSpellTraceScroll,
} from "./scroll";

/**
 * 장비에 황금망치를 적용합니다.
 * @param gear 황금망치를 적용할 장비.
 * @returns 황금망치를 적용했을 경우 `true`; 아닐 경우 `false`.
 * 장비에 황금망치 적용 불가 속성이 존재하거나 전용 주문서가 존재하거나 이미 황금망치가 적용되었을 경우 `false`를 반환합니다.
 */
export function applyGoldHammer(gear: Gear): boolean {
  if (
    gear.getBooleanValue(GearPropType.blockGoldHammer) ||
    gear.getBooleanValue(GearPropType.onlyUpgrade) ||
    gear.totalUpgradeCount <= 0
  ) {
    return false;
  }
  if (gear.hammerCount > 0) {
    return false;
  }
  gear.hammerCount = 1;
  return true;
}

/**
 * 장비에 주문서를 1회 적용합니다.
 * @param gear 주문서를 적용할 장비.
 * @param scroll 적용할 주문서.
 * @returns 주문서를 적용했을 경우 `true`; 아닐 경우 `false`.
 * 장비에 남은 업그레이드 가능 횟수가 존재하지 않을 경우 `false`를 반환합니다.
 */
export function applyScroll(gear: Gear, scroll: Scroll): boolean {
  if (gear.upgradeCountLeft < 1) {
    return false;
  }
  gear.upgradeCount += 1;
  for (const [type, value] of scroll.option) {
    gear.option(type).upgrade += value;
  }
  return true;
}

/**
 * 장비에 주문의 흔적 강화를 1회 적용합니다.
 * @param gear 주문의 흔적 강화를 적용할 장비.
 * @param type 주문의 흔적 스탯 종류. `GearPropType` 타입이고
 * `incSTR` / `incDEX` / `incINT` / `incLUK` / `incAllStat` / `incMHP` 중 하나입니다.
 * @param probability 주문의 흔적 성공 확률. `100` / `70` / `30` / `15` 중 하나입니다.
 * @returns 주문서를 적용했을 경우 `true`; 아닐 경우 `false`. 지정된 장비, 스탯, 확률을 만족하는 주문서가 존재하지 않을 경우 `false`를 반환합니다.
 */
export function applySpellTrace(
  gear: Gear,
  type: SpellTraceStatType,
  probability: SpellTraceProbability
): boolean {
  const spellTrace = getSpellTraceScroll(gear, type, probability);
  if (!spellTrace) {
    return false;
  }
  return applyScroll(gear, spellTrace);
}

/**
 * 장비의 업그레이드 복구 가능 횟수를 1회 추가합니다.
 * @param gear 추가할 장비.
 * @returns 추가했을 경우 `true`; 아닐 경우 `false`.
 * 장비에 남은 업그레이드 가능 횟수가 존재하지 않을 경우 `false`를 반환합니다.
 */
export function addUpgradeFailCount(gear: Gear): boolean {
  if (gear.upgradeCountLeft < 1) {
    return false;
  }
  gear.upgradeFailCount += 1;
  return true;
}

/**
 * 장비의 복구 가능 횟수를 1회 복구합니다.
 * @param gear 복구할 장비.
 * @returns 복구했을 경우 `true`; 아닐 경우 `false`.
 * 장비에 남은 복구 가능 횟수가 존재하지 않을 경우 `false`를 반환합니다.
 */
export function restoreUpgradeCount(gear: Gear): boolean {
  if (gear.upgradeFailCount < 1) {
    return false;
  }
  gear.upgradeFailCount -= 1;
  return true;
}

/**
 * 장비의 주문서, 옵션, 황금망치 관련 속성을 초기화합니다.
 * 놀라운 장비강화 주문서로 증가한 옵션에 오차가 발생할 수 있습니다.
 * @param gear 초기화할 장비.
 * @returns 항상 초기화에 성공하고 `true`를 반환합니다.
 */
export function resetUpgrade(gear: Gear): boolean {
  gear.upgradeCount = 0;
  gear.upgradeFailCount = 0;
  gear.hammerCount = 0;
  for (const [, option] of gear.options) {
    option.upgrade = 0;
  }
  return true;
}
