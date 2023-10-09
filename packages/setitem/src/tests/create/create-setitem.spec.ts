import { createSetItemFromId, setItemData } from "../..";

test("create all set items in resource", () => {
  for (const id of Object.keys(setItemData)) {
    expect(createSetItemFromId(Number(id))).not.toBeUndefined();
  }
});
