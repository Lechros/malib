import { GearPropType } from "@malib/gear";
import { SetItem } from "../lib/setitem";

describe("SetItem", () => {
  it("itemCount should return sum of true value count", () => {
    const setItem = new SetItem();
    setItem.itemIDs = new Map([
      [1, false],
      [2, true],
      [3, false],
      [4, false],
      [5, true],
      [6, true],
      [7, false],
    ]);
    expect(setItem.itemCount).toBe(3);
  });
  it("effect should return list of active effects", () => {
    const setItem = new SetItem();
    setItem.itemIDs = new Map([
      [1, false],
      [2, true],
      [3, false],
      [4, false],
      [5, true],
      [6, true],
      [7, false],
    ]);
    setItem.effects = new Map([
      [1, new Map<GearPropType, number>([[GearPropType.incSTR, 1]])],
      [2, new Map<GearPropType, number>([[GearPropType.incDEX, 2]])],
      [3, new Map<GearPropType, number>([[GearPropType.incINT, 3]])],
      [4, new Map<GearPropType, number>([[GearPropType.incSTR, 7]])],
      [5, new Map<GearPropType, number>([[GearPropType.incLUK, 9]])],
    ]);
    const list = setItem.getEffect();
    expect(list.length).toBe(3);
  });
});
