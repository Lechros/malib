import { Gear } from "./gear";
import { GearPropType } from "./gearproptype";

/**
 * 소울
 */
export interface Soul {
  /** 소울 이름 */
  name: string;
  /** 스킬명 */
  skill: string;
  /** 소울 옵션 */
  option: Map<GearPropType, number>;

  multiplier: number;
}

/**
 * 소울 웨폰
 */
export class SoulWeapon {
  /** 소울 인챈트 여부 */
  enchanted = false;
  /** 소울 */
  soul: Soul | undefined;
  /** 소울 충전량 */
  charge = 0;

  /** 소울 충전량으로 증가하는 옵션 */
  chargeOption: Map<GearPropType, number> = new Map();

  private gear: Gear;

  constructor(gear: Gear) {
    this.gear = gear;
  }

  /**
   * 소울 인챈트를 적용합니다.
   * @returns 적용했을 경우 `true`; 아닐 경우 `false`.
   * 이미 소울 인챈트 상태이거나 장비 분류가 무기가 아닐 경우 `false`를 반환합니다.
   */
  enchant(): boolean {
    if (this.enchanted) {
      return false;
    }
    if (!Gear.isWeapon(this.gear.type)) {
      return false;
    }
    this.enchanted = true;
    this.soul = undefined;
    this.charge = 0;
    this.chargeOption.clear();
    return true;
  }

  /**
   * 소울 인챈트를 해제합니다.
   * @returns 해제했을 경우 `true`; 아닐 경우 `false`.
   * 소울 인챈트 상태가 아닐 경우 `false`를 반환합니다.
   */
  disenchant(): boolean {
    if (!this.enchanted) {
      return false;
    }
    this.enchanted = false;
    this.soul = undefined;
    this.charge = 0;
    this.chargeOption.clear();
    return true;
  }

  /**
   * 소울 충전량을 설정합니다.
   * 소울 충전량으로 증가하는 옵션을 다시 계산합니다.
   * `0`부터 `1000`까지의 값으로 설정할 수 있습니다.
   * @param charge 소울 충전량.
   * @returns 설정했을 경우 `true`; 아닐 경우 `false`.
   * 소울 인챈트 상태가 아닐 경우 `false`를 반환합니다.
   */
  setCharge(charge: number): boolean {
    if (!this.enchanted) {
      return false;
    }
    if (charge < 0 || charge > 1000) {
      return false;
    }
    this.charge = charge;
    this.updateChargeOption();
    return true;
  }

  /**
   * 소울을 장착합니다.
   * 소울 충전량으로 증가하는 옵션을 다시 계산합니다.
   * 소울 인챈트가 적용된 상태에만 장착됩니다.
   * @param soul 장착할 소울.
   * @returns 장착했을 경우 `true`; 아닐 경우 `false`.
   * 소울 인챈트 상태가 아닐 경우 `false`를 반환합니다.
   */
  setSoul(soul: Soul): boolean {
    if (!this.enchanted) {
      return false;
    }
    this.soul = soul;
    this.updateChargeOption();
    return true;
  }

  /**
   * 장착된 소울을 제거합니다.
   * @returns 제거했을 경우 `true`; 아닐 경우 `false`.
   * 소울 인챈트 상태가 아니거나 장착된 소울이 없을 경우 `false`를 반환합니다.
   */
  removeSoul(): boolean {
    if (!this.enchanted) {
      return false;
    }
    if (!this.soul) {
      return false;
    }
    this.soul = undefined;
    this.updateChargeOption();
    return true;
  }

  /**
   * 소울 충전량으로 증가하는 옵션을 다시 계산합니다.
   * @returns 적용했을 경우 `true`; 아닐 경우 `false`.
   */
  updateChargeOption(): boolean {
    const useMad =
      this.gear.option(GearPropType.incPAD).base <
      this.gear.option(GearPropType.incMAD).base;
    const adType = useMad ? GearPropType.incMAD : GearPropType.incPAD;
    this.chargeOption.clear();
    this.chargeOption.set(adType, this.getChargeAD());
    return true;
  }

  private getChargeAD(): number {
    if (!this.enchanted) {
      return 0;
    }
    if (this.charge === 0) {
      return 0;
    }

    const chargeValue = Math.min(Math.ceil(this.charge / 100) - 1, 5);
    if (this.soul) {
      const multiplier = this.soul.multiplier;
      return 10 + chargeValue * multiplier;
    }
    return 5 + chargeValue;
  }
}
