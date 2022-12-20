import { Gear } from "../../maplegear/src";

/**
 * 중복 착용이 불가능한 장비 관련 기능을 제공합니다.
 */
export default class ExclusiveEquip {
  code = 0;
  itemIDs: number[];
  msg?: string;

  private static exclusiveEquipList: ExclusiveEquip[] = [];

  constructor() {
    this.itemIDs = [];
  }

  /**
   * ID로부터 ExclusiveEquip 인스턴스를 생성합니다.
   * @param code ID
   * @returns ExclusiveEquip; 존재하지 않을 경우 `undefined`
   */
  static createFromID(code: number): ExclusiveEquip | undefined {
    const data = getExclusiveEquipNode(code);
    if(!data) {
      return undefined;
    }

    const ex = new ExclusiveEquip();
    ex.code = data.code;
    ex.itemIDs = data.item;
    ex.msg = data.msg;

    return ex;
  }

  /**
   * 중복 착용이 불가능한 장비를 장착할 수 있는지 여부를 계산합니다.
   * @param newGear 장착하려는 장비
   * @param equippedGears 현재 장착된 장비 목록
   * @returns 장착할 수 있을 경우 `true`; 아닐 경우 `false`
   */
  static canEquip(newGear: Gear, equippedGears: Iterable<Gear>): boolean {
    if(ExclusiveEquip.exclusiveEquipList.length === 0) {
      this.initList();
    }
    for(const exEquip of ExclusiveEquip.exclusiveEquipList) {
      if(exEquip.itemIDs.includes(newGear.itemID)) {
        for(const equippedGear of equippedGears) {
          if(equippedGear.itemID === newGear.itemID) {
            continue;
          }
          if(exEquip.itemIDs.includes(equippedGear.itemID)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  private static initList() {
    for(const code of Object.keys(getExclusiveEquipList())) {
      ExclusiveEquip.exclusiveEquipList.push(ExclusiveEquip.createFromID(Number(code)) as ExclusiveEquip);
    }
  }
}
