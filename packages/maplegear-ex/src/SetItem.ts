/**
 * 세트 아이템
 */
export default class SetItem {
  /** 세트 아이템 ID */
  setItemID = 0;
  /** 세트 아이템 이름 */
  setItemName = "";
  /** 럭키 아이템 적용 가능 여부 */
  jokerPossible = true;
  /**
   * 세트 아이템에 포함되는 장비 ID 목록
   *
   * 현재 장착된 아이템은 `true`; 아닌 아이템은 `false`
   */
  itemIDs: Map<number, boolean> = new Map();
  /** 세트 아이템 개수 별 효과 */
  effects: Map<number, Map<GearPropType, number>> = new Map();

  /**
   * 세트 아이템에 적용되고 있는 장비 개수
   */
  get itemCount(): number {
    let count = 0;
    for(const value of this.itemIDs.values()) {
      if(value) {
        count += 1;
      }
    }
    return count;
  }

  /**
   * 현재 세트 아이템 수에 따른 효과를 계산합니다.
   * @returns 세트 아이템 효과
   */
  getEffect(): Map<GearPropType, number> {
    const options = new Map<GearPropType, number>();
    for(const [countStr, effect] of this.effects.entries()) {
      const count = Number(countStr);
      if(this.itemCount >= count) {
        addGearProp(options, effect);
      }
    }
    return options;
  }

  /**
   * 세트 아이템 ID로부터 세트 아이템을 생성합니다.
   * @param setItemID 세트 아이템 ID
   * @returns 세트 아이템; 존재하지 않을 경우 `undefined`
   */
  static createFromID(setItemID: number): SetItem | undefined {
    const data = getSetItemNode(setItemID);
    if(!data) {
      return undefined;
    }

    const setItem = new SetItem();
    setItem.setItemID = setItemID;
    setItem.setItemName = data.setItemName;
    setItem.jokerPossible = (data.jokerPossible ?? 0) > 0;
    for(const itemID of data.ItemID) {
      setItem.itemIDs.set(itemID, false);
    }
    for(const [count, effects] of Object.entries(data.Effect)) {
      const options = new Map<GearPropType, number>();
      for(const [key, value] of Object.entries(effects)) {
        options.set(asEnum(key, GearPropType), value);
      }
      setItem.effects.set(Number(count), options);
    }
    return setItem;
  }

  /**
   * 현재 적용 중인 세트 아이템 목록을 계산합니다.
   * @param gearsEquipped 장착된 장비 목록
   * @returns 세트 아이템 목록
   */
  static getSetItems(gearsEquipped: Gear[]): SetItem[] {
    // TODO : 에테르넬 세트 출시하면 럭키 아이템 로직 확인
    const setItemList = new Map<number, SetItem>();
    const jokerGears: Gear[] = [];

    for(const gear of gearsEquipped) {
      const setItemID = gear.getPropValue(GearPropType.setItemID);
      if(setItemID > 0) {
        if(!setItemList.has(setItemID)) {
          const setItem = SetItem.createFromID(setItemID);
          if(!setItem) {
            throw Error(`Invalid setItemID: ${setItemID}`);
          }
          setItemList.set(setItemID, setItem);
        }
        const setItem = setItemList.get(setItemID) as SetItem;
        if(!setItem.itemIDs.has(gear.itemID)) {
          throw Error(`Gear references setItem, but setItem doesn't include the gear. (gearID: ${gear.itemID}, setItemID: ${setItem.setItemID})`);
        }
        setItem.itemIDs.set(gear.itemID, true);
      }
      if(gear.getBooleanValue(GearPropType.jokerToSetItem)) {
        jokerGears.push(gear);
      }
    }
    if(jokerGears.length > 0) {
      jokerGears.sort((a, b) => this.jokerGearSortKey(a) - this.jokerGearSortKey(b));
      for(const jokerGear of jokerGears) {
        let active = false;
        const jokerType = Gear.getGearType(jokerGear.itemID);
        for(const [,setItem] of setItemList) {
          if(setItem.jokerPossible && setItem.itemCount >= 3) {
            for(const [itemID, isOn] of setItem.itemIDs) {
              if(!isOn && Gear.getGearType(itemID) === jokerType) {
                setItem.itemIDs.set(itemID, true);
                active = true;
                break;
              }
            }
          }
        }
        if(active) {
          break;
        }
      }
    }
    return [...setItemList.values()].sort((a, b) => a.setItemID - b.setItemID);
  }

  /**
   * 럭키 아이템 적용 우선순위. 낮을 수록 우선
   */
  private static jokerGearSortKey(gear: Gear): number {
    const basis = 1000;
    const reqLevel = gear.req.level;
    switch(gear.type) {
      case GearType.cap:
        return 1 * basis - reqLevel;
      case GearType.earrings:
        return 2 * basis - reqLevel;
        // weapon = 3
      case GearType.ring:
        return 4 * basis - reqLevel;
      case GearType.shoulderPad:
        return 5 * basis - reqLevel;
      default:
        if(Gear.isWeapon(gear.type)) {
          return 3 * basis - reqLevel;
        }
        return 99 * basis - reqLevel;
    }
  }
}
