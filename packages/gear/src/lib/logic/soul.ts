import { Gear } from "../gear";
import { GearPropType } from "../gearproptype";
import { SoulSlot } from "../soul";

export class SoulLogic {
  /**
   * 무기를 소울웨폰으로 변환합니다.
   * @param gear 적용할 장비
   * @returns 소울웨폰으로 변환되었을 경우 `true`; 아닐 경우 `false`
   */
  enchant(gear: Gear): boolean {
    if (gear.soulSlot.enchanted) {
      return false;
    }
    if (!Gear.isWeapon(gear.type)) {
      return false;
    }
    gear.soulSlot.enchanted = true;
    gear.soulSlot.charge = 0;
    gear.soulSlot.chargeOption.clear();
    return true;
  }

  /**
   * 소울웨폰을 원래의 무기로 되돌립니다.
   * @param gear 되돌릴 장비
   * @returns 되돌렸을 경우 `true`; 아닐 경우 `false`
   */
  disenchant(gear: Gear): boolean {
    if (!gear.soulSlot.enchanted) {
      return false;
    }
    gear.soulSlot.enchanted = false;
    gear.soulSlot.charge = 0;
    gear.soulSlot.chargeOption.clear();
    return true;
  }

  /**
   * 소울웨폰의 소울 충전량을 설정하고 옵션을 적용합니다.
   * 0부터 1000까지의 값으로 설정할 수 있습니다.
   * @param gear 소울 충전량을 설정할 장비
   * @param charge 소울 충전량
   * @returns 적용했을 경우 `true`; 아닐 경우 `false`
   */
  setCharge(gear: Gear, charge: number): boolean {
    if (!gear.soulSlot.enchanted) {
      return false;
    }
    if (charge < 0 || charge > 1000) {
      return false;
    }
    gear.soulSlot.charge = charge;
    const useMad =
      gear.option(GearPropType.incPAD).base <
      gear.option(GearPropType.incMAD).base;
    const adType = useMad ? GearPropType.incMAD : GearPropType.incPAD;
    gear.soulSlot.chargeOption.clear();
    gear.soulSlot.chargeOption.set(adType, this.getChargeAD(gear.soulSlot));
    return true;
  }

  private getChargeAD(soulSlot: SoulSlot): number {
    if (!soulSlot.enchanted) {
      return 0;
    }
    if (soulSlot.soul) {
      const multiplier = soulSlot.soul.multiplier;
      return 10 + Math.min(Math.ceil(soulSlot.charge / 100), 5) * multiplier;
    }
    return 5 + Math.min(Math.ceil(soulSlot.charge / 100), 5);
  }
}
