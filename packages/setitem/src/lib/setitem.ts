import { GearPropType } from "@malib/gear";

export class SetItem {
  /** 세트 아이템 ID */
  setItemID = 0;
  /** 세트 아이템명 */
  name = "";
  /**
   * 세트 아이템에 포함되는 장비 ID 목록
   *
   * 현재 포함된 장비일 경우 `true`; 아닐 경우 `false`.
   */
  itemIDs: Map<number, boolean>;
  /** 세트 아이템 효과 */
  effects: Map<number, Map<GearPropType, number>>;
  /** 럭키 아이템 적용 가능 여부 */
  jokerPossible = false;
  /** 제로 무기 럭키 아이템 주문서 적용 가능 여부 */
  zeroWeaponJokerPossible = false;

  constructor() {
    this.itemIDs = new Map();
    this.effects = new Map();
  }

  /**
   * 세트 아이템에 적용되고 있는 아이템 개수
   */
  get itemCount(): number {
    let count = 0;
    for (const value of this.itemIDs.values()) {
      if (value) {
        count++;
      }
    }
    return count;
  }

  /**
   * 세트 아이템 개수에 따른 효과를 계산합니다.
   * @returns 적용 중인 세트 효과 목록
   */
  getEffect(): Map<GearPropType, number>[] {
    const list = [];
    for (const [countStr, effect] of this.effects) {
      const count = Number(countStr);
      if (this.itemCount >= count) {
        list.push(effect);
      }
    }
    return list;
  }
}
