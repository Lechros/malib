import { Gear, GearPropType } from "@malib/gear";
import { Scroll, SpellTraceProbability, SpellTraceStatType } from "./scroll";

/**
 * 주문서 업그레이드 관련 기능을 제공합니다.
 */
export class UpgradeLogic {
  /**
   * 장비에 황금망치를 적용합니다.
   * @param gear 황금망치를 적용할 장비
   * @returns 황금망치가 적용됐을 경우 `true`; 아닐 경우 `false`
   */
  applyGoldHammer(gear: Gear): boolean {
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
   *
   * @param gear 주문서를 적용할 장비
   * @param scroll 적용할 주문서
   * @returns 주문서가 적용됐을 경우 `true`; 아닐 경우 `false`
   */
  applyScroll(gear: Gear, scroll: Scroll): boolean {
    if (gear.upgradeLeft < 1) {
      return false;
    }
    gear.upgradeCount += 1;
    for (const [type, value] of scroll.stat) {
      gear.option(type).upgrade += value;
    }
    return true;
  }

  /**
   * 장비에 주문의 흔적 강화를 1회 적용합니다.
   * @param gear 강화를 적용할 장비
   * @param type 주문의 흔적 스탯 종류
   * @param probability 주문의 흔적 성공 확률 %
   * @returns 주문서가 적용됐을 경우 `true`; 아닐 경우 `false`
   */
  applySpellTrace(
    gear: Gear,
    type: SpellTraceStatType,
    probability: SpellTraceProbability
  ): boolean {
    const spellTrace = Scroll.getSpellTraceScroll(gear, type, probability);
    if (!spellTrace) {
      return false;
    }
    return this.applyScroll(gear, spellTrace);
  }

  /**
   * 장비의 업그레이드 가능 횟수를 1회 감소합니다.
   *
   * 주문서가 실패한 것과 동일한 효과입니다.
   * @param gear 감소할 장비
   * @returns 감소됐을 경우 `true`; 아닐 경우 `false`
   */
  addUpgradeFail(gear: Gear): boolean {
    if (gear.upgradeLeft < 1) {
      return false;
    }
    gear.failCount += 1;
    return true;
  }

  /**
   * 장비의 업그레이드 가능 횟수를 1회 복구합니다.
   *
   * 장비의 최대 업그레이드 가능 횟수를 초과하지 않습니다.
   * @param gear 복구할 장비
   * @returns 복구했을 경우 `true`; 아닐 경우 `false`
   */
  restoreUpgradeFail(gear: Gear): boolean {
    if (gear.failCount < 1) {
      return false;
    }
    gear.failCount -= 1;
    return true;
  }

  /**
   * 장비의 주문서, 황금망치 관련 속성을 초기화합니다.
   *
   * 아크 이노센트와 동일한 효과입니다. 놀라운 장비강화 주문서가 적용된 장비도 적용 가능하지만 오차가 발생할 수 있습니다.
   * @param gear 초기화할 장비
   * @returns 초기화했을 경우 `true`; 아닐 경우 `false`
   */
  resetUpgrade(gear: Gear): boolean {
    gear.upgradeCount = 0;
    gear.failCount = 0;
    gear.hammerCount = 0;
    for (const [, option] of gear.options) {
      option.upgrade = 0;
    }
    return true;
  }
}
