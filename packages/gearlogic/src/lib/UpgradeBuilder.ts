import { Gear, GearPropType } from "@malib/gear";
import { Scroll, SpellTraceProbability, SpellTraceStatType } from "./Scroll";

/**
 * 주문서 업그레이드 관련 기능을 제공합니다.
 */
export class UpgradeBuilder {
  gear: Gear | undefined;

  constructor(gear?: Gear) {
    this.gear = gear;
  }

  /**
   * 업그레이드 가능 횟수
   */
  get upgradeLeft(): number {
    if(!this.gear) {
      return 0;
    }

    return (
      this.gear.totalUpgradeCount +
      this.gear.hammerCount -
      this.gear.upgradeCount -
      this.gear.failCount
    );
  }

  /**
   * 장비에 황금망치를 적용합니다.
   * @returns 황금망치가 적용됐을 경우 `true`; 아닐 경우 `false`
   */
  applyGoldHammer(): boolean {
    if(!this.gear) {
      return false;
    }
    if(
      this.gear.getBooleanValue(GearPropType.blockGoldHammer) ||
      this.gear.getBooleanValue(GearPropType.onlyUpgrade) ||
      this.gear.totalUpgradeCount <= 0
    ) {
      return false;
    }
    if(this.gear.hammerCount > 0) {
      return false;
    }
    this.gear.hammerCount = 1;
    return true;
  }

  /**
   * 장비에 주문서를 1회 적용합니다.
   *
   * @param scroll 적용할 주문서
   * @returns 주문서가 적용됐을 경우 `true`; 아닐 경우 `false`
   */
  applyScroll(scroll: Scroll): boolean {
    if(!this.gear) {
      return false;
    }
    if(this.upgradeLeft < 1) {
      return false;
    }
    this.gear.upgradeCount += 1;
    for(const [type, value] of scroll.stat) {
      this.gear.option(type).upgrade += value;
    }
    return true;
  }

  /**
   * 장비에 주문의 흔적 강화를 1회 적용합니다.
   * @param type 주문의 흔적 스탯 종류
   * @param probability 주문의 흔적 성공 확률 %
   * @returns 주문서가 적용됐을 경우 `true`; 아닐 경우 `false`
   */
  applySpellTrace(type: SpellTraceStatType, probability: SpellTraceProbability): boolean {
    if(!this.gear) {
      return false;
    }
    const spellTrace = Scroll.getSpellTraceScroll(this.gear, type, probability);
    if(!spellTrace) {
      return false;
    }
    return this.applyScroll(spellTrace);
  }

  /**
   * 장비의 업그레이드 가능 횟수를 1회 감소시킵니다.
   *
   * 주문서가 실패한 것과 동일한 효과입니다.
   * @returns 감소됐을 경우 `true`; 아닐 경우 `false`
   */
  addUpgradeFail(): boolean {
    if(!this.gear) {
      return false;
    }
    if(this.upgradeLeft < 1) {
      return false;
    }
    this.gear.failCount += 1;
    return true;
  }

  /**
   * 장비의 업그레이드 가능 횟수를 1회 복구합니다.
   *
   * 장비의 최대 업그레이드 가능 횟수를 초과하지 않습니다.
   * @returns 복구했을 경우 `true`; 아닐 경우 `false`
   */
  restoreUpgradeFail(): boolean {
    if(!this.gear) {
      return false;
    }
    if(this.gear.failCount < 1) {
      return false;
    }
    this.gear.failCount -= 1;
    return true;
  }

  /**
   * 장비의 주문서, 황금망치 관련 속성을 초기화합니다.
   *
   * 아크 이노센트와 동일한 효과입니다. 놀라운 장비강화 주문서가 적용된 장비도 적용 가능하지만 오차가 발생할 수 있습니다.
   * </pre>
   * @returns 초기화했을 경우 `true`; 아닐 경우 `false`
   */
  resetUpgrade(): boolean {
    if(!this.gear) {
      return false;
    }
    this.gear.upgradeCount = 0;
    this.gear.failCount = 0;
    this.gear.hammerCount = 0;
    for(const [, option] of this.gear.options) {
      option.upgrade = 0;
    }
    return true;
  }
}
