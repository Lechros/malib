import { GearPropType } from "@malib/gear";
import { SetItem } from "../setitem";
import { SetItemData, SetItemDataMap } from "./interfaces/setitem";

/**
 * 세트 아이템 정보로부터 세트 아이템을 생성합니다.
 * @param node 세트 아이템 정보 노드.
 * @param id 세트 아이템 ID.
 * @returns 세트 아이템 정보에 해당하는 세트 아이템.
 */
export function createSetItemFromNode(node: SetItemData, id: number): SetItem {
  const setItem = new SetItem();
  setItem.setItemID = id;
  setItem.name = node.name;
  setItem.itemIDs = new Map(node.itemIDs.map((id) => [id, false]));
  setItem.effects = new Map();
  for (const [effectCount, effectNode] of Object.entries(node.effects)) {
    const effect = new Map<GearPropType, number>();
    for (const [key, value] of Object.entries(effectNode)) {
      const type = GearPropType[key as keyof typeof GearPropType];
      effect.set(type, value);
    }
    setItem.effects.set(Number(effectCount), effect);
    setItem.jokerPossible = node.jokerPossible ?? false;
    setItem.zeroWeaponJokerPossible = node.zeroWeaponJokerPossible ?? false;
  }
  return setItem;
}

export interface ISetItemRepository {
  ids(): number[];

  createSetItemFromId(id: number): SetItem | undefined;
}

export class SetItemRepository {
  /**
   * KMS 세트 아이템 정보
   */
  private setItems: SetItemDataMap;

  /**
   * @param setItems KMS 세트 아이템 정보
   */
  constructor(setItems: SetItemDataMap) {
    this.setItems = setItems;
  }

  ids(): number[] {
    return Object.keys(this.setItems).map((key) => Number(key));
  }

  /**
   * 세트 아이템 ID로부터 세트 아이템을 생성합니다.
   * @param id 세트 아이템 ID.
   * @returns 세트 아이템 ID에 해당하는 세트 아이템. 세트 아이템이 존재하지 않을 경우 `undefined`를 반환합니다.
   */
  createSetItemFromId(id: number): SetItem | undefined {
    if (!(id in this.setItems)) {
      return undefined;
    }

    return createSetItemFromNode(this.setItems[id], id);
  }
}
