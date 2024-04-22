import { SetItemRepository } from "../..";
import setItems from "./res/setitem.json";

const setItemRepository = new SetItemRepository(setItems);

test("create all set items in resource", () => {
  for (const id of setItemRepository.ids()) {
    expect(setItemRepository.createSetItemFromId(id)).not.toBeUndefined();
  }
});
